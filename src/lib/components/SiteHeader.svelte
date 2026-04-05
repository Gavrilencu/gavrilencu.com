<script lang="ts">
	import { browser } from '$app/environment';
	import LangSwitch from '$lib/components/LangSwitch.svelte';
	import { site } from '$lib/site';
	import { Menu, X } from 'lucide-svelte';

	interface NavItem {
		href: string;
		label: string;
	}

	interface Props {
		nav: NavItem[];
		a11yOpenMenu: string;
		a11yCloseMenu: string;
		a11yCloseOverlay: string;
		mobileNavAriaLabel: string;
	}

	let { nav, a11yOpenMenu, a11yCloseMenu, a11yCloseOverlay, mobileNavAriaLabel }: Props = $props();

	let open = $state(false);

	const initials = $derived(
		site.name
			.split(/\s+/)
			.filter(Boolean)
			.map((w) => w[0])
			.join('')
			.slice(0, 2)
			.toUpperCase() || 'G'
	);

	function close() {
		open = false;
	}

	function toggle() {
		open = !open;
	}

	$effect(() => {
		if (!browser) return;
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && close()} />

<header
	class="sticky top-0 z-[100] border-b border-white/[0.08] bg-slate-950/80 pt-[max(0.5rem,env(safe-area-inset-top))] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-slate-950/65"
>
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/35 to-transparent"
		aria-hidden="true"
	></div>
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 pb-3.5 sm:px-6 md:pb-4">
		<a
			href="/"
			class="group flex min-h-11 min-w-0 shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
			onclick={close}
		>
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-indigo-600/25 font-mono text-xs font-bold text-blue-100 ring-1 ring-blue-400/30 transition group-hover:ring-amber-400/35 sm:text-sm"
			>
				{initials}
			</span>
			<span class="min-w-0 truncate font-semibold text-white sm:max-w-none">{site.name.split(' ')[0]}</span>
		</a>

		<div class="hidden items-center gap-7 md:flex">
			<nav class="flex items-center gap-0.5 text-sm font-medium" aria-label="Main">
				{#each nav as item}
					<a
						href={item.href}
						class="nav-pill relative rounded-lg px-3.5 py-2.5 text-slate-400 transition-colors duration-200 hover:text-white"
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<LangSwitch />
		</div>

		<div class="flex shrink-0 items-center gap-2 md:hidden">
			<LangSwitch variant="mobile" />
			<button
				type="button"
				class="touch-manipulation min-h-11 min-w-11 rounded-xl border border-white/12 bg-slate-900/60 p-2.5 text-slate-100 shadow-md backdrop-blur-sm transition hover:border-blue-500/35 hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
				aria-expanded={open}
				aria-controls="site-mobile-nav"
				aria-label={open ? a11yCloseMenu : a11yOpenMenu}
				onclick={toggle}
			>
				{#if open}
					<X class="mx-auto h-6 w-6" strokeWidth={2} />
				{:else}
					<Menu class="mx-auto h-6 w-6" strokeWidth={2} />
				{/if}
			</button>
		</div>
	</div>
</header>

{#if open}
	<div
		class="fixed inset-0 z-[90] md:hidden"
		role="dialog"
		aria-modal="true"
		aria-label={mobileNavAriaLabel}
	>
		<button
			type="button"
			class="absolute inset-0 bg-slate-950/92 backdrop-blur-md"
			aria-label={a11yCloseOverlay}
			onclick={close}
		></button>
		<nav
			id="site-mobile-nav"
			class="absolute right-0 top-0 flex h-full w-[min(100vw-2.5rem,20rem)] flex-col border-l border-white/10 bg-slate-950/98 px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5.5rem,calc(env(safe-area-inset-top)+4rem))] shadow-[-20px_0_60px_rgba(0,0,0,0.45)]"
		>
			<ul class="flex flex-col gap-1">
				{#each nav as item}
					<li>
						<a
							href={item.href}
							class="block min-h-12 rounded-xl px-4 py-3.5 text-base font-semibold text-slate-200 transition hover:bg-blue-500/10 hover:text-white active:bg-white/5"
							onclick={close}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
{/if}

<style>
	@media (hover: hover) and (pointer: fine) {
		.nav-pill::after {
			content: '';
			position: absolute;
			left: 50%;
			bottom: 5px;
			width: 0;
			height: 2px;
			border-radius: 2px;
			background: linear-gradient(90deg, #60a5fa, #fbbf24);
			transform: translateX(-50%);
			transition: width 0.28s cubic-bezier(0.22, 1, 0.36, 1);
		}
		.nav-pill:hover::after {
			width: 65%;
		}
	}
</style>
