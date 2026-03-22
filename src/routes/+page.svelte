<script lang="ts">
	import Scene3D from '$lib/components/Scene3D.svelte';
	import { site } from '$lib/site';
	import {
		Bluetooth,
		Bot,
		Box,
		Code2,
		Container,
		Database,
		Globe,
		Home,
		Layers,
		Lock,
		Network,
		Radio,
		Server,
		Smartphone,
		Sparkles,
		Terminal,
		Wrench,
		Zap
	} from 'lucide-svelte';

	const nav = [
		{ href: '#despre', label: 'Despre' },
		{ href: '#competente', label: 'Competențe' },
		{ href: '#proiecte', label: 'Proiecte' },
		{ href: '#stil', label: 'Stil & obiective' },
		{ href: '#contact', label: 'Contact' }
	];

	const limbi = [
		'Python — scripting, automatizări, backend, procesare date',
		'JavaScript / TypeScript — frontend & backend (Node.js)',
		'Go (Golang) — servicii backend performante',
		'SQL — interogări, modelare, manipulare date',
		'HTML & CSS — UI responsive și modern',
		'Bash — automatizări și task-uri pe server'
	];

	const backend = [
		'Node.js (Express)',
		'API REST',
		'Python (scripturi & servicii)',
		'Go — microservicii / servicii performante'
	];

	const frontend = [
		'SvelteKit',
		'React Native',
		'Capacitor (web → mobile)',
		'UI responsive & UX optimizat'
	];

	const db = [
		'SQLite (aplicații)',
		'PostgreSQL — admin, useri, permisiuni',
		'Oracle — enterprise',
		'JSON & optimizare query-uri'
	];

	const devops = [
		'Linux — server & terminal',
		'Nginx — reverse proxy',
		'Docker',
		'Domenii & SSL',
		'Deploy manual & scripturi automate'
	];

	const altele = [
		'LDAP — integrare & scripting',
		'Bluetooth — scanare, transfer fișiere',
		'API-uri externe (ex. produse, barcode)',
		'Interes AI / ML & generare conținut'
	];

	const networking = [
		'Testare & analiză endpoint-uri',
		'Măsurare performanță (response time, load)',
		'Tool-uri custom pentru benchmarking'
	];

	const proiecte = [
		{
			icon: Bot,
			title: 'Chatbot cu memorie',
			desc: 'SQLite, învățare din input.'
		},
		{
			icon: Wrench,
			title: 'Tool testare API',
			desc: 'UI + statistici de performanță.'
		},
		{
			icon: Globe,
			title: 'Aplicații web SvelteKit',
			desc: 'Produse web moderne și rapide.'
		},
		{
			icon: Smartphone,
			title: 'Aplicații mobile',
			desc: 'React Native / Capacitor.'
		},
		{
			icon: Lock,
			title: 'Integrare LDAP',
			desc: 'Căutare utilizatori și structuri organizaționale.'
		},
		{
			icon: Bluetooth,
			title: 'Tool Bluetooth',
			desc: 'Scanare dispozitive + transfer fișiere.'
		},
		{
			icon: Box,
			title: 'Deploy automatizat',
			desc: 'Scripturi Bash + Docker.'
		},
		{
			icon: Home,
			title: 'Platformă imobiliară',
			desc: 'DB + imagini base64 + UI.'
		},
		{
			icon: Terminal,
			title: 'Automatizare & testare',
			desc: 'Scripturi și utilitare.'
		}
	];
</script>

<Scene3D />

<div class="relative z-10">
	<header
		class="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/55"
	>
		<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
			<a href="/" class="group flex items-center gap-2 font-semibold tracking-tight">
				<span
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/25 ring-1 ring-white/10 transition group-hover:ring-cyan-400/40"
				>
					<Sparkles class="h-4 w-4 text-cyan-300" strokeWidth={2} />
				</span>
				<span class="hidden sm:inline">
					<span class="text-white">{site.name.split(' ')[0]}</span>
					<span class="text-slate-400"> · dev</span>
				</span>
			</a>
			<nav class="flex flex-wrap items-center justify-end gap-1 text-sm">
				{#each nav as item}
					<a
						href={item.href}
						class="rounded-lg px-2.5 py-1.5 text-slate-400 transition hover:bg-white/5 hover:text-cyan-200 sm:px-3"
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
	</header>

	<main>
		<section
			id="despre"
			class="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 pb-20 pt-16 sm:px-6"
		>
			<div
				class="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]"
			></div>
			<div
				class="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-violet-600/20 blur-[110px]"
			></div>

			<p
				class="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-300/90"
			>
				<Zap class="h-3.5 w-3.5" />
				Disponibil pentru proiecte
			</p>
			<h1
				class="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
			>
				{site.name}
				<span class="mt-2 block text-balance bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
					{site.tagline}
				</span>
			</h1>
			<p class="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-400 sm:text-xl">
				Construiesc aplicații reale, integrări și automatizări — de la SvelteKit și API-uri, la
				baze de date enterprise și infrastructură Linux/Docker. Prefer soluții simple, eficiente și
				ușor de controlat.
			</p>
			<div class="mt-10 flex flex-wrap gap-3">
				<a
					href="#competente"
					class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:brightness-110"
				>
					Vezi stack-ul
				</a>
				<a
					href="#contact"
					class="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-400/40 hover:bg-white/10"
				>
					Contact
				</a>
			</div>
		</section>

		<section id="competente" class="border-t border-white/5 bg-slate-950/40 py-20 sm:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<div class="max-w-2xl">
					<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Competențe tehnice</h2>
					<p class="mt-3 text-slate-400">
						Limbaje, frameworkuri și zona operațională — tot ce folosesc zi de zi.
					</p>
				</div>

				<div class="mt-12 grid gap-6 lg:grid-cols-2">
					<article
						class="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-6 shadow-xl shadow-black/20 backdrop-blur-sm"
					>
						<div class="mb-4 flex items-center gap-2 text-cyan-300">
							<Code2 class="h-5 w-5" strokeWidth={2} />
							<h3 class="text-lg font-semibold text-white">Limbaje de programare</h3>
						</div>
						<ul class="space-y-2.5 text-slate-300">
							{#each limbi as row}
								<li class="flex gap-2 text-sm leading-relaxed">
									<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80"></span>
									{row}
								</li>
							{/each}
						</ul>
					</article>

					<div class="grid gap-6 sm:grid-cols-2">
						<article
							class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
						>
							<div class="mb-3 flex items-center gap-2 text-violet-300">
								<Server class="h-5 w-5" />
								<h3 class="font-semibold text-white">Backend</h3>
							</div>
							<ul class="space-y-1.5 text-sm text-slate-400">
								{#each backend as row}
									<li>{row}</li>
								{/each}
							</ul>
						</article>
						<article
							class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
						>
							<div class="mb-3 flex items-center gap-2 text-sky-300">
								<Layers class="h-5 w-5" />
								<h3 class="font-semibold text-white">Frontend & mobile</h3>
							</div>
							<ul class="space-y-1.5 text-sm text-slate-400">
								{#each frontend as row}
									<li>{row}</li>
								{/each}
							</ul>
						</article>
						<article
							class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
						>
							<div class="mb-3 flex items-center gap-2 text-emerald-300">
								<Database class="h-5 w-5" />
								<h3 class="font-semibold text-white">Baze de date</h3>
							</div>
							<ul class="space-y-1.5 text-sm text-slate-400">
								{#each db as row}
									<li>{row}</li>
								{/each}
							</ul>
						</article>
						<article
							class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
						>
							<div class="mb-3 flex items-center gap-2 text-amber-300">
								<Container class="h-5 w-5" />
								<h3 class="font-semibold text-white">DevOps & sisteme</h3>
							</div>
							<ul class="space-y-1.5 text-sm text-slate-400">
								{#each devops as row}
									<li>{row}</li>
								{/each}
							</ul>
						</article>
					</div>
				</div>

				<div class="mt-8 grid gap-6 md:grid-cols-2">
					<article
						class="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-6 backdrop-blur-sm"
					>
						<div class="mb-3 flex items-center gap-2 text-cyan-200">
							<Network class="h-5 w-5" />
							<h3 class="font-semibold text-white">Networking & API</h3>
						</div>
						<ul class="space-y-1.5 text-sm text-slate-400">
							{#each networking as row}
								<li>{row}</li>
							{/each}
						</ul>
					</article>
					<article
						class="rounded-2xl border border-violet-500/20 bg-violet-950/20 p-6 backdrop-blur-sm"
					>
						<div class="mb-3 flex items-center gap-2 text-violet-200">
							<Radio class="h-5 w-5" />
							<h3 class="font-semibold text-white">Alte tehnologii</h3>
						</div>
						<ul class="space-y-1.5 text-sm text-slate-400">
							{#each altele as row}
								<li>{row}</li>
							{/each}
						</ul>
					</article>
				</div>
			</div>
		</section>

		<section id="proiecte" class="py-20 sm:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Proiecte & experiență</h2>
				<p class="mt-3 max-w-2xl text-slate-400">
					Select din lucrări practice: de la chatbot și LDAP la mobile și deploy automatizat.
				</p>
				<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each proiecte as p}
						{@const Icon = p.icon}
						<article
							class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
						>
							<div
								class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-2xl transition group-hover:opacity-100"
							></div>
							<div
								class="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/20 text-cyan-200 ring-1 ring-white/10"
							>
								<Icon class="h-5 w-5" strokeWidth={2} />
							</div>
							<h3 class="font-semibold text-white">{p.title}</h3>
							<p class="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="stil" class="border-t border-white/5 bg-slate-950/50 py-20 sm:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<div class="grid gap-12 lg:grid-cols-3">
					<div class="lg:col-span-1">
						<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Stil de lucru</h2>
						<p class="mt-4 text-slate-400 leading-relaxed">
							Prefer soluții simple, eficiente și controlabile. Evit complexitatea inutilă și
							„magia” excesivă din frameworkuri. Mă orientez spre rezultate rapide, automatizare și
							optimizare — și îmi place să îmi construiesc propriile tool-uri când nu găsesc
							soluția potrivită.
						</p>
					</div>
					<div class="lg:col-span-2 grid gap-6 sm:grid-cols-2">
						<article class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
							<h3 class="flex items-center gap-2 text-lg font-semibold text-white">
								<Zap class="h-5 w-5 text-amber-300" />
								Direcție & obiective
							</h3>
							<ul class="mt-4 space-y-2 text-sm text-slate-400">
								<li>• Aplicații reale cu mulți utilizatori</li>
								<li>• Produse digitale scalabile</li>
								<li>• Sisteme complexe (CRM, platforme, servicii)</li>
							</ul>
							<div class="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-4 font-mono text-xs text-slate-300">
								<p class="text-cyan-400/90">// stack preferat</p>
								<p class="mt-2">FE: SvelteKit</p>
								<p>Mobile: RN / Capacitor</p>
								<p>BE: FastAPI / Node / Go</p>
								<p>DB: PostgreSQL / Oracle</p>
								<p>Infra: Linux + Docker</p>
							</div>
						</article>
						<article class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
							<h3 class="flex items-center gap-2 text-lg font-semibold text-white">
								<Sparkles class="h-5 w-5 text-violet-300" />
								Nivel profesional
							</h3>
							<p class="mt-3 text-sm font-medium text-cyan-200">Junior → Mid</p>
							<p class="mt-4 text-sm font-semibold text-white">Puncte forte</p>
							<ul class="mt-2 space-y-1.5 text-sm text-slate-400">
								<li>• Backend & logică</li>
								<li>• Baze de date (inclusiv Oracle enterprise)</li>
								<li>• Integrare sisteme</li>
								<li>• Automatizări</li>
							</ul>
							<p class="mt-4 text-sm font-semibold text-white">În dezvoltare</p>
							<ul class="mt-2 space-y-1.5 text-sm text-slate-400">
								<li>• Scalare & arhitecturi distribuite</li>
								<li>• Cloud & DevOps avansat</li>
								<li>• UI/UX avansat</li>
							</ul>
						</article>
					</div>
				</div>
			</div>
		</section>

		<section id="contact" class="pb-24 pt-8">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<div
					class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-violet-600/15 p-8 sm:p-12"
				>
					<div
						class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.12),transparent_50%)]"
					></div>
					<div class="relative">
						<h2 class="text-2xl font-bold text-white sm:text-3xl">Hai să construim ceva solid.</h2>
						<p class="mt-2 max-w-xl text-slate-400">
							Pentru colaborări, freelancing sau discuții tehnice — scrie-mi.
						</p>
						<div class="mt-8 flex flex-wrap gap-3">
							<a
								href={`mailto:${site.email}`}
								class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
							>
								Email
							</a>
							{#if site.githubUrl}
								<a
									href={site.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40"
								>
									GitHub
								</a>
							{/if}
							{#if site.linkedinUrl}
								<a
									href={site.linkedinUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-400/40"
								>
									LinkedIn
								</a>
							{/if}
						</div>
						<p class="mt-6 font-mono text-xs text-slate-500">
							Actualizează <span class="text-slate-400">src/lib/site.ts</span> cu email și linkuri sociale.
						</p>
					</div>
				</div>
			</div>
		</section>
	</main>

	<footer class="border-t border-white/5 py-8 text-center text-sm text-slate-500">
		<p>© {new Date().getFullYear()} {site.name}. Construit cu SvelteKit, Tailwind & Three.js.</p>
	</footer>
</div>
