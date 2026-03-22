<script lang="ts">
	import { browser } from '$app/environment';
	import LangSwitch from '$lib/components/LangSwitch.svelte';
	import { site } from '$lib/site';
	import { Menu, Sparkles, X } from 'lucide-svelte';

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
	class="sticky top-0 z-[100] border-b border-white/5 bg-slate-950/85 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/70"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pb-3 sm:px-6 md:pb-3.5">
		<a
			href="/"
			class="group flex min-h-11 min-w-0 shrink-0 items-center gap-2.5 rounded-xl font-semibold tracking-tight ring-cyan-400/0 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
			onclick={close}
		>
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/25 ring-1 ring-white/10 transition group-hover:ring-cyan-400/40 sm:h-9 sm:w-9"
			>
				<Sparkles class="h-[1.125rem] w-[1.125rem] text-cyan-300 sm:h-4 sm:w-4" strokeWidth={2} />
			</span>
			<span class="min-w-0 truncate sm:max-w-none">
				<span class="text-sm text-white sm:text-base">{site.name.split(' ')[0]}</span>
			</span>
		</a>

		<!-- Desktop -->
		<div class="hidden items-center gap-4 md:flex">
			<nav class="flex items-center gap-1 text-sm" aria-label="Main">
				{#each nav as item}
					<a
						href={item.href}
						class="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/5 hover:text-cyan-200"
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<LangSwitch />
		</div>

		<!-- Mobile: limbă + meniu -->
		<div class="flex shrink-0 items-center gap-2 md:hidden">
			<LangSwitch variant="mobile" />
			<button
				type="button"
				class="touch-manipulation rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
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
			class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
			aria-label={a11yCloseOverlay}
			onclick={close}
		></button>
		<nav
			id="site-mobile-nav"
			class="absolute right-0 top-0 flex h-full w-[min(100vw-3rem,19rem)] flex-col border-l border-white/10 bg-slate-950/98 px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5.5rem,calc(env(safe-area-inset-top)+4rem))] shadow-[-12px_0_40px_rgba(0,0,0,0.45)]"
		>
			<ul class="flex flex-col gap-1">
				{#each nav as item}
					<li>
						<a
							href={item.href}
							class="block rounded-xl px-4 py-3.5 text-base font-medium leading-snug text-slate-200 transition hover:bg-white/8 hover:text-white active:bg-white/10"
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
