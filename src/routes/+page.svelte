<script lang="ts">
	import { page } from '$app/state';
	import { inview } from '$lib/actions/inview';
	import Scene3D from '$lib/components/Scene3D.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import type { Locale } from '$lib/i18n/locale';
	import { getMessages } from '$lib/i18n/messages';
	import { site } from '$lib/site';
	import {
		ArrowUpRight,
		Bluetooth,
		Bot,
		Box,
		ChevronRight,
		Code2,
		Container,
		Database,
		Globe,
		Home,
		Layers,
		Lock,
		Mail,
		Network,
		Radio,
		Server,
		Smartphone,
		Sparkles,
		Terminal,
		Wrench
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

	const skillBlocks = $derived([
		{ title: t.langProg, items: t.limbi, icon: Code2 },
		{ title: t.backend, items: t.backendList, icon: Server },
		{ title: t.frontendMobile, items: t.frontendList, icon: Layers },
		{ title: t.databases, items: t.dbList, icon: Database },
		{ title: t.devops, items: t.devopsList, icon: Container },
		{ title: t.networkingApi, items: t.networkingList, icon: Network },
		{ title: t.otherTech, items: t.alteleList, icon: Radio }
	]);

	const quickSectionLinks = $derived(
		t.nav.filter((n) => n.href === '#skills' || n.href === '#projects' || n.href === '#contact')
	);
</script>

<Scene3D />

<div class="page-atmos relative z-10">
	<SiteHeader
		nav={t.nav}
		a11yOpenMenu={t.a11yOpenMenu}
		a11yCloseMenu={t.a11yCloseMenu}
		a11yCloseOverlay={t.a11yCloseOverlay}
		mobileNavAriaLabel={t.mobileNavAriaLabel}
	/>

	<main class="text-slate-300">
		<!-- Hero -->
		<section
			id="about"
			class="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-24"
		>
			<div
				class="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px] sm:top-32"
				aria-hidden="true"
			></div>
			<div
				class="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-500/15 blur-[110px]"
				aria-hidden="true"
			></div>

			<div class="relative grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
				<div class="lg:col-span-7">
					<p class="section-label hero-in mb-5 sm:mb-6">{t.kickerHero}</p>
					<h1
						class="font-display hero-in hero-in-d1 text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white"
					>
						{site.name}
					</h1>
					<p
						class="font-display hero-in hero-in-d2 mt-4 text-xl font-medium text-slate-400 sm:text-2xl md:text-3xl"
					>
						<span class="text-accent-gradient">{t.tagline}</span>
					</p>
					<p
						class="hero-in hero-in-d3 mt-7 max-w-xl text-pretty text-base leading-[1.7] text-slate-400 sm:mt-8 sm:text-lg"
					>
						{t.heroIntro}
					</p>

					<nav
						class="hero-in hero-in-d3 mt-8 flex flex-wrap gap-2.5 sm:mt-10"
						aria-label="On this page"
					>
						{#each t.nav.filter((n) => n.href !== '#about') as item (item.href)}
							<a
								href={item.href}
								class="min-h-11 touch-manipulation rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm font-semibold text-slate-300 shadow-sm backdrop-blur-sm transition active:scale-[0.98] sm:min-h-0 sm:py-2 hover:border-blue-500/35 hover:bg-slate-800/60 hover:text-white"
							>
								{item.label}
							</a>
						{/each}
					</nav>

					<div
						class="hero-in hero-in-d4 mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center"
					>
						<a
							href="#skills"
							class="btn-primary-pro inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-xl px-8 py-3.5 text-sm font-bold text-white sm:w-auto"
						>
							{t.ctaStack}
						</a>
						<a
							href="#contact"
							class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/15 bg-slate-900/40 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 backdrop-blur-md transition hover:border-amber-400/30 hover:bg-slate-800/50 active:scale-[0.98] sm:w-auto"
						>
							{t.ctaContact}
							<ArrowUpRight class="h-4 w-4 opacity-80" strokeWidth={2} />
						</a>
					</div>
				</div>

				<div class="hero-in hero-in-d2 lg:col-span-5">
					<div class="glass-panel glass-panel--hover relative overflow-hidden rounded-3xl p-1">
						<div class="rounded-[1.35rem] bg-slate-950/60 p-5 sm:p-6">
							<p class="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-blue-400/90">
								{t.kickerStack}
							</p>
							<p class="font-display mt-2 text-lg font-semibold text-white">{t.skillsTitle}</p>
							<ul class="mt-5 space-y-0">
								{#each quickSectionLinks as link (link.href)}
									<li class="border-t border-white/[0.07] first:border-t-0 first:pt-0">
										<a
											href={link.href}
											class="group flex min-h-[3.25rem] touch-manipulation items-center justify-between gap-3 py-3.5 text-[0.9375rem] font-semibold text-slate-200 transition hover:text-white sm:min-h-0 sm:py-4"
										>
											<span>{link.label}</span>
											<ChevronRight
												class="h-5 w-5 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-amber-400"
												strokeWidth={2}
											/>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Skills -->
		<section id="skills" class="section-band py-16 sm:py-24 lg:py-28">
			<div class="mx-auto max-w-7xl px-4 sm:px-6">
				<header class="wow-in mb-12 sm:mb-16" use:inview>
					<p class="section-label mb-4">{t.kickerStack}</p>
					<h2
						class="font-display max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
					>
						{t.skillsTitle}
					</h2>
					<p class="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
						{t.skillsSubtitle}
					</p>
				</header>

				<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
					{#each skillBlocks as block}
						{@const Icon = block.icon}
						<article
							class="glass-panel glass-panel--hover wow-in flex flex-col rounded-2xl p-5 sm:p-6"
							use:inview
						>
							<div class="flex items-start gap-4">
								<span
									class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/25 to-indigo-600/20 text-blue-200 ring-1 ring-blue-400/20"
								>
									<Icon class="h-6 w-6" strokeWidth={2} />
								</span>
								<div class="min-w-0 flex-1">
									<h3 class="font-display text-base font-bold text-white sm:text-lg">
										{block.title}
									</h3>
									<div class="mt-4 flex flex-wrap gap-2">
										{#each block.items as row}
											<span class="skill-chip text-pretty">{row}</span>
										{/each}
									</div>
								</div>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<!-- Projects -->
		<section id="projects" class="py-16 sm:py-24 lg:py-28">
			<div class="mx-auto max-w-7xl px-4 sm:px-6">
				<header class="wow-in mb-12 sm:mb-14" use:inview>
					<p class="section-label mb-4">{t.kickerWork}</p>
					<h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
						{t.projectsTitle}
					</h2>
					<p class="mt-4 max-w-2xl text-pretty text-base text-slate-400 sm:text-lg">
						{t.projectsSubtitle}
					</p>
				</header>

				<div
					class="stagger-fade grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
					use:inview
				>
					{#each proiecte as p, i}
						{@const Icon = p.icon}
						<article
							class="glass-panel glass-panel--hover group relative flex flex-col rounded-2xl p-5 sm:p-6"
						>
							<div class="mb-4 flex items-center justify-between gap-3">
								<span
									class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-400/25 transition group-hover:bg-indigo-500/25"
								>
									<Icon class="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
								</span>
								<span class="font-mono text-xs font-medium text-slate-600">{String(i + 1).padStart(2, '0')}</span>
							</div>
							<h3 class="font-display text-lg font-bold leading-snug text-white">{p.title}</h3>
							<p class="mt-2 flex-1 text-pretty text-sm leading-relaxed text-slate-400 sm:text-[0.9375rem]">
								{p.desc}
							</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<!-- Approach -->
		<section id="approach" class="section-band py-16 sm:py-24 lg:py-28">
			<div class="mx-auto max-w-7xl px-4 sm:px-6">
				<div class="wow-in mb-12 lg:mb-14" use:inview>
					<p class="section-label mb-4">{t.kickerApproach}</p>
					<h2 class="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
						{t.styleTitle}
					</h2>
				</div>

				<div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
					<article class="glass-panel glass-panel--hover wow-in rounded-2xl p-6 sm:p-8" use:inview>
						<p class="text-pretty text-base leading-[1.75] text-slate-300 sm:text-lg">{t.styleBody}</p>
					</article>

					<article class="glass-panel glass-panel--hover wow-in rounded-2xl p-6 sm:p-8" use:inview>
						<div class="flex items-center gap-2 text-amber-400">
							<Sparkles class="h-5 w-5 shrink-0" strokeWidth={2} />
							<span class="font-mono text-xs font-semibold uppercase tracking-widest">{t.directionTitle}</span>
						</div>
						<ul class="mt-6 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
							{#each t.directionBullets as line}
								<li class="flex gap-3">
									<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"></span>
									<span>{line}</span>
								</li>
							{/each}
						</ul>
						<div
							class="mt-8 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/90 p-4 font-mono text-[0.7rem] leading-relaxed text-slate-400 shadow-inner sm:text-xs"
						>
							<p class="text-blue-400">{t.stackComment}</p>
							{#each t.stackLines as line, j}
								<p class:mt-2={j === 0}>{line}</p>
							{/each}
						</div>
					</article>
				</div>
			</div>
		</section>

		<!-- Contact -->
		<section
			id="contact"
			class="pb-[max(4.5rem,env(safe-area-inset-bottom))] pt-14 sm:pb-28 sm:pt-20"
		>
			<div class="mx-auto max-w-7xl px-4 sm:px-6">
				<div
					class="contact-glow-ring relative wow-in overflow-hidden rounded-3xl bg-slate-900/40 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10 lg:p-12"
					use:inview
				>
					<div
						class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_100%_0%,rgba(59,130,246,0.12),transparent),radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(245,158,11,0.08),transparent)]"
						aria-hidden="true"
					></div>
					<div class="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
						<div>
							<p class="section-label mb-4">{t.kickerContact}</p>
							<h2 class="font-display text-3xl font-bold text-white sm:text-4xl">{t.contactTitle}</h2>
							<p class="mt-4 max-w-lg text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
								{t.contactSubtitle}
							</p>
						</div>
						<div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
							<a
								href={`mailto:${site.email}`}
								class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-slate-100 active:scale-[0.98] sm:w-auto"
							>
								<Mail class="h-4 w-4" strokeWidth={2} />
								{t.emailLabel}
							</a>
							{#if site.telegramUrl}
								<a
									href={site.telegramUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-xl border border-white/15 bg-slate-800/50 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-sky-400/40 hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
								>
									{t.telegramLabel}
								</a>
							{/if}
							{#if site.githubUrl}
								<a
									href={site.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-xl border border-white/15 bg-slate-800/50 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-blue-400/40 hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
								>
									GitHub
								</a>
							{/if}
							{#if site.linkedinUrl}
								<a
									href={site.linkedinUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-xl border border-white/15 bg-slate-800/50 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-indigo-400/40 hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
								>
									LinkedIn
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>

	<footer
		class="border-t border-white/[0.06] px-4 py-10 text-center text-xs text-slate-500 sm:py-12 sm:text-sm"
	>
		<p class="text-pretty">© {new Date().getFullYear()} {site.name}</p>
	</footer>
</div>
