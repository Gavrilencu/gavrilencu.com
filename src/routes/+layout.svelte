<script lang="ts">
	import './layout.css';
	import faviconEn from '$lib/assets/favicon-en.svg';
	import faviconRu from '$lib/assets/favicon-ru.svg';
	import { page } from '$app/state';
	import type { Locale } from '$lib/i18n/locale';
	import { getMessages } from '$lib/i18n/messages';

	let { children } = $props();

	const locale = $derived((page.data.locale ?? 'en') as Locale);
	const t = $derived(getMessages(locale));
	const favicon = $derived(locale === 'ru' ? faviconRu : faviconEn);
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<title>{t.metaTitle}</title>
	<meta name="description" content={t.metaDescription} />
</svelte:head>
{@render children()}
