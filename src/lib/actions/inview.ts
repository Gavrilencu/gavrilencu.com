import type { Action } from 'svelte/action';

type Opts = { rootMargin?: string; threshold?: number };

/** Adaugă clasa `wow-visible` când elementul intră în viewport. Respectă prefers-reduced-motion. */
export const inview: Action<HTMLElement, Opts | undefined> = (node, params) => {
	const rootMargin = params?.rootMargin ?? '0px 0px -10% 0px';
	const threshold = params?.threshold ?? 0.08;

	if (typeof window === 'undefined') {
		node.classList.add('wow-visible');
		return;
	}

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.classList.add('wow-visible');
		return;
	}

	node.classList.add('wow-in');
	const io = new IntersectionObserver(
		(entries) => {
			const e = entries[0];
			if (e?.isIntersecting) {
				node.classList.add('wow-visible');
				io.disconnect();
			}
		},
		{ rootMargin, threshold }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
};
