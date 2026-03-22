import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getLocale } from '$lib/i18n/server';

const LANG_COOKIE = 'lang';

const cookieOpts = {
	path: '/',
	maxAge: 60 * 60 * 24 * 365,
	sameSite: 'lax' as const,
	httpOnly: false
};

export const load: LayoutServerLoad = ({ cookies, url, request }) => {
	const qp = url.searchParams.get('lang');
	if (qp === 'en' || qp === 'ru') {
		cookies.set(LANG_COOKIE, qp, cookieOpts);
		throw redirect(303, url.pathname);
	}

	return {
		locale: getLocale(url, cookies, request)
	};
};
