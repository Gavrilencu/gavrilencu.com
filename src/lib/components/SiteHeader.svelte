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
	class="sticky top-0 z-[100] border-b border-white/[0.06] bg-zinc-950/75 pt-[max(0.5rem,env(safe-area-inset-top))] shadow-sm shadow-black/20 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-zinc-950/60"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pb-3 sm:px-6 md:pb-3.5">
		<a
			href="/"
			class="group flex min-h-11 min-w-0 shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
			onclick={close}
		>
			<span
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 font-mono text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/25 transition group-hover:bg-emerald-500/25 sm:h-10 sm:w-10 sm:text-sm"
			>
				{initials}
			</span>
			<span class="min-w-0 truncate font-medium text-white sm:max-w-none">{site.name.split(' ')[0]}</span>
		</a>

		<div class="hidden items-center gap-6 md:flex">
			<nav class="flex items-center gap-1 text-sm" aria-label="Main">
				{#each nav as item}
					<a
						href={item.href}
						class="nav-pill relative rounded-lg px-3 py-2 font-medium text-zinc-500 transition-colors duration-200 hover:text-white"
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
				class="touch-manipulation rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-zinc-200 transition hover:border-emerald-500/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
				aria-expanded={open}
				aria-controls="site-mobile-nav"
				aria-label={open ? a11yCloseMenu : a11yOpenMenu}
				onclick={toggle}
			>
				{#if open}
					<X class="h-6 w-6" strokeWidth={2} />
				{:else}
					<Menu class="h-6 w-6" strokeWidth={2} />
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
			class="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
			aria-label={a11yCloseOverlay}
			onclick={close}
		></button>
		<nav
			id="site-mobile-nav"
			class="absolute right-0 top-0 flex h-full w-[min(100vw-3rem,19rem)] flex-col border-l border-white/[0.08] bg-zinc-950 px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5.5rem,calc(env(safe-area-inset-top)+4rem))]"
		>
			<ul class="flex flex-col gap-0.5">
				{#each nav as item}
					<li>
						<a
							href={item.href}
							class="block rounded-lg px-4 py-3.5 text-base font-medium text-zinc-200 transition hover:bg-white/[0.05] hover:text-white active:bg-white/10"
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
			bottom: 4px;
			width: 0;
			height: 2px;
			border-radius: 2px;
			background: linear-gradient(90deg, #34d399, #a78bfa);
			transform: translateX(-50%);
			transition: width 0.25s ease;
		}
		.nav-pill:hover::after {
			width: 60%;
		}
	}
</style>
