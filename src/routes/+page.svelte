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
		BadgeCheck,
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

	<main class="text-zinc-300">
		<!-- Hero -->
		<section
			id="about"
			class="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:pb-32"
		>
			<div>
				<p class="section-label hero-in mb-6">{t.kickerHero}</p>
				<h1
					class="font-display hero-in hero-in-d1 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
				>
					{site.name}
				</h1>
				<p
					class="font-display hero-in hero-in-d2 mt-4 text-xl font-normal text-zinc-500 sm:text-2xl md:text-3xl"
				>
					<span class="text-accent-gradient">{t.tagline}</span>
				</p>
				<p
					class="hero-in hero-in-d3 mt-8 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg"
				>
					{t.heroIntro}
				</p>

				<nav class="hero-in hero-in-d3 mt-10 flex flex-wrap gap-2" aria-label="On this page">
					{#each t.nav.filter((n) => n.href !== '#about') as item (item.href)}
						<a
							href={item.href}
							class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-400 transition hover:border-emerald-500/30 hover:text-white"
						>
							{item.label}
						</a>
					{/each}
				</nav>

				<div class="hero-in hero-in-d4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
					<a
						href="#skills"
						class="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-400 px-8 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 active:scale-[0.98]"
					>
						{t.ctaStack}
					</a>
					<a
						href="#contact"
						class="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.04] active:scale-[0.98]"
					>
						{t.ctaContact}
						<ArrowUpRight class="h-4 w-4 opacity-70" strokeWidth={2} />
					</a>
				</div>
			</div>
		</section>

		<!-- Skills -->
		<section id="skills" class="border-t border-white/[0.06] py-20 sm:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<header class="wow-in mb-16 max-w-2xl lg:mb-20" use:inview>
					<p class="section-label mb-4">{t.kickerStack}</p>
					<h2 class="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
						{t.skillsTitle}
					</h2>
					<p class="mt-4 text-pretty text-base leading-relaxed text-zinc-500 sm:text-lg">
						{t.skillsSubtitle}
					</p>
				</header>

				<div class="space-y-14 sm:space-y-16">
					{#each skillBlocks as block}
						{@const Icon = block.icon}
						<div class="wow-in lg:grid lg:grid-cols-12 lg:gap-10" use:inview>
							<div class="mb-6 flex items-center gap-3 lg:col-span-4 lg:mb-0">
								<span
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
								>
									<Icon class="h-5 w-5" strokeWidth={2} />
								</span>
								<h3 class="font-display text-lg font-semibold text-white">{block.title}</h3>
							</div>
							<div class="flex flex-wrap gap-2 lg:col-span-8">
								{#each block.items as row}
									<span class="pill-tag text-pretty">{row}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Projects -->
		<section id="projects" class="border-t border-white/[0.06] py-20 sm:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<header class="wow-in mb-12 lg:mb-16" use:inview>
					<p class="section-label mb-4">{t.kickerWork}</p>
					<h2 class="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
						{t.projectsTitle}
					</h2>
					<p class="mt-4 max-w-2xl text-pretty text-base text-zinc-500 sm:text-lg">
						{t.projectsSubtitle}
					</p>
				</header>

				<div class="stagger-fade divide-y divide-white/[0.08]" use:inview>
					{#each proiecte as p, i}
						{@const Icon = p.icon}
						<article class="surface-hover flex gap-5 py-8 sm:gap-8 sm:py-10">
							<span
								class="font-display hidden w-12 shrink-0 text-2xl font-light text-zinc-700 sm:block sm:text-3xl"
							>
								{String(i + 1).padStart(2, '0')}
							</span>
							<div class="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
								<span
									class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-violet-200"
								>
									<Icon class="h-5 w-5" strokeWidth={2} />
								</span>
								<div class="min-w-0">
									<h3 class="font-display text-lg font-semibold text-white sm:text-xl">{p.title}</h3>
									<p class="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-500 sm:text-base">
										{p.desc}
									</p>
								</div>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<!-- Approach -->
		<section id="approach" class="border-t border-white/[0.06] py-20 sm:py-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<div class="wow-in mb-16 lg:mb-20" use:inview>
					<p class="section-label mb-4">{t.kickerApproach}</p>
					<h2 class="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
						{t.styleTitle}
					</h2>
					<p class="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
						{t.styleBody}
					</p>
				</div>

				<div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
					<article class="surface surface-hover wow-in rounded-2xl p-6 sm:p-8" use:inview>
						<div class="flex items-center gap-2 text-emerald-400">
							<Sparkles class="h-5 w-5" strokeWidth={2} />
							<span class="font-mono text-xs uppercase tracking-widest">{t.directionTitle}</span>
						</div>
						<ul class="mt-6 space-y-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
							{#each t.directionBullets as line}
								<li class="flex gap-3">
									<span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500/80"></span>
									<span>{line}</span>
								</li>
							{/each}
						</ul>
						<div
							class="mt-8 overflow-x-auto rounded-xl border border-white/[0.08] bg-zinc-950/80 p-4 font-mono text-[0.7rem] leading-relaxed text-zinc-400 sm:text-xs"
						>
							<p class="text-emerald-400/90">{t.stackComment}</p>
							{#each t.stackLines as line, j}
								<p class:mt-2={j === 0}>{line}</p>
							{/each}
						</div>
					</article>

					<article class="surface surface-hover wow-in rounded-2xl p-6 sm:p-8" use:inview>
						<div>
							<div class="flex items-center gap-2 text-violet-300">
								<BadgeCheck class="h-5 w-5" strokeWidth={2} />
								<span class="font-mono text-xs uppercase tracking-widest">{t.levelTitle}</span>
							</div>
							<p class="mt-4 text-sm font-medium text-emerald-200/90">{t.levelBand}</p>
							<p class="mt-6 text-sm font-semibold text-white">{t.strengthsTitle}</p>
							<ul class="mt-2 space-y-2 text-sm text-zinc-500">
								{#each t.strengths as line}
									<li>{line}</li>
								{/each}
							</ul>
							<p class="mt-6 text-sm font-semibold text-white">{t.growingTitle}</p>
							<ul class="mt-2 space-y-2 text-sm text-zinc-500">
								{#each t.growing as line}
									<li>{line}</li>
								{/each}
							</ul>
						</div>
					</article>
				</div>
			</div>
		</section>

		<!-- Contact -->
		<section
			id="contact"
			class="border-t border-white/[0.06] pb-[max(4rem,env(safe-area-inset-bottom))] pt-16 sm:pb-24 sm:pt-20"
		>
			<div class="mx-auto max-w-6xl px-4 sm:px-6">
				<div class="wow-in flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between" use:inview>
					<div class="max-w-xl">
						<p class="section-label mb-4">{t.kickerContact}</p>
						<h2 class="font-display text-3xl font-semibold text-white sm:text-4xl">{t.contactTitle}</h2>
						<p class="mt-4 text-pretty text-base text-zinc-500 sm:text-lg">{t.contactSubtitle}</p>
					</div>
					<div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
						<a
							href={`mailto:${site.email}`}
							class="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.98]"
						>
							{t.emailLabel}
						</a>
						{#if site.telegramUrl}
							<a
								href={site.telegramUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-white/[0.04] active:scale-[0.98]"
							>
								{t.telegramLabel}
							</a>
						{/if}
						{#if site.githubUrl}
							<a
								href={site.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-emerald-500/35 hover:bg-white/[0.04] active:scale-[0.98]"
							>
								GitHub
							</a>
						{/if}
						{#if site.linkedinUrl}
							<a
								href={site.linkedinUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-violet-400/35 hover:bg-white/[0.04] active:scale-[0.98]"
							>
								LinkedIn
							</a>
						{/if}
					</div>
				</div>
			</div>
		</section>
	</main>

	<footer
		class="border-t border-white/[0.06] px-4 py-10 text-center text-xs text-zinc-600 sm:py-12 sm:text-sm"
	>
		<p class="text-pretty">© {new Date().getFullYear()} {site.name}</p>
	</footer>
</div>
