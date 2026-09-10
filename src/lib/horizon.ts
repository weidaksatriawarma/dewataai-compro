/**
 * The forty-year comparison (`/horizon`).
 *
 * Ten ways to put money to work in Indonesia, on one axis, for forty years,
 * preceded by twenty years that actually happened.
 *
 * Four rules govern this file, and they are the reason anyone would believe it.
 *
 * 1. NUMBERS LIVE HERE ONCE, so the Indonesian and English pages can never
 *    quote different figures. Only labels are translated.
 * 2. EVERY FORWARD RATE IS ANCHORED TO A PUBLISHED FIGURE. The anchors are in
 *    SOURCES below with their institution and a link, and the page prints them
 *    in a table. Where an asset class has no official series, the file says so
 *    in the open rather than inventing precision.
 * 3. AN ANCHOR IS NOT A FORECAST. Every rate here is a decayed forward
 *    assumption we chose; the anchor only fixes the order of magnitude it
 *    starts from. Nothing on the page is a measurement of our own results.
 * 4. MEASURED AND MODELLED NEVER SHARE A PANEL. The HISTORY block below is
 *    real year-end closes, and its figure is stamped DATA. Everything derived
 *    from RATES is stamped MODEL. A reader must never have to work out which
 *    of the two they are looking at.
 *
 * The shape of the argument matters more than any single rate. Raw, the
 * software curve is the steepest. Weighted by the odds of still owning a
 * working version of the thing in forty years, Bitcoin passes it, two stock
 * indices that ask for no work at all come third and fourth, and a cafe
 * collapses to roughly the money you put in. We publish the second chart
 * because it is the one that would change a reader's mind, and a comparison
 * that shows only the flattering half is an advertisement.
 */

import type { Lang } from "@/lib/i18n"

/* ============================== the anchors ============================== */

/**
 * Published figures the forward rates are calibrated against. `value` is the
 * headline number and `unit` says how to render it; the sentence explaining
 * each one is translated in the content block, so the number itself still
 * exists in exactly one place.
 */
export const SOURCES = [
  {
    id: "rppi",
    org: "Bank Indonesia · BPS",
    value: 3.57,
    unit: "percent",
    url: "https://www.tradingeconomics.com/indonesia/house-price-index-yoy",
  },
  {
    id: "rppiLow",
    org: "Bank Indonesia",
    value: 0.83,
    unit: "percent",
    url: "https://www.bi.go.id/en/publikasi/ruang-media/news-release/Pages/sp_2726625.aspx",
  },
  {
    id: "inflation",
    org: "Bank Indonesia · BPS",
    value: 1.91,
    unit: "percent",
    url: "https://tradingeconomics.com/indonesia/inflation-cpi",
  },
  {
    id: "baliCollapse",
    org: "BPS Provinsi Bali",
    value: -82.96,
    unit: "percent",
    url: "https://bali.bps.go.id/en/statistics-table/1/MTkzIzE=/number-of-foreign-visitors-arriving-directly-by-nationality-to-bali-2019-2024.html",
  },
  {
    id: "baliOccupancy",
    org: "BPS",
    value: 67.29,
    unit: "percent",
    url: "https://www.bps.go.id/en/statistics-table/2/MTIyIzI=/tingkat-penghunian-kamar-pada-hotelbintang.html",
  },
  {
    id: "restoSurvival",
    org: "US Bureau of Labor Statistics",
    value: 51,
    unit: "percent",
    url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm",
  },
  {
    id: "restoMargin",
    org: "Datassential",
    value: 5,
    unit: "percent",
    url: "https://datassential.com/resource/restaurant-failure-rate/",
  },
  {
    id: "coalPeak",
    org: "IEA",
    value: 425,
    unit: "usd",
    url: "https://www.iea.org/reports/coal-market-update-july-2022/prices",
  },
  {
    id: "coalFall",
    org: "IEA · Trading Economics",
    value: -65,
    unit: "percent",
    url: "https://tradingeconomics.com/commodity/coal",
  },
  {
    id: "btcReturn",
    org: "PortfoliosLab",
    value: 58,
    unit: "percent",
    url: "https://portfolioslab.com/symbol/BTC-USD",
  },
  {
    id: "btcDrawdown",
    org: "PortfoliosLab",
    value: -85.3,
    unit: "percent",
    url: "https://portfolioslab.com/symbol/BTC-USD",
  },
  {
    id: "dcCagr",
    org: "Arizton",
    value: 13.7,
    unit: "percent",
    url: "https://www.arizton.com/market-reports/indonesia-data-center-market-analysis-2025",
  },
  {
    id: "dcLoad",
    org: "Mordor Intelligence",
    value: 19.9,
    unit: "percent",
    url: "https://www.mordorintelligence.com/industry-reports/indonesia-hyperscale-data-center-market",
  },
  {
    id: "blsInfo",
    org: "US Bureau of Labor Statistics",
    value: 46.8,
    unit: "percent",
    url: "https://www.bls.gov/bdm/us_age_naics_51_table7.txt",
  },
  {
    id: "bls10",
    org: "US Bureau of Labor Statistics",
    value: 34.7,
    unit: "percent",
    url: "https://www.bls.gov/bdm/entrepreneurship/entrepreneurship.htm",
  },
  {
    id: "ihsg20",
    org: "IDX · Trading Economics",
    value: 10.55,
    unit: "percent",
    url: "https://tradingeconomics.com/indonesia/stock-market",
  },
  {
    id: "ihsgDrawdown",
    org: "IDX · Trading Economics",
    value: -60.7,
    unit: "percent",
    url: "https://tradingeconomics.com/indonesia/stock-market",
  },
  {
    id: "sp50020",
    org: "S&P Dow Jones Indices",
    value: 8.88,
    unit: "percent",
    url: "https://www.spglobal.com/spdji/en/indices/equity/sp-500/",
  },
  {
    id: "gold20",
    org: "World Gold Council",
    value: 11.2,
    unit: "percent",
    url: "https://www.gold.org/goldhub/data/gold-prices",
  },
  {
    id: "goldDrawdown",
    org: "World Gold Council",
    value: -44.4,
    unit: "percent",
    url: "https://www.gold.org/goldhub/data/gold-prices",
  },
  {
    id: "idrUsd20",
    org: "Bank Indonesia · JISDOR",
    value: 2.7,
    unit: "percent",
    url: "https://www.bi.go.id/en/statistik/informasi-kurs/jisdor/default.aspx",
  },
] as const

export type SourceId = (typeof SOURCES)[number]["id"]

/* ============================ shared constants ============================ */

export const HORIZON = 40
export const BASE_INDEX = 100

/**
 * Fixed paint order, most-arguable first. Software leads because it is the
 * subject of the page, not because it wins. The three paper assets sit
 * together behind Bitcoin because they are the same kind of thing: bought from
 * a phone, held without staff, and impossible to work on.
 */
export const ASSETS = [
  "software",
  "bitcoin",
  "stocks",
  "sp500",
  "gold",
  "datacenter",
  "cafe",
  "mining",
  "hotel",
  "land",
] as const
export type AssetKey = (typeof ASSETS)[number]

/**
 * Identity per asset, fixed for the life of the page.
 *
 * Ten series will not fit in ten greys. Only three steps stay reliably tellable
 * apart under colour vision deficiency and in print, so identity is a pair: a
 * step plus a stroke style. Four styles across three steps gives twelve
 * distinct combinations for ten assets, and no grey band carries more than
 * four lines. Because the pair belongs to the asset and never to its rank,
 * hiding a line never repaints the others.
 *
 * All ten can be drawn at once, and the overlay chart opens that way. Ten lines
 * is a busy plot, which is why the stroke styles, the name at the end of each
 * line, the readout under the pointer and the table exist; the Software only
 * button is the calmer way back to a single curve.
 *
 * One constraint comes from the other direction. The measured figure in section
 * 02 draws only three of these ten, so those three have to be separable on
 * stroke alone, without the grey step doing any work. That is why gold is
 * dotted and land carries the dash-dot: on that figure the Indonesian index,
 * the American one and gold then read as three different lines even in
 * greyscale print.
 */
export type Stroke = "solid" | "dashed" | "dotted" | "dashdot"
export const SERIES: Record<AssetKey, { step: 1 | 2 | 3; stroke: Stroke }> = {
  software: { step: 1, stroke: "solid" },
  stocks: { step: 1, stroke: "dashed" },
  bitcoin: { step: 2, stroke: "solid" },
  datacenter: { step: 2, stroke: "dashed" },
  hotel: { step: 2, stroke: "dotted" },
  sp500: { step: 2, stroke: "dashdot" },
  cafe: { step: 3, stroke: "solid" },
  mining: { step: 3, stroke: "dashed" },
  land: { step: 3, stroke: "dashdot" },
  gold: { step: 3, stroke: "dotted" },
}

/** SVG stroke-dasharray per style. Empty string means an unbroken line. */
export const DASH: Record<Stroke, string> = {
  solid: "",
  dashed: "9 5",
  dotted: "2 5",
  dashdot: "10 4 2 4",
}

/**
 * CSS `border-style` per stroke, for the small swatches in the pointer
 * readout. CSS has no dash-dot, so that style borrows the dashed border and
 * leans on the grey step and the name beside it to stay separable.
 */
export const BORDER_STYLE: Record<Stroke, string> = {
  solid: "solid",
  dashed: "dashed",
  dotted: "dotted",
  dashdot: "dashed",
}

export const strokeColor = (k: AssetKey) => `var(--series-${SERIES[k].step})`
export const dashArray = (k: AssetKey) => DASH[SERIES[k].stroke] || undefined

/** The overlay chart opens with every asset drawn; at least one stays on. */
export const DEFAULT_VISIBLE: readonly AssetKey[] = ASSETS

/**
 * Nominal total return per decade, income reinvested, before tax. Every asset
 * decays toward a terminal rate near nominal GDP, because nothing has ever
 * compounded at its opening rate for forty years.
 *
 * What fixes the opening decade, per asset:
 *
 * land         the residential price index has averaged `rppi` a year since
 *              2003 and printed `rppiLow` in the last quarter of 2025. Bali
 *              tourist-zone land has run hotter than the national index, and
 *              no official Bali land series exists, so the opening decade is
 *              set at roughly double the national average and converges back
 *              to it. That premium is our assumption, not a published figure.
 * hotel        land-like appreciation plus a net operating yield, thinning as
 *              rooms are added. Occupancy is real and published (`baliOccupancy`
 *              was the best in Indonesia in mid-2026); the net yields quoted in
 *              the 7-to-12-percent range come from villa sellers, not from a
 *              statistics office, so they are not used as an anchor.
 * cafe         a cash business, not an appreciating one: high early return on a
 *              small base, near-zero terminal value. `restoMargin` is the net
 *              margin on revenue and `restoSurvival` is why the weighted result
 *              collapses.
 * mining       a commodity cycle. Thermal coal went from 45 dollars a tonne in
 *              September 2020 to `coalPeak` in May 2022 and then gave back
 *              `coalFall`. Reserve depletion and the energy transition sit in
 *              the survival number, not in the rate.
 * datacenter   `dcCagr` is the market forecast to 2031 and `dcLoad` the
 *              forecast growth in installed capacity; other houses publish as
 *              low as 8 percent. The opening decade sits in the middle of that
 *              spread and then decays hard, because a data centre is a physical
 *              asset with a megawatt ceiling. It is the AI-adjacent asset that
 *              still runs out of room.
 * bitcoin      `btcReturn` is the realised ten-year annualised return. The
 *              opening decade here is less than half of it, and it keeps
 *              decaying, because an asset cannot stay a monetary experiment and
 *              a mature store of value at the same time.
 * stocks       `ihsg20` is what the IDX Composite actually did over the twenty
 *              years in HISTORY, before dividends. The opening decade sits at
 *              eleven, roughly the measured price return plus a dividend yield
 *              that has run near three percent, and decays toward nominal GDP.
 * sp500        `sp50020` is the measured dollar price return over the same
 *              twenty years and `idrUsd20` the rupiah's average annual fall
 *              against the dollar; together they made fourteen percent a year
 *              in rupiah with dividends reinvested. The opening decade is set
 *              at ten, well under that, because the American market entered
 *              this period cheap and does not now.
 * gold         the widest gap on this page between what happened and what we
 *              assume. Gold returned `gold20` a year in dollars over the same
 *              twenty years, and more than fourteen in rupiah. The opening
 *              decade here is eight, because gold produces nothing: over a long
 *              enough run its return is the currency losing value, not the
 *              metal gaining any.
 * software     no published series exists for a company that does not exist
 *              yet. This is the one curve with no anchor on its rate, only on
 *              its odds of survival, and the page says so.
 */
export const RATES: Record<
  AssetKey,
  readonly [number, number, number, number]
> = {
  software: [0.35, 0.18, 0.08, 0.05],
  bitcoin: [0.26, 0.15, 0.09, 0.06],
  datacenter: [0.14, 0.09, 0.06, 0.05],
  cafe: [0.12, 0.08, 0.06, 0.05],
  stocks: [0.11, 0.09, 0.075, 0.06],
  sp500: [0.1, 0.085, 0.07, 0.06],
  mining: [0.1, 0.07, 0.05, 0.04],
  hotel: [0.09, 0.07, 0.055, 0.045],
  gold: [0.08, 0.065, 0.055, 0.05],
  land: [0.07, 0.055, 0.045, 0.04],
}

/**
 * Probability the holder still owns a working version of the asset at year 40.
 *
 * For a business this is calibrated on the survival tables: `blsInfo` of
 * information-sector firms are still trading after five years and `bls10` of
 * all firms after ten, with the hazard falling for whoever is left. An
 * acquisition counts as survival, because the owner got paid.
 *
 * `restoSurvival` is what drives the cafe number, and it is the single most
 * consequential figure on the page. For Bitcoin this is custody, forced sale
 * and protocol risk together, never a price view. These are the most arguable
 * numbers here, which is exactly why they are printed rather than buried in
 * the curve.
 *
 * The three paper assets score high for a reason worth stating plainly: an
 * index cannot go out of business, because a company that fails is replaced in
 * it by one that has not. What is left is entirely the holder's own risk, which
 * is selling at the bottom, a broker or custodian failing, or needing the money
 * in the wrong year. Gold adds theft and storage to that list and scores a
 * little lower.
 */
export const SURVIVAL: Record<AssetKey, number> = {
  software: 0.15,
  bitcoin: 0.6,
  stocks: 0.85,
  sp500: 0.9,
  gold: 0.85,
  datacenter: 0.55,
  cafe: 0.05,
  mining: 0.45,
  hotel: 0.7,
  land: 0.9,
}

/**
 * Deepest observed or modelled fall, and the years to get back to even.
 *
 * The measure is deliberately mixed and the figure says so: a price where a
 * price exists, and the cash the asset produces where one does not. Bitcoin and
 * coal are prices (`btcDrawdown`, `coalFall`). A Bali hotel and a Bali cafe are
 * revenue, anchored on `baliCollapse`, the fall in foreign arrivals in 2020.
 * Land has no daily price at all, which is the point of its row.
 *
 * The three paper assets are measured off the same daily closes as HISTORY, so
 * their falls and their recovery times are observations rather than estimates:
 * `ihsgDrawdown` in 2008 and back inside two years, the S&P 500 down 56.8
 * percent between October 2007 and March 2009 and back after five and a half,
 * and `goldDrawdown` from August 2011 with nine years to par. Gold has the
 * shallowest fall on this page and by far the longest wait.
 */
export const MAX_DRAWDOWN: Record<AssetKey, number> = {
  software: -0.55,
  bitcoin: -0.853,
  stocks: -0.607,
  sp500: -0.568,
  gold: -0.444,
  datacenter: -0.45,
  cafe: -0.83,
  mining: -0.65,
  hotel: -0.83,
  land: -0.35,
}
export const RECOVERY_YEARS: Record<AssetKey, number> = {
  software: 4,
  bitcoin: 3,
  stocks: 2,
  sp500: 6,
  gold: 9,
  datacenter: 3,
  cafe: 5,
  mining: 5,
  hotel: 5,
  land: 7,
}

/**
 * The qualitative half, scored 0 to 4 for an operator who lives in Bali and is
 * starting without outside capital. Four is best for that person, not best in
 * general: a cafe scores badly on almost everything and top marks on local
 * jobs, and both facts are true at once.
 */
export const CONTROL_ROWS = [
  "capital",
  "liquidity",
  "effort",
  "ceiling",
  "marginal",
  "data",
  "jobs",
] as const
export type ControlRow = (typeof CONTROL_ROWS)[number]

export const CONTROL: Record<ControlRow, Record<AssetKey, number>> = {
  capital: {
    software: 3,
    bitcoin: 4,
    stocks: 4,
    sp500: 4,
    gold: 4,
    datacenter: 0,
    cafe: 1,
    mining: 0,
    hotel: 0,
    land: 0,
  },
  liquidity: {
    software: 1,
    bitcoin: 4,
    stocks: 4,
    sp500: 4,
    gold: 3,
    datacenter: 1,
    cafe: 1,
    mining: 2,
    hotel: 1,
    land: 1,
  },
  effort: {
    software: 4,
    bitcoin: 0,
    stocks: 0,
    sp500: 0,
    gold: 0,
    datacenter: 1,
    cafe: 3,
    mining: 1,
    hotel: 2,
    land: 0,
  },
  ceiling: {
    software: 4,
    bitcoin: 4,
    stocks: 4,
    sp500: 4,
    gold: 3,
    datacenter: 1,
    cafe: 1,
    mining: 0,
    hotel: 1,
    land: 1,
  },
  marginal: {
    software: 3,
    bitcoin: 4,
    stocks: 4,
    sp500: 4,
    gold: 3,
    datacenter: 1,
    cafe: 1,
    mining: 0,
    hotel: 1,
    land: 0,
  },
  data: {
    software: 4,
    bitcoin: 0,
    stocks: 0,
    sp500: 0,
    gold: 0,
    datacenter: 1,
    cafe: 1,
    mining: 0,
    hotel: 1,
    land: 0,
  },
  jobs: {
    software: 4,
    bitcoin: 0,
    stocks: 1,
    sp500: 0,
    gold: 0,
    datacenter: 2,
    cafe: 4,
    mining: 1,
    hotel: 3,
    land: 0,
  },
}
export const CONTROL_MAX = 4

/* ================================= model ================================= */

/** Index from year 0 to year 40 inclusive, base 100. */
function build(rates: readonly number[]): number[] {
  const out = [BASE_INDEX]
  for (let y = 1; y <= HORIZON; y++) {
    out.push(
      out[y - 1] *
        (1 + rates[Math.min(rates.length - 1, Math.floor((y - 1) / 10))])
    )
  }
  return out
}

export const INDEX = Object.fromEntries(
  ASSETS.map((k) => [k, build(RATES[k])])
) as Record<AssetKey, number[]>

/** Index value with the survival probability ramped in over the run. */
export function weighted(key: AssetKey, year: number): number {
  return INDEX[key][year] * Math.pow(SURVIVAL[key], year / HORIZON)
}

/** Compound annual rate implied by an index value at a given year. */
export function cagr(value: number, years: number): number {
  return Math.pow(value / BASE_INDEX, 1 / years) - 1
}

/**
 * The multiple of the starting stake, e.g. "370" for 37,007.
 *
 * One decimal below 100x, none above. The threshold is not cosmetic: mining
 * lands on 12.3x and a villa on 12.4x, and rounding both to "12x" would print
 * two different assets as the same number.
 */
export function multiple(value: number, lang: Lang): string {
  const n = value / BASE_INDEX
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
    minimumFractionDigits: n < 100 ? 1 : 0,
    maximumFractionDigits: n < 100 ? 1 : 0,
  }).format(n)
}

export function percent(fraction: number, lang: Lang, digits = 1): string {
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(fraction * 100)
}

/**
 * Decade rate strings for the assumptions table, e.g. "35 / 18 / 8 / 5".
 * One decimal is kept where a rate has one: rounding 5.5 to 6 in the table
 * that exists to publish the inputs would misstate the input.
 */
export function rateRow(key: AssetKey, lang: Lang): string {
  const fmt = new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
    maximumFractionDigits: 1,
  })
  return RATES[key].map((r) => fmt.format(r * 100)).join(" / ")
}

/** A source's headline figure, rendered for the locale. */
export function sourceFigure(id: SourceId, lang: Lang): string {
  const src = SOURCES.find((s) => s.id === id)
  if (!src) return ""
  const locale = lang === "en" ? "en-US" : "id-ID"
  const n = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(
    src.value
  )
  return src.unit === "usd" ? `US$${n}` : `${n}%`
}

/* ============================== the past =============================== */

/**
 * Twenty years that actually happened: 2005 through 2025, in both currencies.
 *
 * Everything else on this page is a curve we built out of assumptions we wrote
 * ourselves. This block is the opposite, and it exists because a forty-year
 * model with nothing measured behind it is a drawing. These are year-end
 * closing prices: the IDX Composite in rupiah, the S&P 500 price index in
 * dollars, gold in dollars per troy ounce, and the dollar against the rupiah.
 * Every one of them can be looked up.
 *
 * THREE RULES FOR THIS BLOCK.
 *
 * Both currencies, drawn twice, on one shared scale. The reader spends rupiah,
 * so the rupiah panel comes first and every foreign close is converted at that
 * year's own rate. But the rupiah fell from 9,806 to 16,709 to the dollar over
 * the window, which is 2.7 percent a year of lift that the assets did nothing
 * to earn, and a page that showed only the rupiah panel would be quietly
 * banking that lift as performance. So the same three series are drawn again
 * in dollars, on the same axis and the same ticks, and the gap between the two
 * panels is the currency. Nothing else about the two figures differs.
 *
 * No dividends, on either stock line. The IDX Composite and the S&P 500 are
 * both price indices here, so both are understated by the same kind of amount
 * and neither gets an advantage the other is denied. The page says so and
 * gives the size of it.
 *
 * The window is fixed and closed. Twenty whole years ending 31 December 2025,
 * never a trailing window that quietly reframes itself on every deploy. Where
 * the three stood after it closed is in HISTORY_AS_OF, with its own date on it.
 */
export const HISTORY_START = 2005
export const HISTORY_END = 2025
export const HISTORY_SPAN = HISTORY_END - HISTORY_START

export const HISTORY_KEYS = ["stocks", "sp500", "gold"] as const
export type HistoryKey = (typeof HISTORY_KEYS)[number]

export const HISTORY_YEARS: number[] = Array.from(
  { length: HISTORY_SPAN + 1 },
  (_, i) => HISTORY_START + i
)

/** Year-end closes, 2005 first, 2025 last. */
export const HISTORY_CLOSE: Record<HistoryKey, readonly number[]> = {
  stocks: [
    1162.64, 1805.52, 2745.83, 1355.41, 2534.36, 3703.51, 3821.99, 4316.69,
    4274.18, 5226.95, 4593.01, 5296.71, 6355.65, 6194.5, 6299.54, 5979.07,
    6581.48, 6850.62, 7272.8, 7079.9, 8646.94,
  ],
  sp500: [
    1248.29, 1418.3, 1468.36, 903.25, 1115.1, 1257.64, 1257.6, 1426.19, 1848.36,
    2058.9, 2043.94, 2238.83, 2673.61, 2506.85, 3230.78, 3756.07, 4766.18,
    3839.5, 4769.83, 5881.63, 6845.5,
  ],
  gold: [
    517.1, 635.2, 834.9, 883.6, 1095.2, 1421.1, 1565.8, 1674.8, 1201.9, 1183.9,
    1060.3, 1150.0, 1306.3, 1278.3, 1519.5, 1893.1, 1827.5, 1819.7, 2062.4,
    2629.2, 4325.6,
  ],
}

/** Rupiah per dollar at each of those year-ends. */
export const HISTORY_FX: readonly number[] = [
  9806, 8981, 9460, 11160, 9427, 8886, 8855, 9612, 12217, 12420, 13845, 13466,
  13558, 14553, 13919, 13833, 14285, 15620, 15425, 16086, 16709,
]

/** Only the Indonesian index is already quoted in the currency we read it in. */
export const HISTORY_IN_RUPIAH: Record<HistoryKey, boolean> = {
  stocks: true,
  sp500: false,
  gold: false,
}

/** The two currencies the same twenty years are read in. */
export const MONEY = ["idr", "usd"] as const
export type Money = (typeof MONEY)[number]

/**
 * One close, converted into one currency. Only one of the three series is
 * quoted in rupiah, so each conversion is a single multiply or a single
 * divide, and in its own currency a close passes through untouched.
 */
const converted = (k: HistoryKey, i: number, m: Money) =>
  HISTORY_IN_RUPIAH[k] === (m === "idr")
    ? HISTORY_CLOSE[k][i]
    : m === "idr"
      ? HISTORY_CLOSE[k][i] * HISTORY_FX[i]
      : HISTORY_CLOSE[k][i] / HISTORY_FX[i]

/** Each series in each currency, rebased so year-end 2005 is 100. */
export const HISTORY_INDEX = Object.fromEntries(
  MONEY.map((m) => [
    m,
    Object.fromEntries(
      HISTORY_KEYS.map((k) => [
        k,
        HISTORY_YEARS.map(
          (_, i) => (converted(k, i, m) / converted(k, 0, m)) * BASE_INDEX
        ),
      ])
    ) as Record<HistoryKey, number[]>,
  ])
) as Record<Money, Record<HistoryKey, number[]>>

/** What one unit of that currency put in turned into over the window. */
export const historyMultiple = (k: HistoryKey, m: Money) =>
  HISTORY_INDEX[m][k][HISTORY_SPAN] / BASE_INDEX

export const historyCagr = (k: HistoryKey, m: Money) =>
  cagr(HISTORY_INDEX[m][k][HISTORY_SPAN], HISTORY_SPAN)

/** The currency itself, which is a third of the story on two of the lines. */
export const HISTORY_FX_MULTIPLE = HISTORY_FX[HISTORY_SPAN] / HISTORY_FX[0]
export const HISTORY_FX_CAGR =
  Math.pow(HISTORY_FX_MULTIPLE, 1 / HISTORY_SPAN) - 1

/**
 * Where the three stood after the window closed, with the date attached.
 *
 * The chart stops at the end of 2025 so that twenty years means twenty years.
 * This is the honest footnote to that decision, and the reason it is worth
 * printing is the Indonesian line: the IDX Composite peaked at 9,134.70 on
 * 20 January 2026 and was 41.5 percent lower by 8 June. A page that showed
 * only the closed window would have hidden the most recent thing that happened
 * to the asset a reader in Indonesia is most likely to hold.
 */
export const HISTORY_AS_OF = {
  date: "2026-09-08",
  close: { stocks: 6686.44, sp500: 7673.52, gold: 4393.9 } as Record<
    HistoryKey,
    number
  >,
  fx: 17664,
  peak: 9134.7,
  peakDate: "2026-01-20",
  troughFall: -0.415,
}

/* ================================ content ================================ */

const content = {
  id: {
    meta: {
      title:
        "40 tahun: software AI vs tanah, villa, IHSG, S&P 500, emas, Bitcoin",
      description:
        "Kenapa kami bangun software AI, bukan beli tanah, indeks saham, atau emas. Sepuluh cara naruh duit di Indonesia, 40 tahun ke depan, dipotong peluang gagal, dibuka sama 20 tahun data asli IHSG, S&P 500, dan emas, dalam rupiah dan dalam dolar.",
    },
    figure: {
      prefix: "GBR.",
      status: "MODEL",
      statusTitle:
        "Angka model dari asumsi yang tertulis, bukan hasil pengukuran",
      dataStatus: "DATA",
      dataStatusTitle:
        "Harga tutup tahun yang benar-benar terjadi, bukan model",
      table: "Lihat angkanya",
    },
    assets: {
      software: "Software AI",
      bitcoin: "Bitcoin",
      stocks: "IHSG",
      sp500: "S&P 500",
      gold: "Emas",
      datacenter: "Pusat data",
      cafe: "Kafe & resto",
      mining: "Tambang",
      hotel: "Villa & hotel",
      land: "Tanah Bali",
    },

    eyebrow: "Horizon 40 tahun",
    heading: "Sepuluh pilihan,\nempat puluh tahun.",
    lead: "Duit nganggur di Bali larinya ke tanah, villa, atau kafe. Di luar Bali, ke tambang. Sekarang nambah satu: pusat data buat AI. Yang paling gampang justru paling jarang disebut, yaitu indeks saham dan emas, tinggal beli dari HP. Kami milih yang lain. Ini sepuluh-sepuluhnya di satu grafik, dibuka sama dua puluh tahun yang beneran kejadian, terus dipotong peluang gagalnya masing-masing.",
    meta_:
      "Semua kurva di sini model, bukan hasil ukuran dan bukan capaian kami. Asumsinya kami tulis sendiri. Angka jangkarnya dari lembaga resmi, linknya ada di bawah.",

    statement: "Kurva paling curam\nbukan alasan kami milih.",

    why: {
      label: "01 · Pertanyaannya",
      heading: "Kenapa gak ikut\nbeli tanah aja?",
      body: [
        "Pertanyaan ini paling sering masuk, dan wajar. Di Bali, cerita orang kaya itu ceritanya tanah. Beli di Canggu belasan tahun lalu, sekarang harganya berkali lipat. Semua orang di sini kenal satu.",
        "Versi lain juga sering. Buka kafe. Bangun villa. Modal gede, masuk tambang. Dua tahun terakhir muncul yang baru. Ini yang paling nyambung sama kerjaan kami: bangun pusat data buat nampung AI orang lain.",
        "Kami gak bilang satu pun dari itu salah. Yang mau kami tunjukin bukan mana yang paling untung. Tapi apa yang sebenernya kamu beli pas milih salah satunya. Terus apa yang berubah kalau jangkanya ditarik empat puluh tahun.",
        "Kenapa empat puluh tahun? Bukan buat gaya-gayaan. Di jarak segitu bunga berbunga baru kelihatan bentuk aslinya. Dan cukup panjang buat nunjukin satu hal: yang nentuin hasil akhir bukan cuma seberapa cepet naiknya.",
      ],
    },

    history: {
      label: "02 · Yang beneran kejadian",
      heading: "Sebelum ngeramal\nempat puluh tahun.",
      sub: "Semua kurva lain di halaman ini model. Yang satu ini enggak. Ini harga tutup tahun beneran, 2005 sampai 2025, digambar dua kali: sekali dalam rupiah, sekali dalam dolar AS. Skalanya sama persis, jadi selisih dua panelnya itu murni kursnya.",
      chart: {
        title: "IHSG, S&P 500, dan emas, dua puluh tahun, dalam rupiah",
        titleUsd: "Tiga garis yang sama, dua puluh tahun, dalam dolar AS",
        unit: "indeks, tutup tahun 2005 = 100, dihitung dalam rupiah",
        unitUsd: "indeks, tutup tahun 2005 = 100, dihitung dalam dolar AS",
        xLabel: "Tahun",
        yLabel: "Indeks",
        perYear: "per tahun",
        tableHeaders: [
          "Tahun",
          "IHSG",
          "S&P 500",
          "Emas (US$)",
          "Kurs (Rp/US$)",
        ],
        usdTableHeaders: ["Tahun", "IHSG", "S&P 500", "Emas"],
        summaryHeaders: [
          "Aset",
          "Tutup 2005",
          "Tutup 2025",
          "Kelipatan, rupiah",
          "Per tahun, rupiah",
          "Kelipatan, dolar",
          "Per tahun, dolar",
        ],
      },
      lead: [
        "Tiga aset ini bisa dibeli siapa aja dari HP, hari ini juga, tanpa izin dan tanpa karyawan. Dua puluh tahun terakhir, dihitung dalam rupiah, IHSG jadi 7,4 kali. S&P 500 jadi 9,3 kali. Emas jadi 14,3 kali.",
        "Dalam dolar AS, tiga-tiganya lebih kecil. IHSG jadi 4,4 kali, S&P 500 jadi 5,5 kali, emas jadi 8,4 kali. Angkanya gak ada yang beda datanya, cuma beda mata uang buat ngukurnya. Rupiah yang kamu belanjain, jadi panel rupiah yang duluan. Tapi panel dolarnya juga kami pasang, karena kalau cuma panel rupiah, pelemahan rupiah kebaca kayak prestasi asetnya.",
        "Yang paling gampang dibeli malah ngasih angka paling gede, di dua-duanya. Itu bukan grafiknya yang salah. Itu emang hasilnya, dan halaman ini bakal jauh lebih enak ditulis kalau angkanya lain.",
      ],
      rupiah: {
        label: "Selisih dua panel itu kursnya",
        body: "Akhir 2005 satu dolar Rp9.806. Akhir 2025 Rp16.709. Rata-rata rupiah melemah 2,7 persen setahun, dua puluh tahun berturut-turut. Itu persis jarak antara dua grafik di atas: S&P 500 naik 8,9 persen setahun dalam dolar, tapi 11,8 persen dalam rupiah, dan 2,7 persennya bukan hasil kerja asetnya. Buat yang megang aset dolar, angka itu numpang naik tiap tahun. Buat yang cuma megang rupiah, angka yang sama jalan ke arah sebaliknya.",
      },
      dividend: {
        label: "Dua garis saham belum termasuk dividen",
        body: "IHSG sama S&P 500 di sini dua-duanya indeks harga, jadi dua-duanya sama-sama dikecilin dan gak ada yang dikasih keuntungan yang satunya gak dapet. Kalau dividennya diputer balik, S&P 500 di periode ini bukan 8,9 persen setahun dalam dolar tapi 11,0 persen. Yield dividen IHSG selama periode ini rata-rata di atas S&P 500, jadi garis Indonesianya juga ikut naik, bukan turun. Emas gak bayar apa-apa, jadi garisnya udah apa adanya.",
      },
      land: {
        label: "Yang selama ini dikejar orang",
        body: "Di dua puluh tahun yang persis sama, indeks harga properti residensial Bank Indonesia naik rata-rata 3,57 persen setahun. Itu angka nasional, dan tanah zona turis di Bali jalannya emang lebih kencang dari itu. Tapi angka nasional yang diterbitin, dan angka nasionalnya ada di bawah ketiga garis di atas.",
      },
      asOf: {
        label: "Setelah jendelanya nutup",
        body: "Grafiknya berhenti di tutup tahun 2025 biar dua puluh tahun beneran dua puluh tahun. Per 8 September 2026, IHSG di 6.686. Turun 22,7 persen dari tutup 2025 dan 26,8 persen di bawah puncaknya di 9.134 tanggal 20 Januari 2026. Di titik terendahnya tanggal 8 Juni, jaraknya 41,5 persen dari puncak itu. S&P 500 di 7.674 dan emas di US$4.394. Jadi garis Indonesianya lagi ngalamin turun terdalam sejak 2008, persis sambil kamu baca ini.",
      },
      after:
        "Bagian ini yang paling gak enak ditulis, dan justru itu alasannya ada di sini. Tiga garis di atas gak minta apa-apa dari kamu. Gak ada karyawan, gak ada izin, gak ada Senin pagi. Dan hasil dua puluh tahunnya ngalahin hampir semua yang bisa kamu bangun sendiri di Bali. Sisa halaman ini bukan buat mbantah itu. Isinya apa yang gak keliatan di tiga garis itu.",
    },

    curve: {
      label: "03 · Kurva mentah",
      heading: "Sekarang empat\npuluh tahun ke depan.",
      sub: "Sepuluh aset, satu indeks, semua mulai dari seratus. Sumbunya logaritmik, jadi jarak yang sama artinya kelipatan yang sama, bukan selisih rupiah yang sama. Mulai dari sini semuanya model, bukan pengukuran.",
      chart: {
        title: "Sepuluh aset, satu sumbu, 40 tahun",
        unit: "indeks, mulai dari 100",
        xLabel: "Tahun",
        yLabel: "Indeks",
        scaleLabel: "Skala",
        log: "Logaritmik",
        linear: "Linier",
        horizonLabel: "Sampai tahun",
        readout: "Tahun",
        hint: "Geser di atas grafik buat baca angka semua aset di tahun itu.",
        capNote:
          "Sepuluh garis sekaligus emang penuh. Warnanya cuma tiga tingkat abu. Bedanya dipegang sama bentuk garis, nama di ujung tiap garis, sama tabel di bawah. Mau lebih tenang? Pilih Sisain software.",
        selectAll: "Pilih semua",
        clear: "Sisain software",
        srHint: "Pakai panah kiri dan kanan buat geser tahunnya.",
        tableHeaders: [
          "Tahun",
          "Software AI",
          "Bitcoin",
          "IHSG",
          "S&P 500",
          "Emas",
          "Pusat data",
          "Kafe & resto",
          "Tambang",
          "Villa & hotel",
          "Tanah Bali",
        ],
      },
      after:
        "Berhenti di sini, kesimpulannya gampang: bangun software, kelar. Tapi kurva ini nganggep semua aset selamat sampai tahun ke-40. Buat tanah, masuk akal. Buat kafe dan software yang baru mulai, itu salah besar.",
    },

    haircut: {
      label: "04 · Dipotong peluang gagal",
      heading: "Sekarang kali\npeluang selamatnya.",
      sub: "Tiap kurva dikali peluang kamu masih megang versi yang hidup di tahun ke-40. Buat usaha, keakuisisi tetep diitung selamat. Pemiliknya tetep dibayar.",
      chart: {
        title: "Nilai di tahun ke-40, sebelum dan sesudah dipotong",
        unit: "kelipatan dari modal awal",
        rawLabel: "Mentah",
        weightedLabel: "Setelah dipotong",
        survivalLabel: "Peluang selamat",
        tableHeaders: [
          "Aset",
          "Mentah",
          "Setelah dipotong",
          "Peluang selamat",
          "Per tahun setelah dipotong",
        ],
      },
      flip: {
        label: "Dua hal yang berubah",
        body: "Urutannya kebalik. Bitcoin naik ke atas software. Kafe yang tadinya nomor enam jatuh ke buncit, tinggal balik modal doang. Dan dua indeks saham, yang gak minta kerjaan sama sekali, nangkring di nomor tiga dan empat, di atas pusat data, villa, tanah, dan tambang. Gak ada yang salah ketik dan gak ada yang sok merendah. Semuanya keluar sendiri dari asumsi yang kami tulis. Kami tampilin karena bagian inilah yang bisa ngubah pikiran orang.",
      },
      cafe: {
        label: "Soal kafe",
        body: "Angka kafe paling penting di halaman ini, dan paling gak enak dibaca. Dasarnya bukan pendapat kami. Tabel ketahanan usaha bilang cuma sekitar separuh restoran yang masih buka lewat tahun kelima. Margin bersihnya cuma beberapa persen dari omzet. Dan empat puluh tahun itu delapan kali lima tahun, berturut-turut.",
      },
    },

    drawdown: {
      label: "05 · Tahun terburuk",
      heading: "Bukan cuma\nseberapa tinggi.",
      sub: "Naik sekian persen setahun itu angka yang enak dibaca. Tapi yang bikin orang jual di waktu paling salah bukan rata-ratanya. Tahun terburuknya. Tiga baris di sini angka terukur, bukan model: IHSG, S&P 500, dan emas.",
      chart: {
        title: "Turun terdalam, dan lama baliknya",
        unit: "persen dari puncak. Harga buat yang ada harganya, omzet buat yang enggak",
        recoveryLabel: "Balik ke impas",
        yearsUnit: "tahun",
        tableHeaders: [
          "Aset",
          "Turun terdalam",
          "Balik ke impas",
          "Yang bikin turun",
        ],
      },
      notes: {
        software:
          "Pelanggan berhenti barengan, biasanya pas ekonominya lagi jelek dan warung mereka tutup duluan.",
        bitcoin:
          "Turun delapan puluh lima persen dari puncak udah pernah kejadian, dan tiap kali kelihatannya kayak beneran selesai.",
        stocks:
          "Turun 61 persen di 2008, terus balik cuma dalam dua tahun, paling cepet di halaman ini. Tahun ini turun lagi 41,5 persen dari puncak Januari, dan yang itu belum kelar.",
        sp500:
          "Turun 57 persen antara Oktober 2007 dan Maret 2009. Butuh lima setengah tahun cuma buat ketemu angka yang sama lagi.",
        gold: "Turunnya paling dangkal di halaman ini. Baliknya paling lama: puncak Agustus 2011 baru kesamain lagi Juli 2020, dan selama sembilan tahun nunggu itu dia gak bayar sepeser pun.",
        datacenter:
          "Rak kosong pas kontrak gede pindah, plus mesinnya tetep tua walau gak kepakai.",
        cafe: "Angka yang sama kayak villa, karena bulannya sama. Bedanya kafe gak punya aset yang bisa dijual pas tutup.",
        mining:
          "Batu bara naik hampir sembilan kali dalam dua puluh bulan, terus balik turun dua per tiga. Harganya bukan kamu yang nentuin.",
        hotel:
          "Tahun 2020 ngajarin ini ke semua orang di Bali. Kamar kosong, cicilan jalan terus.",
        land: "Kelihatan adem karena gak ada yang ngasih harga tiap hari. Pas kamu butuh jual cepet, baru ketahuan diskonnya.",
      },
      after:
        "Tanah kelihatan paling aman di grafik ini justru karena gak ada yang ngasih harga tiap hari. Diem bukan berarti aman.",
    },

    control: {
      label: "06 · Yang bisa dikendaliin",
      heading: "Kerja kamu\nngaruh gak?",
      sub: "Sampai sini semuanya soal angka. Yang di bawah ini alasan kami milih yang sebenernya, dan dia gak nongol di kurva mana pun.",
      chart: {
        title: "Tujuh hal yang gak keliatan di kurva",
        unit: "skala 0 sampai 4",
        tableHeaders: ["Yang dinilai"],
      },
      rows: {
        capital: {
          label: "Modal buat mulai",
          note: "Nol artinya butuh miliaran duluan",
        },
        liquidity: {
          label: "Cepet dicairin",
          note: "Dari mau jual sampai duitnya masuk",
        },
        effort: {
          label: "Kerja kamu ngubah hasilnya",
          note: "Bisa gak dipercepat kalau digarap lebih serius",
        },
        ceiling: {
          label: "Bisa gede tanpa batas kamar",
          note: "Ada gak dinding yang bikin tambahan permintaan gak jadi cuan",
        },
        marginal: {
          label: "Biaya nambah satu pelanggan",
          note: "Empat artinya nyaris nol",
        },
        data: {
          label: "Data numpuk jadi milik sendiri",
          note: "Aset yang gak bisa dibeli, cuma bisa dikumpulin",
        },
        jobs: {
          label: "Bikin kerjaan buat orang Bali",
          note: "Bukan alasan finansial, dan kami gak pura-pura itu finansial",
        },
      },
      scaleNote:
        "Skalanya 0 sampai 4, dilihat dari kacamata orang yang mulai dari Bali tanpa modal luar. Empat artinya paling enak buat dia, bukan paling bagus buat semua orang. Kafe dapet nilai jelek di hampir semua baris, tapi nilai penuh di lapangan kerja. Dua-duanya bener bareng.",
    },

    answer: {
      label: "07 · Jawabannya",
      heading: "Cuma satu garis\nyang nurut sama kerja.",
      items: [
        {
          title: "Tanah gak peduli kamu ngapain hari Senin",
          body: "Tanah di Canggu naik karena ada orang lain yang mau bayar lebih mahal. Kerja lebih keras gak bikin dia naik lebih cepet. Bitcoin sama. Harga batu bara juga. Semuanya aset yang kamu tungguin, bukan yang kamu garap.",
        },
        {
          title: "Software naik karena ada yang digarap",
          body: "Fitur yang bener. Pelanggan yang batal berhenti. Harga yang dinaikin dan gak ada yang protes. Semuanya langsung ngubah kemiringan garisnya. Bukan berarti lebih gampang. Berarti bisa diusahain.",
        },
        {
          title: "Pusat data itu AI, tapi tetep bangunan",
          body: "Ini yang paling deket sama kerjaan kami, dan tetep kami lewatin. Pusat data itu nyewain rak ke orang yang bikin AI. Dindingnya sama kayak hotel, cuma namanya megawatt bukan kamar. Dan data yang lewat di dalamnya bukan punya dia.",
        },
        {
          title: "Indeks itu pembanding yang jujur, bukan musuh",
          body: "Kalau yang kamu mau cuma duit naik tanpa kamu ngapa-ngapain, beli indeks. Beneran, itu saran kami. Dua puluh tahun terakhir IHSG jadi 7,4 kali dan emas jadi 14,3 kali, tanpa karyawan dan tanpa izin. Kami gak bikin perusahaan buat ngalahin angka itu. Kami bikin perusahaan karena indeks gak bisa digarap, dan apa pun yang kami kerjain hari Senin gak ngubah satu angka pun di dalemnya.",
        },
        {
          title: "Kafe itu kerjaan, bukan aset",
          body: "Dari semua pilihan di halaman ini, kafe yang paling banyak ngasih kerjaan. Itu beneran berharga. Tapi sebagai tempat naruh duit empat puluh tahun, tabel ketahanannya bilang lain. Kami gak mau nutupin angkanya.",
        },
        {
          title: "Yang numpuk bukan cuma duitnya",
          body: "Tiap kali pemilik warung benerin catatannya di produk kami, dia ninggalin data yang cuma kami yang punya. Aset itu gak nongol di grafik mana pun di halaman ini. Dan gak ada yang jual.",
        },
        {
          title: "Duitnya muter balik ke sini",
          body: "Villa yang dibeli orang luar ngirim sewanya keluar Bali. Tambang ngirim hasilnya keluar pulau. Software yang dibangun di sini bayarin engineer yang tinggal di sini juga. Ini bukan alasan finansial, dan kami gak mau pura-pura begitu.",
        },
      ],
      close: {
        label: "Bacanya gini",
        body: "Jadi jawabannya bukan software ngalahin Bitcoin. Liat grafik ketiga, dia enggak. Jawabannya begini: software itu mesinnya, Bitcoin itu tangkinya. Mesin yang ngasilin duit, tangki yang nyimpen sisanya. Siapa dibayar duluan ada di halaman ke mana modalnya.",
        link: "Ke mana modalnya",
      },
    },

    assumptions: {
      label: "08 · Asumsi & sumber",
      heading: "Kalau gak setuju,\nbantah angkanya.",
      sub: "Tabel pertama: semua input yang bikin sepuluh kurva di atas. Tabel kedua: angka terbitan lembaga resmi yang jadi jangkarnya, lengkap sama linknya. Ganti satu input, gambarnya ikut ganti.",
      tableHeaders: [
        "Aset",
        "Naik per dekade (%)",
        "Peluang selamat 40 th",
        "Turun terdalam",
        "Per tahun, 40 th",
      ],
      note: "Naik per dekade dibaca urut: dekade pertama, kedua, ketiga, keempat. Semuanya nominal, udah termasuk pendapatan yang diputer balik, belum dipotong pajak. Inflasi juga masih jalan. Jadi angka nyatanya lebih kecil dari yang kelihatan di sini.",
      sourcesLabel: "Angka jangkarnya",
      sourceHeaders: ["Angka", "Yang diukur", "Sumber"],
      sourceNote:
        "Jangkar itu bukan ramalan. Dia cuma nentuin titik mulai yang masuk akal buat tiap kurva. Laju turunnya per dekade tetep asumsi kami. Satu aset malah gak punya jangkar sama sekali buat lajunya: software AI, soalnya perusahaannya belum ada. Yang berjangkar cuma peluang selamatnya. Enam baris terakhir di tabel ini beda jenisnya: itu hasil pengukuran dua puluh tahun di bagian 02, bukan asumsi.",
      sources: {
        rppi: "Rata-rata kenaikan indeks harga properti residensial Indonesia per tahun, 2003 sampai 2025",
        rppiLow:
          "Kenaikan indeks yang sama di kuartal empat 2025, paling lambat sejak datanya ada",
        inflation:
          "Rata-rata inflasi Indonesia sepanjang 2025, buat ngebandingin angka nominal di atas",
        baliCollapse:
          "Turunnya kunjungan wisatawan asing ke Bali tahun 2020, dari 6,3 juta orang di 2019",
        baliOccupancy:
          "Tingkat hunian kamar hotel bintang di Bali, Juli 2026, tertinggi di Indonesia",
        restoSurvival: "Restoran yang masih buka lewat tahun kelima",
        restoMargin:
          "Margin bersih restoran, di kisaran tiga sampai lima persen dari omzet",
        coalPeak:
          "Harga batu bara termal Newcastle di puncaknya Mei 2022, naik dari US$45 per ton di September 2020",
        coalFall: "Turunnya harga itu dari puncak sampai 2026",
        btcReturn:
          "Imbal hasil Bitcoin per tahun selama sepuluh tahun terakhir",
        btcDrawdown: "Turun terdalam Bitcoin dari puncak, Januari 2015",
        dcCagr:
          "Perkiraan pertumbuhan pasar pusat data Indonesia sampai 2031. Lembaga lain nerbitin angka 8 sampai 20 persen",
        dcLoad:
          "Perkiraan pertumbuhan kapasitas listrik pusat data yang terpasang sampai 2030",
        blsInfo:
          "Usaha di sektor informasi yang masih jalan setelah lima tahun",
        bls10: "Semua usaha swasta yang masih jalan setelah sepuluh tahun",
        ihsg20:
          "Imbal hasil IHSG per tahun selama dua puluh tahun, tutup 2005 sampai tutup 2025, belum termasuk dividen",
        ihsgDrawdown:
          "Turun terdalam IHSG, dari puncak Januari 2008 ke dasar Oktober 2008. Balik ke puncaknya April 2010",
        sp50020:
          "Imbal hasil indeks harga S&P 500 per tahun di periode yang sama, dalam dolar, belum termasuk dividen. Kalau dividennya diputer balik, angkanya 11,0 persen",
        gold20:
          "Kenaikan harga emas per tahun di periode yang sama, dalam dolar per troy ounce",
        goldDrawdown:
          "Turun terdalam emas, dari puncak Agustus 2011 ke dasar Desember 2015. Baru balik ke harga puncaknya Juli 2020",
        idrUsd20:
          "Rata-rata pelemahan rupiah terhadap dolar per tahun di periode yang sama, dari Rp9.806 jadi Rp16.709",
      },
    },

    legal: {
      label: "Catatan hukum",
      items: [
        "Halaman ini membandingkan bentuk ekonomi antar jenis aset. Ini bukan penawaran investasi, bukan ajakan membeli efek, dan bukan nasihat investasi.",
        "Semua kurva di sini dihitung dari asumsi yang kami tulis sendiri di halaman ini. Angka jangkarnya terbitan lembaga resmi, kurvanya bukan. Bukan hasil pengukuran, bukan data historis, dan bukan janji hasil.",
        "Kinerja masa lalu jenis aset apa pun tidak menjamin hasil ke depan. Tanah, villa, kafe, tambang, pusat data, Bitcoin, emas, indeks saham, dan saham perusahaan swasta semuanya bisa turun tajam, dan sebagian di antaranya bisa turun sampai nol.",
        "Angka dua puluh tahun di bagian 02 adalah harga tutup tahun yang benar-benar terjadi, bukan model. Sumbernya data pasar publik: IHSG, indeks harga S&P 500, harga emas dolar per troy ounce, dan kurs dolar terhadap rupiah. Dua indeks saham di situ belum termasuk dividen, dan halaman ini menyebutkan berapa besar selisihnya.",
        "Halaman ini menyebut indeks saham dan emas sebagai pembanding, bukan sebagai produk yang kami jual. Kami bukan manajer investasi, bukan perantara pedagang efek, dan bukan pedagang emas.",
        "Bitcoin yang disebut di sini adalah aset kas perusahaan kami sendiri. Kami bukan pedagang aset kripto, tidak menjual produk kripto, dan tidak memberikan saran beli atau jual kepada siapa pun.",
        "Aset kripto risikonya tinggi dan bisa turun tajam. Pengawasannya ada di OJK, dan pajaknya ngikut aturan yang berlaku saat transaksi.",
        "Angka ketahanan usaha yang kami pakai berasal dari statistik Amerika Serikat, karena seri yang setara untuk Indonesia belum diterbitkan. Kami memakainya apa adanya, tanpa penyesuaian diam-diam.",
      ],
    },

    cta: {
      heading: "Mau bantah angkanya?",
      body: "Kami buka asumsinya, modelnya, sama angka terukur yang gak kami taruh di sini.",
      label: "Ambil 15 menit",
    },
    next: { label: "Lanjut: ke mana modalnya", href: "/tesis/" },
  },

  en: {
    meta: {
      title:
        "Forty years: AI software against land, villas, the IDX Composite, the S&P 500, gold, Bitcoin",
      description:
        "Why we build AI software instead of buying land, a stock index, or gold. Ten ways to put money to work in Indonesia on one axis for forty years, each cut by its own odds of failure, opening with twenty measured years of the IDX Composite, the S&P 500 and gold, in rupiah and in dollars.",
    },
    figure: {
      prefix: "FIG.",
      status: "MODEL",
      statusTitle: "Modelled from stated assumptions, not measured",
      dataStatus: "DATA",
      dataStatusTitle: "Real year-end closing prices, not a model",
      table: "Show the numbers",
    },
    assets: {
      software: "AI software",
      bitcoin: "Bitcoin",
      stocks: "IDX Composite",
      sp500: "S&P 500",
      gold: "Gold",
      datacenter: "Data centres",
      cafe: "Cafes & restaurants",
      mining: "Mining",
      hotel: "Villas & hotels",
      land: "Bali land",
    },

    eyebrow: "Forty-year horizon",
    heading: "Ten choices,\nforty years.",
    lead: "In Bali, spare capital goes into land, a villa, or a cafe. Outside Bali it goes into mining. Lately there is a new option, a data centre for someone else's AI. The easiest option is the one nobody brings up: a stock index or gold, bought from a phone. We build AI software instead. This page opens with twenty years that actually happened, then puts all ten choices on one axis and cuts each of them by its own odds of failure.",
    meta_:
      "Every curve here is modelled from assumptions we wrote ourselves, not measured and not our own results. The figures they are anchored to come from official sources and are linked below.",

    statement: "The steepest curve\nis not why we chose.",

    why: {
      label: "01 · The question",
      heading: "Why not just\nbuy land too?",
      body: [
        "This is the question we get most, and it is a fair one. In Bali, the story of wealth is the story of land. Someone bought in Canggu a decade and a half ago and the price is now a multiple of what they paid. Everyone here knows at least one of those people.",
        "The other versions come up just as often: open a cafe, build a villa, or with serious capital, go into mining. In the last two years a new option appeared that sounds closest to what we do, which is to build a data centre and rent it to whoever is running the AI.",
        "We are not saying any of them is wrong. What this page shows is not which asset wins, but what you are actually buying when you pick one, and what changes when the horizon is pulled out to forty years.",
        "Forty years is not chosen for drama. It is the distance at which compounding shows its real shape, and it is long enough to show that the final result is not decided by how fast something climbs.",
      ],
    },

    history: {
      label: "02 · What actually happened",
      heading: "Twenty measured years\nbefore forty modelled ones.",
      sub: "Every other curve on this page is a model. This one is not. These are real year-end closing prices from 2005 to 2025, drawn twice: once in rupiah and once in US dollars, on the same scale, so the gap between the two panels is the currency and nothing else.",
      chart: {
        title:
          "The IDX Composite, the S&P 500 and gold, twenty years, in rupiah",
        titleUsd: "The same three lines, twenty years, in US dollars",
        unit: "index, year-end 2005 = 100, measured in rupiah",
        unitUsd: "index, year-end 2005 = 100, measured in US dollars",
        xLabel: "Year",
        yLabel: "Index",
        perYear: "a year",
        tableHeaders: [
          "Year",
          "IDX Composite",
          "S&P 500",
          "Gold (US$)",
          "Rate (Rp/US$)",
        ],
        usdTableHeaders: ["Year", "IDX Composite", "S&P 500", "Gold"],
        summaryHeaders: [
          "Asset",
          "Close 2005",
          "Close 2025",
          "Multiple, rupiah",
          "A year, rupiah",
          "Multiple, dollars",
          "A year, dollars",
        ],
      },
      lead: [
        "All three of these can be bought from a phone today, with no permit and no staff. Over the last twenty years, measured in rupiah, the IDX Composite returned 7.4 times, the S&P 500 9.3 times and gold 14.3 times.",
        "In dollars all three are smaller: 4.4 times, 5.5 times and 8.4 times. Not one figure in the data changed, only the currency it is measured in. The rupiah panel leads because rupiah is what a reader here spends, and the dollar panel sits beside it because a page showing only the first would be booking a falling currency as performance.",
        "The easiest thing to buy produced the largest number, in both currencies. That is not a fault in the chart. It is the result, and this page would be considerably easier to write if it said something else.",
      ],
      rupiah: {
        label: "The gap between the panels is the currency",
        body: "A dollar cost Rp9,806 at the end of 2005 and Rp16,709 at the end of 2025. The rupiah lost an average of 2.7 percent a year for twenty consecutive years. That is exactly the distance between the two figures above: the S&P 500 returned 8.9 percent a year in dollars and 11.8 percent in rupiah, and the 2.7 percent between them is not something the asset did. For an Indonesian holding a dollar asset it is a lift every year. For anyone holding only rupiah, the same number runs the other way.",
      },
      dividend: {
        label: "Neither stock line includes dividends",
        body: "Both are price indices here, so both are understated by the same kind of amount and neither is handed an advantage the other is denied. With dividends reinvested the S&P 500 made 11.0 percent a year in dollars over this window rather than 8.9. The IDX Composite has generally yielded more than the S&P 500 across the period, so the Indonesian line moves up on that adjustment too, not down. Gold pays nothing, so its line needs no adjustment at all.",
      },
      land: {
        label: "The thing everyone was buying instead",
        body: "Over exactly the same twenty years, Bank Indonesia's residential property price index rose an average of 3.57 percent a year. That is the national index, and tourist-zone land in Bali has run hotter than it. But the national figure is the one that gets published, and the national figure sits below all three lines above.",
      },
      asOf: {
        label: "After the window closed",
        body: "The chart stops at year-end 2025 so that twenty years means twenty years. As of 8 September 2026 the IDX Composite stood at 6,686, down 22.7 percent from that close and 26.8 percent below its peak of 9,134 on 20 January 2026. At its low on 8 June it was 41.5 percent below that peak. The S&P 500 was at 7,674 and gold at US$4,394. The Indonesian line is in its deepest fall since 2008 while you read this.",
      },
      after:
        "This is the hardest part of the page to write, and that is precisely why it is here. The three lines above ask nothing of you. No staff, no permits, no Monday mornings. Over twenty measured years they beat almost anything you could have built yourself in Bali. What follows is not an argument against that. It is what those three lines do not show.",
    },

    curve: {
      label: "03 · The raw curves",
      heading: "Now the forty\nyears ahead.",
      sub: "Ten assets, one index, a logarithmic vertical scale. Equal distance means equal multiple rather than equal rupiah. From here on everything is modelled rather than measured.",
      chart: {
        title: "Ten assets, one axis, forty years",
        unit: "index, starting at 100",
        xLabel: "Year",
        yLabel: "Index",
        scaleLabel: "Scale",
        log: "Logarithmic",
        linear: "Linear",
        horizonLabel: "Through year",
        readout: "Year",
        hint: "Move across the chart to read every asset at that year.",
        capNote:
          "Ten lines at once is a full plot. There are only three grey steps, so identity is carried by the stroke style, the name at the end of each line, and the table below. Narrow it with Software only, or read any single year off the pointer.",
        selectAll: "Show all",
        clear: "Software only",
        srHint: "Use the left and right arrow keys to move through the years.",
        tableHeaders: [
          "Year",
          "AI software",
          "Bitcoin",
          "IDX Composite",
          "S&P 500",
          "Gold",
          "Data centres",
          "Cafes & restaurants",
          "Mining",
          "Villas & hotels",
          "Bali land",
        ],
      },
      after:
        "Stop here and the conclusion is easy: build software, done. The problem is that this chart assumes every asset survives to year forty. For land that is a reasonable assumption. For a cafe, and for a young software company, it is badly wrong.",
    },

    haircut: {
      label: "04 · Cut by the odds of failure",
      heading: "Now multiply by\nthe odds of surviving.",
      sub: "Each curve is multiplied by the chance you still hold a working version of it at year forty. For a business an acquisition counts as surviving, because the owner still got paid.",
      chart: {
        title: "Value at year forty, before and after the cut",
        unit: "multiple of the starting stake",
        rawLabel: "Raw",
        weightedLabel: "After the cut",
        survivalLabel: "Odds of surviving",
        tableHeaders: [
          "Asset",
          "Raw",
          "After the cut",
          "Odds of surviving",
          "A year, after the cut",
        ],
      },
      flip: {
        label: "Two things change",
        body: "The order flips. Bitcoin passes software, the cafe drops from sixth to last and is worth roughly the money that went in, and the two stock indices, which ask for no work at all, come third and fourth, above data centres, villas, land and mining. None of it is a typo and none of it is false modesty. All of it falls straight out of the assumptions we wrote ourselves, and we show it because this is the half that would change a reader's mind.",
      },
      cafe: {
        label: "About the cafe",
        body: "The cafe figure is the most important number on this page and the least comfortable one. It is not our opinion: it rests on the business survival tables, where only about half of restaurants are still trading past their fifth year, and on a net margin that averages a few percent of revenue. Forty years is eight of those five-year windows in a row.",
      },
    },

    drawdown: {
      label: "05 · The worst year",
      heading: "Not only\nhow high.",
      sub: "An average annual rate is a comfortable number to read. What makes people sell at the worst possible moment is not the average, it is the worst year. Three rows here are measured rather than modelled: the IDX Composite, the S&P 500 and gold.",
      chart: {
        title: "Deepest fall, and how long it takes to get back",
        unit: "percent from peak. Price where a price exists, revenue where it does not",
        recoveryLabel: "Back to even",
        yearsUnit: "years",
        tableHeaders: [
          "Asset",
          "Deepest fall",
          "Back to even",
          "What causes it",
        ],
      },
      notes: {
        software:
          "Customers leave together, usually in the same bad economy that closed their shops first.",
        bitcoin:
          "An eighty-five percent fall from a peak has already happened, and each time it looked like the end.",
        stocks:
          "Down 61 percent in 2008 and back inside two years, the fastest recovery on this page. It is down 41.5 percent again from its January 2026 peak, and that one is not finished.",
        sp500:
          "Down 57 percent between October 2007 and March 2009. It took five and a half years just to see the same number again.",
        gold: "The shallowest fall on this page and the slowest recovery. The August 2011 peak was not matched until July 2020, and nothing was paid out across those nine years of waiting.",
        datacenter:
          "Empty racks when a large contract moves out, and hardware that ages whether or not it is being used.",
        cafe: "The same number as the villa, because it was the same month. The difference is that a cafe has nothing to sell when it closes.",
        mining:
          "Thermal coal rose almost ninefold in twenty months and then gave back two thirds. You do not set the price.",
        hotel:
          "2020 taught this to everyone in Bali. Empty rooms, and the loan still due every month.",
        land: "It looks calm because nobody quotes a price daily. The discount only shows up when you need to sell fast.",
      },
      after:
        "Land looks safest on this chart precisely because nobody prices it every day. Quiet is not the same as stable.",
    },

    control: {
      label: "06 · What you can steer",
      heading: "Does your work\nchange it?",
      sub: "Everything above this point is arithmetic. What follows is the part that actually decided it for us, and it does not appear on any of the curves.",
      chart: {
        title: "Seven things the curves do not show",
        unit: "scored 0 to 4",
        tableHeaders: ["Measure"],
      },
      rows: {
        capital: {
          label: "Capital to start",
          note: "Zero means billions of rupiah up front",
        },
        liquidity: {
          label: "Speed of exit",
          note: "From deciding to sell to holding the money",
        },
        effort: {
          label: "Your work changes the result",
          note: "Whether working harder moves the line at all",
        },
        ceiling: {
          label: "Grows past a room count",
          note: "Whether extra demand stops turning into revenue",
        },
        marginal: {
          label: "Cost of one more customer",
          note: "Four means close to nothing",
        },
        data: {
          label: "Proprietary data accumulates",
          note: "An asset nobody sells, only collects",
        },
        jobs: {
          label: "Work for people in Bali",
          note: "Not a financial reason, and we do not dress it up as one",
        },
      },
      scaleNote:
        "Scored 0 to 4 from the point of view of someone starting in Bali without outside capital. Four is best for that person, not best in general. A cafe scores badly on almost every row and top marks on local jobs, and both are true at the same time.",
    },

    answer: {
      label: "07 · The answer",
      heading: "Only one line\nanswers to work.",
      items: [
        {
          title: "Land does not care what you did on Monday",
          body: "Land in Canggu appreciates because someone else is willing to pay more for it. You cannot make it climb faster by working harder. Bitcoin is exactly the same, and so is the coal price. All of them are assets you wait on, not assets you work.",
        },
        {
          title: "Software climbs because something got built",
          body: "Every feature that lands, every customer who decides not to leave, every price rise nobody objects to, changes the slope directly. That does not make it easier. It makes it earnable.",
        },
        {
          title: "A data centre is AI, and still a building",
          body: "This is the option closest to what we do, and we still passed on it. A data centre rents racks to the people building the AI. It has the same wall a hotel has, only measured in megawatts instead of rooms, and the data moving through it belongs to somebody else.",
        },
        {
          title: "The index is the honest benchmark, not the enemy",
          body: "If all you want is for money to grow while you do nothing, buy the index. We mean that as advice. Over the last twenty years the IDX Composite returned 7.4 times and gold 14.3 times, with no staff and no permits. We did not start a company to beat those numbers. We started one because an index cannot be worked on, and nothing we do on a Monday changes a single figure inside it.",
        },
        {
          title: "A cafe is a job, not an asset",
          body: "A cafe employs more people than anything else on this page, and that is genuinely worth something. But as a place to leave money for forty years, the survival tables say otherwise, and we are not going to hide the number.",
        },
        {
          title: "Money is not the only thing that accumulates",
          body: "Every correction a shop owner makes while using our product comes back as data only we hold. That asset appears on none of the charts on this page, and nobody sells it.",
        },
        {
          title: "The money circulates here",
          body: "A villa owned from abroad sends its rent out of Bali. A mine sends its output off the island. Software built here pays engineers who also live here. That is not a financial reason, and we will not pretend it is one.",
        },
      ],
      close: {
        label: "How to read it",
        body: "So the answer is not that software beats Bitcoin. Look at the third chart, it does not. The answer is that software is the engine that produces the money and Bitcoin is the tank the remainder sits in. Which one gets paid first is set out on the capital page.",
        link: "Where the capital goes",
      },
    },

    assumptions: {
      label: "08 · Assumptions & sources",
      heading: "Disagree with\nthe inputs, not the picture.",
      sub: "The first table holds every input behind the ten curves above. The second holds the published figures they are anchored to, with links. Change one input and the picture changes.",
      tableHeaders: [
        "Asset",
        "Rate per decade (%)",
        "Odds of surviving 40y",
        "Deepest fall",
        "A year, over 40y",
      ],
      note: "Read the decade rates in order: first decade, second, third, fourth. All are nominal, include income reinvested, and are before tax. Indonesian inflation keeps running underneath them, so the real figures are smaller than they look here.",
      sourcesLabel: "The figures they are anchored to",
      sourceHeaders: ["Figure", "What it measures", "Source"],
      sourceNote:
        "An anchor is not a forecast. It fixes a defensible starting scale for each curve; the rate at which each one decays per decade is still our assumption. One asset here has no anchor for its rate at all, AI software, because the company does not exist yet. Only its odds of surviving are anchored. The last six rows are a different kind of thing: they are measurements taken from the twenty-year window in section 02, not assumptions.",
      sources: {
        rppi: "Average annual rise in Indonesia's residential property price index, 2003 to 2025",
        rppiLow:
          "The same index in the fourth quarter of 2025, the slowest since the series began",
        inflation:
          "Indonesian inflation averaged over 2025, to read the nominal figures above against",
        baliCollapse:
          "Fall in foreign arrivals to Bali in 2020, from 6.3 million people in 2019",
        baliOccupancy:
          "Star-hotel occupancy in Bali, July 2026, the highest of any province",
        restoSurvival: "Restaurants still trading past their fifth year",
        restoMargin:
          "Restaurant net margin, in a range of three to five percent of revenue",
        coalPeak:
          "Newcastle thermal coal at its May 2022 peak, up from US$45 a tonne in September 2020",
        coalFall: "The fall in that price from the peak through 2026",
        btcReturn: "Bitcoin's annualised return over the last ten years",
        btcDrawdown: "Bitcoin's deepest fall from a peak, January 2015",
        dcCagr:
          "Forecast growth in Indonesia's data centre market to 2031. Other houses publish 8 to 20 percent",
        dcLoad:
          "Forecast growth in installed data centre power capacity to 2030",
        blsInfo: "Information-sector businesses still trading after five years",
        bls10: "All private-sector businesses still trading after ten years",
        ihsg20:
          "The IDX Composite annualised over twenty years, year-end 2005 to year-end 2025, before dividends",
        ihsgDrawdown:
          "The IDX Composite's deepest fall, from its January 2008 peak to its October 2008 low. It regained the peak in April 2010",
        sp50020:
          "The S&P 500 price index annualised over the same twenty years, in dollars, before dividends. With dividends reinvested the figure is 11.0 percent",
        gold20:
          "Gold annualised over the same twenty years, in dollars per troy ounce",
        goldDrawdown:
          "Gold's deepest fall, from its August 2011 peak to its December 2015 low. It did not regain that peak until July 2020",
        idrUsd20:
          "Average annual fall in the rupiah against the dollar over the same twenty years, from Rp9,806 to Rp16,709",
      },
    },

    legal: {
      label: "Legal note",
      items: [
        "This page compares the economic shape of different asset classes. It is not an investment offer, not a solicitation to buy securities, and not investment advice.",
        "Every curve here is computed from assumptions we wrote on this page. The figures they are anchored to are published by official sources; the curves are not. They are not measurements, not historical data, and not a promise of results.",
        "Past performance of any asset class does not guarantee future results. Land, villas, cafes, mines, data centres, Bitcoin, gold, stock indices, and shares in a private company can all fall sharply, and several of them can fall to zero.",
        "The twenty-year figures in section 02 are real year-end closing prices, not a model. They come from public market data: the IDX Composite, the S&P 500 price index, the dollar gold price per troy ounce, and the dollar to rupiah rate. Neither stock index there includes dividends, and the page states the size of that gap.",
        "Stock indices and gold appear here as a benchmark, not as a product we sell. We are not an investment manager, not a broker, and not a gold dealer.",
        "The Bitcoin referred to here is our own company treasury asset. We are not a crypto trading operator, we sell no crypto product, and we give no buy or sell advice to anyone.",
        "Crypto assets carry high risk and can fall sharply. Supervision sits with OJK, and tax is calculated under the rules in force at the time of the transaction.",
        "The business survival figures used here come from United States statistics, because no equivalent published series exists for Indonesia. We use them as they are rather than quietly adjusting them.",
      ],
    },

    cta: {
      heading: "Want to argue with the numbers?",
      body: "We open the assumptions, the model, and the measured figures that are not on this page.",
      label: "Book 15 minutes",
    },
    next: { label: "Next: where the capital goes", href: "/en/thesis/" },
  },
} as const

export function getHorizon(lang: Lang) {
  return content[lang] ?? content.id
}

export type Horizon = (typeof content)["id"]
