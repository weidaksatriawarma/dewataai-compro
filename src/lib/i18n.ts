/**
 * Dewata AI i18n helpers (Indonesian-first, English secondary).
 * `id` is the default locale and lives at `/`; `en` lives at `/en/`.
 *
 * Slugs differ per locale (Indonesian reads better for Indonesian search), so
 * ROUTES is the single source of truth: navigation, canonical URLs, hreflang
 * tags and the language switcher all resolve through it.
 */

export const LOCALES = ["id", "en"] as const
export type Lang = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Lang = "id"

/** Narrow Astro.currentLocale (string | undefined) down to a supported Lang. */
export function resolveLang(input?: string | null): Lang {
  return input === "en" ? "en" : "id"
}

export const ROUTES = {
  home: { id: "/", en: "/en/" },
  ventures: { id: "/usaha/", en: "/en/ventures/" },
  about: { id: "/tentang/", en: "/en/about/" },
  manifesto: { id: "/manifesto/", en: "/en/manifesto/" },
  journal: { id: "/jurnal/", en: "/en/journal/" },
  press: { id: "/pers/", en: "/en/press/" },
  vision: { id: "/visi/", en: "/en/vision/" },
  safety: { id: "/keselamatan/", en: "/en/safety/" },
  investor: { id: "/investor/", en: "/en/investor/" },
  thesis: { id: "/tesis/", en: "/en/thesis/" },
  horizon: { id: "/horizon/", en: "/en/horizon/" },
  contact: { id: "/kontak/", en: "/en/contact/" },
  privacy: { id: "/privasi/", en: "/en/privacy/" },
} as const

export type RouteKey = keyof typeof ROUTES

/** Path for a named route in a given locale. */
export function path(key: RouteKey, lang: Lang): string {
  return ROUTES[key][lang]
}

/** Detail page under a section, e.g. detailPath("ventures", "en", "dewata-tech"). */
export function detailPath(key: RouteKey, lang: Lang, slug: string): string {
  return `${ROUTES[key][lang]}${slug}/`
}

/** Home URL for a given locale. */
export function localeHref(lang: Lang): string {
  return ROUTES.home[lang]
}

/** The locale a user would switch to from the current one. */
export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "id" : "en"
}

/** Global UI chrome strings (nav, menu, skip link, theme + language toggles). */
const ui = {
  id: {
    skipToContent: "Lewati ke konten",
    homeAria: "Beranda Dewata AI",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    themeToggle: "Ganti mode terang/gelap",
    langSwitch: "Ganti bahasa",
    langLabel: "ID",
    langName: "Bahasa Indonesia",
    marqueeAria: "Kapabilitas Dewata AI",
    backTo: "Kembali ke",
    openSubmenu: "Buka submenu",
    dataTable: "Lihat angkanya",
    readMore: "Baca",
    empty: "Belum ada yang diterbitkan. Cek lagi nanti.",
  },
  en: {
    skipToContent: "Skip to content",
    homeAria: "Dewata AI home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    themeToggle: "Toggle light/dark mode",
    langSwitch: "Switch language",
    langLabel: "EN",
    langName: "English",
    marqueeAria: "Dewata AI capabilities",
    backTo: "Back to",
    openSubmenu: "Open submenu",
    dataTable: "Show the numbers",
    readMore: "Read",
    empty: "Nothing published yet. Check back soon.",
  },
} as const

export function getUI(lang: Lang) {
  return ui[lang] ?? ui.id
}
export type UI = (typeof ui)["id"]
