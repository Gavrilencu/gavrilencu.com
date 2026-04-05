<script lang="ts">
	import { page } from '$app/state';
	import type { Locale } from '$lib/i18n/locale';

	interface Props {
		/** Pe mobil: butoane mai mari pentru touch */
		variant?: 'default' | 'mobile';
	}

	let { variant = 'default' }: Props = $props();

	const locale = $derived((page.data.locale ?? 'en') as Locale);
	const path = $derived(page.url.pathname);

	const options: { code: Locale; label: string }[] = [
		{ code: 'en', label: 'EN' },
		{ code: 'ru', label: 'RU' }
	];

	const isMobile = $derived(variant === 'mobile');
</script>

<div
	class="flex shrink-0 items-center rounded-xl border border-white/12 bg-slate-900/50 font-bold tracking-wide backdrop-blur-sm {isMobile
		? 'gap-0.5 p-1 text-sm'
		: 'rounded-lg p-0.5 text-xs'}"
	role="group"
	aria-label="Language"
>
	{#each options as opt}
		<a
			href="{path}?lang={opt.code}"
			data-sveltekit-reload
			class="rounded-lg text-center transition {isMobile
				? 'min-h-11 min-w-[3rem] px-3 py-2.5'
				: 'px-3 py-2 sm:px-2.5 sm:py-1.5'} {locale === opt.code
				? 'bg-blue-500/25 text-blue-50 shadow-sm shadow-blue-500/10'
				: 'text-slate-500 hover:bg-white/5 hover:text-slate-100'}"
			aria-current={locale === opt.code ? 'true' : undefined}
		>
			{opt.label}
		</a>
	{/each}
</div>
