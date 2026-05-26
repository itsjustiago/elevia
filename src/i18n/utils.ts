import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, base, maybeLocale] = url.pathname.split('/');
  // Astro normalizes URL.pathname (strips the base path), so seg is the first segment
  const seg = base;
  if (seg && seg in ui) return seg as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalePath(lang: Lang, path: string): string {
  const clean = path.replace(/^\//, '');
  if (lang === defaultLang) return `/${clean}`;
  return `/${lang}/${clean}`;
}

export function switchLangPath(currentUrl: URL, targetLang: Lang): string {
  const parts = currentUrl.pathname.split('/').filter(Boolean);
  const langStripped = parts[0] && parts[0] in ui ? parts.slice(1) : parts;
  const rest = langStripped.join('/');
  if (targetLang === defaultLang) return `/${rest}`;
  return `/${targetLang}/${rest}`;
}
