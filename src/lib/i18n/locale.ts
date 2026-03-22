export type Locale = 'en' | 'ru';

/**
 * ro → ru (per product requirement), ru → ru, en → en; otherwise defaults to en.
 */
export function resolveLocale(acceptLanguage: string | null): Locale {
	if (!acceptLanguage || !acceptLanguage.trim()) return 'en';

	const segments = acceptLanguage.split(',');
	for (const segment of segments) {
		const tag = segment.trim().split(';')[0]?.toLowerCase();
		if (!tag) continue;
		const base = tag.split('-')[0];
		if (!base) continue;

		if (base === 'ro') return 'ru';
		if (base === 'ru') return 'ru';
		if (base === 'en') return 'en';
	}

	return 'en';
}
