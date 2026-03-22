<script lang="ts">
	import { page } from '$app/state';
	import type { Locale } from '$lib/i18n/locale';

	const locale = $derived((page.data.locale ?? 'en') as Locale);
	const path = $derived(page.url.pathname);

	const options: { code: Locale; label: string }[] = [
		{ code: 'en', label: 'EN' },
		{ code: 'ru', label: 'RU' }
	];
</script>

<div
	class="flex shrink-0 items-center rounded-lg border border-white/10 bg-white/[0.04] p-0.5 text-[11px] font-bold tracking-wide sm:text-xs"
	role="group"
	aria-label="Language"
>
	{#each options as opt}
		<a
			href="{path}?lang={opt.code}"
			data-sveltekit-reload
			class="rounded-md px-2 py-1.5 transition sm:px-2.5 {locale === opt.code
				? 'bg-cyan-500/25 text-cyan-100 shadow-sm shadow-cyan-500/10'
				: 'text-slate-500 hover:bg-white/5 hover:text-slate-200'}"
			aria-current={locale === opt.code ? 'true' : undefined}
		>
			{opt.label}
		</a>
	{/each}
</div>
