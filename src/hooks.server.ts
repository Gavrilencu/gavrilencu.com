import type { Handle } from '@sveltejs/kit';
import { getLocale } from '$lib/i18n/server';

export const handle: Handle = async ({ event, resolve }) => {
	const locale = getLocale(event.url, event.cookies, event.request);
	event.locals.locale = locale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replaceAll('%lang%', locale)
	});
};
