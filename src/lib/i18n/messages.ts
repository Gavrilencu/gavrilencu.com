import type { Locale } from './locale';

export type { Locale };

type Project = { title: string; desc: string };

export type Messages = {
	metaTitle: string;
	metaDescription: string;
	tagline: string;
	nav: { href: string; label: string }[];
	heroBadge: string;
	heroIntro: string;
	ctaStack: string;
	ctaContact: string;
	skillsTitle: string;
	skillsSubtitle: string;
	langProg: string;
	backend: string;
	frontendMobile: string;
	databases: string;
	devops: string;
	networkingApi: string;
	otherTech: string;
	projectsTitle: string;
	projectsSubtitle: string;
	projects: Project[];
	styleTitle: string;
	styleBody: string;
	directionTitle: string;
	directionBullets: string[];
	stackComment: string;
	levelTitle: string;
	levelBand: string;
	strengthsTitle: string;
	strengths: string[];
	growingTitle: string;
	growing: string[];
	stackLines: string[];
	contactTitle: string;
	contactSubtitle: string;
	emailLabel: string;
	footerNote: string;
	footerBuilt: string;
	limbi: string[];
	backendList: string[];
	frontendList: string[];
	dbList: string[];
	devopsList: string[];
	networkingList: string[];
	alteleList: string[];
};

const en: Messages = {
	metaTitle: 'Gavrilencu Grigore — Software Engineer',
	metaDescription:
		'Gavrilencu Grigore — software engineer. SvelteKit, backend, databases, DevOps, and integrations.',
	tagline: 'Software Engineer',
	nav: [
		{ href: '#about', label: 'About' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#approach', label: 'Approach & goals' },
		{ href: '#contact', label: 'Contact' }
	],
	heroBadge: 'Open to projects',
	heroIntro:
		'I build real applications, integrations, and automation — from SvelteKit and APIs to enterprise databases and Linux/Docker infrastructure. I prefer solutions that are simple, efficient, and easy to control.',
	ctaStack: 'View stack',
	ctaContact: 'Contact',
	skillsTitle: 'Technical skills',
	skillsSubtitle: 'Languages, frameworks, and operations — what I use day to day.',
	langProg: 'Programming languages',
	backend: 'Backend',
	frontendMobile: 'Frontend & mobile',
	databases: 'Databases',
	devops: 'DevOps & systems',
	networkingApi: 'Networking & API',
	otherTech: 'Other technologies',
	projectsTitle: 'Projects & experience',
	projectsSubtitle:
		'A selection of hands-on work: from chatbots and LDAP to mobile apps and automated deploys.',
	projects: [
		{ title: 'Memory chatbot', desc: 'SQLite, learning from user input.' },
		{ title: 'API testing tool', desc: 'UI + performance statistics.' },
		{ title: 'SvelteKit web apps', desc: 'Modern, fast web products.' },
		{ title: 'Mobile applications', desc: 'React Native / Capacitor.' },
		{ title: 'LDAP integration', desc: 'User search and org structures.' },
		{ title: 'Bluetooth utility', desc: 'Device scanning + file transfer.' },
		{ title: 'Automated deployment', desc: 'Bash scripts + Docker.' },
		{ title: 'Real estate platform', desc: 'DB + base64 images + UI.' },
		{ title: 'Automation & testing', desc: 'Scripts and utilities.' }
	],
	styleTitle: 'How I work',
	styleBody:
		'I prefer simple, efficient, controllable solutions. I avoid unnecessary complexity and excessive framework “magic”. I focus on fast results, automation, and optimization — and I like building my own tools when nothing off-the-shelf fits.',
	directionTitle: 'Direction & goals',
	directionBullets: [
		'• Real applications with many users',
		'• Scalable digital products',
		'• Complex systems (CRM, platforms, services)'
	],
	stackComment: '// preferred stack',
	levelTitle: 'Professional level',
	levelBand: 'Junior → Mid',
	strengthsTitle: 'Strengths',
	strengths: [
		'• Backend & business logic',
		'• Databases (including enterprise Oracle)',
		'• System integration',
		'• Automation'
	],
	growingTitle: 'Growing in',
	growing: [
		'• Scaling & distributed architectures',
		'• Advanced cloud & DevOps',
		'• Advanced UI/UX'
	],
	stackLines: [
		'FE: SvelteKit',
		'Mobile: RN / Capacitor',
		'BE: FastAPI / Node / Go',
		'DB: PostgreSQL / Oracle',
		'Infra: Linux + Docker'
	],
	contactTitle: "Let's build something solid.",
	contactSubtitle: 'For collaborations, freelance, or technical discussions — get in touch.',
	emailLabel: 'Email',
	footerNote: 'Update src/lib/site.ts with your email and social links.',
	footerBuilt: 'Built with SvelteKit, Tailwind & Three.js.',
	limbi: [
		'Python — scripting, automation, backend, data processing',
		'JavaScript / TypeScript — frontend & backend (Node.js)',
		'Go (Golang) — high-performance backend services',
		'SQL — queries, modelling, data manipulation',
		'HTML & CSS — responsive, modern UI',
		'Bash — automation and server tasks'
	],
	backendList: [
		'Node.js (Express)',
		'REST APIs',
		'Python (scripts & services)',
		'Go — microservices / performant services'
	],
	frontendList: [
		'SvelteKit',
		'React Native',
		'Capacitor (web → mobile)',
		'Responsive UI & optimized UX'
	],
	dbList: [
		'SQLite (applications)',
		'PostgreSQL — admin, users, permissions',
		'Oracle — enterprise',
		'JSON & query optimization'
	],
	devopsList: [
		'Linux — server & shell',
		'Nginx — reverse proxy',
		'Docker',
		'Domains & SSL',
		'Manual deploy & automation scripts'
	],
	networkingList: [
		'Endpoint testing & analysis',
		'Performance measurement (response time, load)',
		'Custom benchmarking tools'
	],
	alteleList: [
		'LDAP — integration & scripting',
		'Bluetooth — scanning, file transfer',
		'External APIs (e.g. products, barcode)',
		'Interest in AI / ML & content generation'
	]
};

const ru: Messages = {
	metaTitle: 'Gavrilencu Grigore — инженер-программист',
	metaDescription:
		'Gavrilencu Grigore — инженер-программист. SvelteKit, бэкенд, базы данных, DevOps и интеграции.',
	tagline: 'Инженер-программист',
	nav: [
		{ href: '#about', label: 'Обо мне' },
		{ href: '#skills', label: 'Навыки' },
		{ href: '#projects', label: 'Проекты' },
		{ href: '#approach', label: 'Подход и цели' },
		{ href: '#contact', label: 'Контакты' }
	],
	heroBadge: 'Открыт к проектам',
	heroIntro:
		'Создаю реальные приложения, интеграции и автоматизацию — от SvelteKit и API до корпоративных БД и инфраструктуры Linux/Docker. Предпочитаю простые, эффективные и управляемые решения.',
	ctaStack: 'Смотреть стек',
	ctaContact: 'Связаться',
	skillsTitle: 'Технические навыки',
	skillsSubtitle: 'Языки, фреймворки и эксплуатация — чем пользуюсь каждый день.',
	langProg: 'Языки программирования',
	backend: 'Бэкенд',
	frontendMobile: 'Фронтенд и мобильная разработка',
	databases: 'Базы данных',
	devops: 'DevOps и системы',
	networkingApi: 'Сеть и API',
	otherTech: 'Другие технологии',
	projectsTitle: 'Проекты и опыт',
	projectsSubtitle:
		'Выбор практических задач: от чат-ботов и LDAP до мобильных приложений и автоматического деплоя.',
	projects: [
		{ title: 'Чат-бот с памятью', desc: 'SQLite, обучение на вводе пользователя.' },
		{ title: 'Инструмент тестирования API', desc: 'UI + статистика производительности.' },
		{ title: 'Веб-приложения на SvelteKit', desc: 'Современные и быстрые веб-продукты.' },
		{ title: 'Мобильные приложения', desc: 'React Native / Capacitor.' },
		{ title: 'Интеграция LDAP', desc: 'Поиск пользователей и оргструктуры.' },
		{ title: 'Утилита Bluetooth', desc: 'Сканирование устройств + передача файлов.' },
		{ title: 'Автоматизированный деплой', desc: 'Скрипты Bash + Docker.' },
		{ title: 'Платформа недвижимости', desc: 'БД + изображения base64 + UI.' },
		{ title: 'Автоматизация и тестирование', desc: 'Скрипты и утилиты.' }
	],
	styleTitle: 'Стиль работы',
	styleBody:
		'Предпочитаю простые, эффективные и контролируемые решения. Избегаю лишней сложности и чрезмерной «магии» фреймворков. Ориентируюсь на быстрый результат, автоматизацию и оптимизацию — и при необходимости пишу собственные инструменты.',
	directionTitle: 'Направление и цели',
	directionBullets: [
		'• Реальные приложения с большим числом пользователей',
		'• Масштабируемые цифровые продукты',
		'• Сложные системы (CRM, платформы, сервисы)'
	],
	stackComment: '// предпочитаемый стек',
	levelTitle: 'Профессиональный уровень',
	levelBand: 'Junior → Mid',
	strengthsTitle: 'Сильные стороны',
	strengths: [
		'• Бэкенд и бизнес-логика',
		'• Базы данных (включая корпоративный Oracle)',
		'• Интеграция систем',
		'• Автоматизация'
	],
	growingTitle: 'Развиваюсь в',
	growing: [
		'• Масштабирование и распределённые архитектуры',
		'• Продвинутый cloud и DevOps',
		'• Продвинутый UI/UX'
	],
	stackLines: [
		'FE: SvelteKit',
		'Mobile: RN / Capacitor',
		'BE: FastAPI / Node / Go',
		'DB: PostgreSQL / Oracle',
		'Infra: Linux + Docker'
	],
	contactTitle: 'Давайте сделаем что-то надёжное.',
	contactSubtitle: 'Сотрудничество, фриланс или технические вопросы — напишите.',
	emailLabel: 'Почта',
	footerNote: 'Обновите src/lib/site.ts: email и ссылки на соцсети.',
	footerBuilt: 'Сделано на SvelteKit, Tailwind и Three.js.',
	limbi: [
		'Python — скрипты, автоматизация, бэкенд, обработка данных',
		'JavaScript / TypeScript — фронтенд и бэкенд (Node.js)',
		'Go (Golang) — высокопроизводительные сервисы',
		'SQL — запросы, моделирование, работа с данными',
		'HTML & CSS — адаптивный современный UI',
		'Bash — автоматизация и задачи на сервере'
	],
	backendList: [
		'Node.js (Express)',
		'REST API',
		'Python (скрипты и сервисы)',
		'Go — микросервисы / производительные сервисы'
	],
	frontendList: [
		'SvelteKit',
		'React Native',
		'Capacitor (web → mobile)',
		'Адаптивный UI и UX'
	],
	dbList: [
		'SQLite (приложения)',
		'PostgreSQL — админ., пользователи, права',
		'Oracle — enterprise',
		'JSON и оптимизация запросов'
	],
	devopsList: [
		'Linux — сервер и терминал',
		'Nginx — обратный прокси',
		'Docker',
		'Домены и SSL',
		'Ручной деплой и скрипты автоматизации'
	],
	networkingList: [
		'Тестирование и анализ эндпоинтов',
		'Измерение производительности (время ответа, нагрузка)',
		'Собственные инструменты для бенчмарков'
	],
	alteleList: [
		'LDAP — интеграция и скрипты',
		'Bluetooth — сканирование, передача файлов',
		'Внешние API (например товары, штрихкоды)',
		'Интерес к AI / ML и генерации контента'
	]
};

export const messages: Record<Locale, Messages> = { en, ru };

export function getMessages(locale: Locale): Messages {
	return messages[locale] ?? messages.en;
}
