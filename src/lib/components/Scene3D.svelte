<script lang="ts">
	import { onMount } from 'svelte';
	import type { BufferGeometry, LineBasicMaterial, Material } from 'three';

	interface Props {
		class?: string;
	}

	let { class: clazz = '' }: Props = $props();

	let root: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	const skyVertex = /* glsl */ `
		varying vec3 vWorldDir;
		varying vec2 vNdc;
		void main() {
			vec4 w = modelMatrix * vec4(position, 1.0);
			vWorldDir = normalize(w.xyz);
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			vNdc = gl_Position.xy / gl_Position.w;
		}
	`;

	const skyFragment = /* glsl */ `
		uniform float uTime;
		uniform vec2 uMouse;
		uniform float uReduced;
		varying vec3 vWorldDir;
		varying vec2 vNdc;

		float hash(vec2 p) {
			return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
		}
		float noise(vec2 p) {
			vec2 i = floor(p);
			vec2 f = fract(p);
			float a = hash(i);
			float b = hash(i + vec2(1.0, 0.0));
			float c = hash(i + vec2(0.0, 1.0));
			float d = hash(i + vec2(1.0, 1.0));
			vec2 u = f * f * (3.0 - 2.0 * f);
			return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
		}
		float fbm(vec2 p) {
			float v = 0.0;
			float a = 0.5;
			for (int i = 0; i < 6; i++) {
				v += a * noise(p);
				p *= 2.1;
				a *= 0.5;
			}
			return v;
		}

		void main() {
			vec2 uv = vec2(
				atan(vWorldDir.z, vWorldDir.x) / 6.2831853 + 0.5,
				acos(clamp(vWorldDir.y, -1.0, 1.0)) / 3.14159265
			);
			vec2 mu = uMouse * 0.12;
			float t = uTime * (uReduced > 0.5 ? 0.0 : 1.0);

			vec2 flow = uv * vec2(2.8, 4.2) + mu + vec2(t * 0.018, -t * 0.011);
			float n1 = fbm(flow);
			float n2 = fbm(flow * 2.3 + vec2(13.7, 9.1) + t * 0.03);
			float n3 = fbm(flow * 5.1 - t * 0.02);

			vec3 deep = vec3(0.02, 0.03, 0.06);
			vec3 nebA = vec3(0.05, 0.12, 0.14);
			vec3 nebB = vec3(0.08, 0.06, 0.18);
			vec3 nebC = vec3(0.2, 0.85, 0.65);

			vec3 col = mix(deep, nebA, pow(n1, 1.35));
			col = mix(col, nebB, pow(n2, 2.0) * 0.75);
			col += nebC * pow(n3, 3.0) * 0.38;

			float band = sin(vWorldDir.y * 5.5 + t * 0.35) * 0.5 + 0.5;
			col += vec3(0.35, 0.95, 0.72) * band * n2 * 0.16;
			col += vec3(0.55, 0.45, 1.0) * pow(max(0.0, n1 - 0.45), 2.0) * 0.28;

			float grid = abs(sin(uv.x * 120.0 + t * 0.5)) * abs(sin(uv.y * 80.0 - t * 0.3));
			col += vec3(0.45, 0.9, 0.75) * smoothstep(0.92, 1.0, grid) * 0.055;

			float vig = 1.0 - dot(vNdc, vNdc) * 0.28;
			col *= vig;

			float horizon = smoothstep(-0.15, 0.35, vWorldDir.y);
			col *= mix(0.35, 1.0, horizon);

			gl_FragColor = vec4(col, 1.0);
		}
	`;

	const particleVertex = /* glsl */ `
		attribute float aPhase;
		attribute float aSize;
		uniform float uTime;
		uniform float uPixelRatio;
		uniform float uReduced;
		varying float vBlink;
		varying float vDepth;
		void main() {
			vec3 p = position;
			float t = uTime * (uReduced > 0.5 ? 0.0 : 1.0);
			p.y += sin(t * 0.4 + aPhase) * 0.35;
			p.x += cos(t * 0.25 + aPhase * 1.3) * 0.2;
			vec4 mv = modelViewMatrix * vec4(p, 1.0);
			vDepth = -mv.z;
			vBlink = sin(t * 2.0 + aPhase * 3.7) * 0.5 + 0.5;
			gl_PointSize = aSize * uPixelRatio * (280.0 / max(1.0, -mv.z));
			gl_PointSize = clamp(gl_PointSize, 1.5, 64.0);
			gl_Position = projectionMatrix * mv;
		}
	`;

	const particleFragment = /* glsl */ `
		varying float vBlink;
		varying float vDepth;
		void main() {
			vec2 c = gl_PointCoord * 2.0 - 1.0;
			float d = dot(c, c);
			if (d > 1.0) discard;
			float core = exp(-d * 3.5);
			float rim = exp(-d * 1.2) - core * 0.5;
			vec3 col = mix(vec3(0.45, 0.95, 0.78), vec3(0.72, 0.62, 1.0), vBlink);
			float alpha = (core * 0.75 + rim * 0.35) * smoothstep(35.0, 8.0, vDepth);
			gl_FragColor = vec4(col * (0.6 + vBlink * 0.5), alpha);
		}
	`;

	function disposeMeshLike(obj: { geometry: BufferGeometry; material: Material | Material[] }) {
		obj.geometry.dispose();
		const mat = obj.material;
		if (Array.isArray(mat)) {
			for (const m of mat) m.dispose();
		} else mat.dispose();
	}

	onMount(() => {
		let disposed = false;
		let raf = 0;
		let teardown: (() => void) | undefined;

		let mx = 0;
		let my = 0;
		const onMove = (e: MouseEvent) => {
			mx = (e.clientX / window.innerWidth) * 2 - 1;
			my = (e.clientY / window.innerHeight) * 2 - 1;
		};
		window.addEventListener('mousemove', onMove, { passive: true });

		void (async () => {
			const THREE = await import('three');
			const { EffectComposer } = await import('three/addons/postprocessing/EffectComposer.js');
			const { RenderPass } = await import('three/addons/postprocessing/RenderPass.js');
			const { UnrealBloomPass } = await import('three/addons/postprocessing/UnrealBloomPass.js');

			if (disposed || !canvas || !root) return;

			const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			const w0 = root.clientWidth || window.innerWidth;
			const mobile = w0 < 768;

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
			camera.position.set(0, 0.4, 14);

			const renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: false,
				antialias: true,
				powerPreference: 'high-performance'
			});
			renderer.setClearColor(0x09090b, 1);
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.toneMappingExposure = mobile ? 1.05 : 1.25;

			const skyGeo = new THREE.SphereGeometry(80, 64, 48);
			const skyMat = new THREE.ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
					uMouse: { value: new THREE.Vector2(0, 0) },
					uReduced: { value: reduced ? 1 : 0 }
				},
				vertexShader: skyVertex,
				fragmentShader: skyFragment,
				side: THREE.BackSide,
				depthWrite: false
			});
			scene.add(new THREE.Mesh(skyGeo, skyMat));

			scene.add(new THREE.AmbientLight(0x1a1a2e, 0.45));
			const p1 = new THREE.PointLight(0x34d399, mobile ? 42 : 130, 80, 2);
			p1.position.set(12, 10, 14);
			scene.add(p1);
			const p2 = new THREE.PointLight(0x8b5cf6, mobile ? 32 : 100, 75, 2);
			p2.position.set(-14, -8, 12);
			scene.add(p2);
			const p3 = new THREE.PointLight(0x2dd4bf, mobile ? 20 : 52, 40, 2);
			p3.position.set(0, -12, 8);
			scene.add(p3);

			const grid = new THREE.GridHelper(56, 56, 0x34d399, 0x52525b);
			grid.position.set(0, -6, -4);
			const gMat = grid.material;
			const mats = (Array.isArray(gMat) ? gMat : [gMat]) as LineBasicMaterial[];
			for (const m of mats) {
				m.transparent = true;
				m.opacity = mobile ? 0.06 : 0.11;
			}
			scene.add(grid);

			const icoGeo = new THREE.IcosahedronGeometry(2.45, 1);
			const icoMat = new THREE.MeshStandardMaterial({
				color: 0x09090b,
				emissive: 0x10b981,
				emissiveIntensity: mobile ? 0.55 : 0.95,
				metalness: 0.92,
				roughness: 0.18,
				wireframe: true
			});
			const ico = new THREE.Mesh(icoGeo, icoMat);
			scene.add(ico);

			const icoGlow = new THREE.Mesh(
				icoGeo.clone(),
				new THREE.MeshBasicMaterial({
					color: 0xfbbf24,
					wireframe: true,
					transparent: true,
					opacity: mobile ? 0.12 : 0.22,
					blending: THREE.AdditiveBlending,
					depthWrite: false
				})
			);
			icoGlow.scale.setScalar(1.09);
			scene.add(icoGlow);

			const dodeGeo = new THREE.DodecahedronGeometry(0.95, 0);
			const dodeMat = new THREE.MeshStandardMaterial({
				color: 0x09090b,
				emissive: 0xa78bfa,
				emissiveIntensity: 0.7,
				metalness: 0.88,
				roughness: 0.2,
				wireframe: true
			});
			const dode = new THREE.Mesh(dodeGeo, dodeMat);
			dode.position.set(4.5, -0.8, 1.5);
			scene.add(dode);

			const ringOuter = new THREE.Mesh(
				new THREE.TorusGeometry(5.2, 0.018, 12, 160),
				new THREE.MeshBasicMaterial({
					color: 0xfcd34d,
					transparent: true,
					opacity: 0.45,
					blending: THREE.AdditiveBlending,
					depthWrite: false
				})
			);
			ringOuter.rotation.x = Math.PI / 2.2;
			scene.add(ringOuter);

			const ringMid = new THREE.Mesh(
				new THREE.TorusGeometry(4.1, 0.035, 16, 128),
				new THREE.MeshBasicMaterial({
					color: 0xc4b5fd,
					transparent: true,
					opacity: 0.22,
					blending: THREE.AdditiveBlending,
					depthWrite: false
				})
			);
			ringMid.rotation.x = Math.PI / 2.45;
			ringMid.rotation.y = 0.4;
			scene.add(ringMid);

			const pCount = reduced ? 320 : mobile ? 1400 : 3600;
			const pPos = new Float32Array(pCount * 3);
			const pPhase = new Float32Array(pCount);
			const pSize = new Float32Array(pCount);
			for (let i = 0; i < pCount; i++) {
				const r = 6 + Math.random() * 36;
				const theta = Math.random() * Math.PI * 2;
				const phi = Math.acos(2 * Math.random() - 1);
				pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
				pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
				pPos[i * 3 + 2] = r * Math.cos(phi) - 8;
				pPhase[i] = Math.random() * Math.PI * 2;
				pSize[i] = mobile ? 0.045 + Math.random() * 0.06 : 0.035 + Math.random() * 0.09;
			}
			const pGeo = new THREE.BufferGeometry();
			pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
			pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1));
			pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1));
			const pUniforms = {
				uTime: { value: 0 },
				uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
				uReduced: { value: reduced ? 1 : 0 }
			};
			const dust = new THREE.Points(
				pGeo,
				new THREE.ShaderMaterial({
					uniforms: pUniforms,
					vertexShader: particleVertex,
					fragmentShader: particleFragment,
					transparent: true,
					depthWrite: false,
					blending: THREE.AdditiveBlending
				})
			);
			scene.add(dust);

			const instN = reduced ? 48 : mobile ? 140 : 320;
			const octGeo = new THREE.OctahedronGeometry(0.11, 0);
			const octMat = new THREE.MeshStandardMaterial({
				color: 0x18181b,
				emissive: 0x059669,
				emissiveIntensity: 0.85,
				metalness: 0.85,
				roughness: 0.25
			});
			const shards = new THREE.InstancedMesh(octGeo, octMat, instN);
			const dummy = new THREE.Object3D();
			const bases: { x: number; y: number; z: number }[] = [];
			const phases: number[] = [];
			const speeds: number[] = [];
			for (let i = 0; i < instN; i++) {
				const r = 4 + Math.random() * 22;
				const theta = Math.random() * Math.PI * 2;
				const phi = Math.acos(2 * Math.random() - 1);
				const v = {
					x: r * Math.sin(phi) * Math.cos(theta),
					y: r * Math.sin(phi) * Math.sin(theta),
					z: r * Math.cos(phi) * 0.7 - 3
				};
				bases.push(v);
				phases.push(Math.random() * Math.PI * 2);
				speeds.push(0.4 + Math.random() * 1.2);
				dummy.position.set(v.x, v.y, v.z);
				dummy.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
				const sc = 0.45 + Math.random() * 1.1;
				dummy.scale.setScalar(sc);
				dummy.updateMatrix();
				shards.setMatrixAt(i, dummy.matrix);
			}
			shards.instanceMatrix.needsUpdate = true;
			scene.add(shards);

			const composer = new EffectComposer(renderer);
			const renderPass = new RenderPass(scene, camera);
			composer.addPass(renderPass);
			const bloom = new UnrealBloomPass(
				new THREE.Vector2(1, 1),
				mobile ? 0.55 : 0.95,
				mobile ? 0.32 : 0.48,
				mobile ? 0.72 : 0.82
			);
			composer.addPass(bloom);

			const setSize = () => {
				const rw = root.clientWidth || 1;
				const rh = root.clientHeight || 1;
				camera.aspect = rw / rh;
				camera.updateProjectionMatrix();
				const dpr = Math.min(window.devicePixelRatio, 2);
				renderer.setPixelRatio(dpr);
				renderer.setSize(rw, rh, false);
				composer.setSize(rw, rh);
				pUniforms.uPixelRatio.value = dpr;
			};
			setSize();
			const ro = new ResizeObserver(setSize);
			ro.observe(root);

			let t = 0;
			const tick = () => {
				if (disposed) return;
				raf = requestAnimationFrame(tick);
				if (!reduced) t += 0.009;

				skyMat.uniforms.uTime.value = t;
				skyMat.uniforms.uMouse.value.set(mx, -my);
				pUniforms.uTime.value = t;

				if (!reduced) {
					ico.rotation.x = t * 0.26;
					ico.rotation.y = t * 0.38;
					icoGlow.rotation.copy(ico.rotation);
					dode.rotation.x = t * 0.5;
					dode.rotation.y = -t * 0.35;
					dust.rotation.y = t * 0.055;
					ringOuter.rotation.z = t * 0.11;
					ringMid.rotation.z = -t * 0.09;
					grid.position.z = -4 + Math.sin(t * 0.12) * 0.35;

					for (let i = 0; i < instN; i++) {
						const base = bases[i];
						const ph = phases[i];
						const sp = speeds[i];
						dummy.position.set(
							base.x + Math.sin(t * sp + ph) * 0.55,
							base.y + Math.cos(t * sp * 0.8 + ph) * 0.4,
							base.z + Math.sin(t * 0.15 + ph) * 0.25
						);
						dummy.rotation.set(t * 0.2 + ph, t * 0.35 + ph * 0.5, t * 0.15);
						dummy.scale.setScalar(0.65 + Math.sin(t * 2 + i) * 0.2);
						dummy.updateMatrix();
						shards.setMatrixAt(i, dummy.matrix);
					}
					shards.instanceMatrix.needsUpdate = true;
				}

				camera.position.x += (mx * 2.4 - camera.position.x) * 0.035;
				camera.position.y += (-my * 1.5 + 0.4 - camera.position.y) * 0.035;
				camera.lookAt(0, 0, -2);

				composer.render();
			};

			const disposeScene = () => {
				cancelAnimationFrame(raf);
				ro.disconnect();
				skyGeo.dispose();
				skyMat.dispose();
				disposeMeshLike(ico);
				disposeMeshLike(icoGlow);
				disposeMeshLike(dode);
				disposeMeshLike(ringOuter);
				disposeMeshLike(ringMid);
				dust.geometry.dispose();
				(dust.material as Material).dispose();
				shards.geometry.dispose();
				(shards.material as Material).dispose();
				grid.geometry.dispose();
				for (const m of mats) m.dispose();
				composer.dispose();
				renderer.dispose();
			};

			if (disposed) {
				disposeScene();
				return;
			}

			teardown = disposeScene;
			tick();
		})();

		return () => {
			disposed = true;
			cancelAnimationFrame(raf);
			window.removeEventListener('mousemove', onMove);
			teardown?.();
		};
	});
</script>

<div
	bind:this={root}
	class="pointer-events-none fixed inset-0 -z-10 overflow-hidden {clazz}"
	aria-hidden="true"
>
	<canvas bind:this={canvas} class="block h-full w-full"></canvas>
	<div
		class="absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-zinc-950/50 to-zinc-950"
	></div>
</div>
