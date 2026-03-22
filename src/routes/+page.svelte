<script lang="ts">
	import { page } from '$app/state';
	import Scene3D from '$lib/components/Scene3D.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import type { Locale } from '$lib/i18n/locale';
	import { getMessages } from '$lib/i18n/messages';
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

	const locale = $derived((page.data.locale ?? 'en') as Locale);
	const t = $derived(getMessages(locale));

	const projectIcons = [Bot, Wrench, Globe, Smartphone, Lock, Bluetooth, Box, Home, Terminal] as const;
	const proiecte = $derived(
		t.projects.map((p, i) => ({
			title: p.title,
			desc: p.desc,
			icon: projectIcons[i]!
		}))
	);
</script>

<Scene3D />

<div class="relative z-10">
	<SiteHeader
		nav={t.nav}
		a11yOpenMenu={t.a11yOpenMenu}
		a11yCloseMenu={t.a11yCloseMenu}
		a11yCloseOverlay={t.a11yCloseOverlay}
		mobileNavAriaLabel={t.mobileNavAriaLabel}
	/>

	<main>
		<section
			id="about"
			class="relative mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-center px-4 pb-16 pt-12 sm:min-h-[88vh] sm:px-6 sm:pb-20 sm:pt-16"
		>
			<div
				class="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]"
			></div>
			<div
				class="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-violet-600/20 blur-[110px]"
			></div>

			<p
				class="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.65rem] font-medium uppercase leading-tight tracking-widest text-cyan-300/90 sm:mb-4 sm:py-1 sm:text-xs"
			>
				<Zap class="h-3.5 w-3.5 shrink-0" />
				<span class="text-balance">{t.heroBadge}</span>
			</p>
			<h1
				class="max-w-3xl text-[clamp(1.65rem,6vw+0.5rem,2.5rem)] font-bold leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-tight md:text-6xl lg:text-7xl"
			>
				<span class="block text-balance">{site.name}</span>
				<span
					class="mt-2 block text-balance bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-[0.92em] text-transparent sm:text-inherit"
				>
					{t.tagline}
				</span>
			</h1>
			<p
				class="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg md:text-xl"
			>
				{t.heroIntro}
			</p>
			<div class="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap">
				<a
					href="#skills"
					class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:brightness-110 active:brightness-95 sm:min-h-0 sm:w-auto sm:py-3 sm:text-sm"
				>
					{t.ctaStack}
				</a>
				<a
					href="#contact"
					class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-cyan-400/40 hover:bg-white/10 active:bg-white/15 sm:min-h-0 sm:w-auto sm:py-3 sm:text-sm"
				>
					{t.ctaContact}
				</a>
			</div>
		</section>

		<section id="skills" class="border-t border-white/5 bg-slate-950/40 py-14 sm:py-20 md:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<div class="max-w-2xl">
					<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">{t.skillsTitle}</h2>
					<p class="mt-2 text-pretty text-sm leading-relaxed text-slate-400 sm:mt-3 sm:text-base">
						{t.skillsSubtitle}
					</p>
				</div>

				<div class="mt-8 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-2">
					<article
						class="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6"
					>
						<div class="mb-4 flex items-center gap-2 text-cyan-300">
							<Code2 class="h-5 w-5" strokeWidth={2} />
							<h3 class="text-lg font-semibold text-white">{t.langProg}</h3>
						</div>
						<ul class="space-y-2.5 text-slate-300">
							{#each t.limbi as row}
								<li class="flex gap-2.5 text-[0.9375rem] leading-relaxed sm:text-sm">
									<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80"></span>
									<span class="min-w-0">{row}</span>
								</li>
							{/each}
						</ul>
					</article>

					<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<article
							class="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-5"
						>
							<div class="mb-3 flex items-center gap-2 text-violet-300">
								<Server class="h-5 w-5" />
								<h3 class="font-semibold text-white">{t.backend}</h3>
							</div>
							<ul class="space-y-1.5 text-[0.9375rem] text-slate-400 sm:text-sm">
								{#each t.backendList as row}
									<li class="text-pretty">{row}</li>
								{/each}
							</ul>
						</article>
						<article
							class="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-5"
						>
							<div class="mb-3 flex items-center gap-2 text-sky-300">
								<Layers class="h-5 w-5" />
								<h3 class="font-semibold text-white">{t.frontendMobile}</h3>
							</div>
							<ul class="space-y-1.5 text-[0.9375rem] text-slate-400 sm:text-sm">
								{#each t.frontendList as row}
									<li>{row}</li>
								{/each}
							</ul>
						</article>
						<article
							class="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-5"
						>
							<div class="mb-3 flex items-center gap-2 text-emerald-300">
								<Database class="h-5 w-5" />
								<h3 class="font-semibold text-white">{t.databases}</h3>
							</div>
							<ul class="space-y-1.5 text-[0.9375rem] text-slate-400 sm:text-sm">
								{#each t.dbList as row}
									<li>{row}</li>
								{/each}
							</ul>
						</article>
						<article
							class="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-5"
						>
							<div class="mb-3 flex items-center gap-2 text-amber-300">
								<Container class="h-5 w-5" />
								<h3 class="font-semibold text-white">{t.devops}</h3>
							</div>
							<ul class="space-y-1.5 text-[0.9375rem] text-slate-400 sm:text-sm">
								{#each t.devopsList as row}
									<li>{row}</li>
								{/each}
							</ul>
						</article>
					</div>
				</div>

				<div class="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2">
					<article
						class="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 backdrop-blur-sm sm:p-6"
					>
						<div class="mb-3 flex items-center gap-2 text-cyan-200">
							<Network class="h-5 w-5" />
							<h3 class="font-semibold text-white">{t.networkingApi}</h3>
						</div>
						<ul class="space-y-1.5 text-[0.9375rem] text-slate-400 sm:text-sm">
							{#each t.networkingList as row}
								<li>{row}</li>
							{/each}
						</ul>
					</article>
					<article
						class="rounded-2xl border border-violet-500/20 bg-violet-950/20 p-4 backdrop-blur-sm sm:p-6"
					>
						<div class="mb-3 flex items-center gap-2 text-violet-200">
							<Radio class="h-5 w-5" />
							<h3 class="font-semibold text-white">{t.otherTech}</h3>
						</div>
						<ul class="space-y-1.5 text-[0.9375rem] text-slate-400 sm:text-sm">
							{#each t.alteleList as row}
								<li>{row}</li>
							{/each}
						</ul>
					</article>
				</div>
			</div>
		</section>

		<section id="projects" class="py-14 sm:py-20 md:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">{t.projectsTitle}</h2>
				<p class="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-slate-400 sm:mt-3 sm:text-base">
					{t.projectsSubtitle}
				</p>
				<div class="mt-8 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
					{#each proiecte as p}
						{@const Icon = p.icon}
						<article
							class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/30 hover:bg-white/[0.06] sm:p-5"
						>
							<div
								class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-2xl transition group-hover:opacity-100"
							></div>
							<div
								class="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/20 text-cyan-200 ring-1 ring-white/10"
							>
								<Icon class="h-5 w-5" strokeWidth={2} />
							</div>
							<h3 class="text-base font-semibold leading-snug text-white sm:text-[1.05rem]">{p.title}</h3>
							<p class="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="approach" class="border-t border-white/5 bg-slate-950/50 py-14 sm:py-20 md:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<div class="grid gap-8 lg:grid-cols-3 lg:gap-12">
					<div class="lg:col-span-1">
						<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">{t.styleTitle}</h2>
						<p class="mt-3 text-pretty text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
							{t.styleBody}
						</p>
					</div>
					<div class="lg:col-span-2 grid gap-4 sm:grid-cols-2 sm:gap-6">
						<article class="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6">
							<h3 class="flex items-center gap-2 text-lg font-semibold text-white">
								<Zap class="h-5 w-5 text-amber-300" />
								{t.directionTitle}
							</h3>
							<ul class="mt-4 space-y-2 text-sm text-slate-400">
								{#each t.directionBullets as line}
									<li>{line}</li>
								{/each}
							</ul>
							<div
								class="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/50 p-3 font-mono text-[0.7rem] text-slate-300 sm:mt-6 sm:p-4 sm:text-xs"
							>
								<p class="text-cyan-400/90">{t.stackComment}</p>
								{#each t.stackLines as line, i}
									<p class:mt-2={i === 0}>{line}</p>
								{/each}
							</div>
						</article>
						<article class="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6">
							<h3 class="flex items-center gap-2 text-lg font-semibold text-white">
								<Sparkles class="h-5 w-5 text-violet-300" />
								{t.levelTitle}
							</h3>
							<p class="mt-3 text-sm font-medium text-cyan-200">{t.levelBand}</p>
							<p class="mt-4 text-sm font-semibold text-white">{t.strengthsTitle}</p>
							<ul class="mt-2 space-y-1.5 text-sm text-slate-400">
								{#each t.strengths as line}
									<li>{line}</li>
								{/each}
							</ul>
							<p class="mt-4 text-sm font-semibold text-white">{t.growingTitle}</p>
							<ul class="mt-2 space-y-1.5 text-sm text-slate-400">
								{#each t.growing as line}
									<li>{line}</li>
								{/each}
							</ul>
						</article>
					</div>
				</div>
			</div>
		</section>

		<section id="contact" class="pb-[max(5rem,env(safe-area-inset-bottom))] pt-6 sm:pb-24 sm:pt-8">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<div
					class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-violet-600/15 p-5 sm:rounded-3xl sm:p-8 md:p-12"
				>
					<div
						class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.12),transparent_50%)]"
					></div>
					<div class="relative">
						<h2 class="text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">{t.contactTitle}</h2>
						<p class="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-slate-400 sm:text-base">
							{t.contactSubtitle}
						</p>
						<div class="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
							<a
								href={`mailto:${site.email}`}
								class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-cyan-100 active:bg-cyan-200 sm:min-h-0 sm:w-auto sm:py-3 sm:text-sm"
							>
								{t.emailLabel}
							</a>
							{#if site.githubUrl}
								<a
									href={site.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-base font-semibold text-white transition hover:border-cyan-400/40 active:bg-white/10 sm:min-h-0 sm:w-auto sm:py-3 sm:text-sm"
								>
									GitHub
								</a>
							{/if}
							{#if site.linkedinUrl}
								<a
									href={site.linkedinUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-base font-semibold text-white transition hover:border-violet-400/40 active:bg-white/10 sm:min-h-0 sm:w-auto sm:py-3 sm:text-sm"
								>
									LinkedIn
								</a>
							{/if}
						</div>
						<!-- <p class="mt-5 break-words font-mono text-[0.65rem] leading-relaxed text-slate-500 sm:mt-6 sm:text-xs">
							{t.footerNote}
						</p> -->
					</div>
				</div>
			</div>
		</section>
	</main>

	<footer
		class="border-t border-white/5 px-4 py-6 text-center text-xs leading-relaxed text-slate-500 sm:py-8 sm:text-sm"
	>
		<p class="text-pretty">
			© {new Date().getFullYear()}
			{site.name}. {t.footerBuilt}
		</p>
	</footer>
</div>
