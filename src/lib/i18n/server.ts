import type { Cookies } from '@sveltejs/kit';
import { resolveLocale, type Locale } from './locale';

/** Prioritate: ?lang= → cookie → Accept-Language (ro/mo → ru). */
export function getLocale(url: URL, cookies: Cookies, request: Request): Locale {
	const qp = url.searchParams.get('lang');
	if (qp === 'en' || qp === 'ru') return qp;

	const c = cookies.get('lang');
	if (c === 'en' || c === 'ru') return c;

	return resolveLocale(request.headers.get('accept-language'));
}
