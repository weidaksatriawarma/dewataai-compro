/**
 * The forty-year comparison (`/horizon`).
 *
 * Seven ways to put money to work in Indonesia, on one axis, for forty years.
 *
 * Three rules govern this file, and they are the reason anyone would believe it.
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
 *
 * The shape of the argument matters more than any single rate. Raw, the
 * software curve is the steepest. Weighted by the odds of still owning a
 * working version of the thing in forty years, Bitcoin passes it and a cafe
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
] as const

export type SourceId = (typeof SOURCES)[number]["id"]

/* ============================ shared constants ============================ */

export const HORIZON = 40
export const BASE_INDEX = 100

/**
 * Fixed paint order, most-arguable first. Software leads because it is the
 * subject of the page, not because it wins.
 */
export const ASSETS = [
  "software",
  "bitcoin",
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
 * Seven series will not fit in seven greys. Only three steps stay reliably
 * tellable apart under colour vision deficiency and in print, so identity is a
 * pair: a step plus a stroke style. Three steps times three styles gives nine
 * distinct combinations for seven assets. Because the pair belongs to the asset
 * and never to its rank, hiding a line never repaints the others.
 *
 * All seven can be drawn at once, and the overlay chart opens that way. Seven
 * lines is a busy plot, which is why the stroke styles, the name at the end of
 * each line, the readout under the pointer and the table exist; the
 * small-multiples figure above it is the calmer way to read the same data.
 */
export type Stroke = "solid" | "dashed" | "dotted"
export const SERIES: Record<AssetKey, { step: 1 | 2 | 3; stroke: Stroke }> = {
  software: { step: 1, stroke: "solid" },
  bitcoin: { step: 2, stroke: "solid" },
  datacenter: { step: 2, stroke: "dashed" },
  hotel: { step: 2, stroke: "dotted" },
  cafe: { step: 3, stroke: "solid" },
  mining: { step: 3, stroke: "dashed" },
  land: { step: 3, stroke: "dotted" },
}

/** SVG stroke-dasharray per style. Empty string means an unbroken line. */
export const DASH: Record<Stroke, string> = {
  solid: "",
  dashed: "9 5",
  dotted: "2 5",
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
  mining: [0.1, 0.07, 0.05, 0.04],
  hotel: [0.09, 0.07, 0.055, 0.045],
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
 */
export const SURVIVAL: Record<AssetKey, number> = {
  software: 0.15,
  bitcoin: 0.6,
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
 */
export const MAX_DRAWDOWN: Record<AssetKey, number> = {
  software: -0.55,
  bitcoin: -0.853,
  datacenter: -0.45,
  cafe: -0.83,
  mining: -0.65,
  hotel: -0.83,
  land: -0.35,
}
export const RECOVERY_YEARS: Record<AssetKey, number> = {
  software: 4,
  bitcoin: 3,
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
    datacenter: 0,
    cafe: 1,
    mining: 0,
    hotel: 0,
    land: 0,
  },
  liquidity: {
    software: 1,
    bitcoin: 4,
    datacenter: 1,
    cafe: 1,
    mining: 2,
    hotel: 1,
    land: 1,
  },
  effort: {
    software: 4,
    bitcoin: 0,
    datacenter: 1,
    cafe: 3,
    mining: 1,
    hotel: 2,
    land: 0,
  },
  ceiling: {
    software: 4,
    bitcoin: 4,
    datacenter: 1,
    cafe: 1,
    mining: 0,
    hotel: 1,
    land: 1,
  },
  marginal: {
    software: 3,
    bitcoin: 4,
    datacenter: 1,
    cafe: 1,
    mining: 0,
    hotel: 1,
    land: 0,
  },
  data: {
    software: 4,
    bitcoin: 0,
    datacenter: 1,
    cafe: 1,
    mining: 0,
    hotel: 1,
    land: 0,
  },
  jobs: {
    software: 4,
    bitcoin: 0,
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

/** The multiple of the starting stake, e.g. "370" for 37,007. */
export function multiple(value: number, lang: Lang): string {
  const n = value / BASE_INDEX
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
    maximumFractionDigits: n < 10 ? 1 : 0,
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

/* ================================ content ================================ */

const content = {
  id: {
    meta: {
      title:
        "40 tahun: software AI vs tanah, villa, kafe, tambang, pusat data, Bitcoin",
      description:
        "Kenapa kami bangun software AI, bukan beli tanah, buka kafe, atau masuk tambang. Tujuh cara naruh duit di Indonesia, satu sumbu, 40 tahun, dipotong peluang gagal, lengkap sama sumber angkanya.",
    },
    figure: {
      prefix: "GBR.",
      status: "MODEL",
      statusTitle:
        "Angka model dari asumsi yang tertulis, bukan hasil pengukuran",
      table: "Lihat angkanya",
    },
    assets: {
      software: "Software AI",
      bitcoin: "Bitcoin",
      datacenter: "Pusat data",
      cafe: "Kafe & resto",
      mining: "Tambang",
      hotel: "Villa & hotel",
      land: "Tanah Bali",
    },

    eyebrow: "Horizon 40 tahun",
    heading: "Tujuh pilihan,\nempat puluh tahun.",
    lead: "Di Bali, duit yang nganggur lari ke tanah, villa, atau kafe. Di luar Bali, ke tambang. Sekarang ada yang baru, pusat data buat AI. Kami malah bangun software AI. Halaman ini naruh tujuh pilihan itu di satu sumbu, terus motong semuanya pakai peluang gagal masing-masing.",
    meta_:
      "Tiap kurva di sini model dari asumsi yang kami tulis sendiri, bukan hasil pengukuran dan bukan capaian kami. Angka jangkarnya dari lembaga resmi dan ada linknya di bawah.",

    statement: "Kurva paling curam\nbukan alasan kami milih.",

    why: {
      label: "01 · Pertanyaannya",
      heading: "Kenapa gak ikut\nbeli tanah aja?",
      body: [
        "Ini pertanyaan yang paling sering masuk, dan wajar. Di Bali, cerita orang kaya itu ceritanya tanah. Beli di Canggu belasan tahun lalu, sekarang harganya berkali lipat. Semua orang di sini kenal minimal satu orang kayak gitu.",
        "Versi lainnya juga sering: buka kafe, bangun villa, atau kalau modalnya gede, masuk tambang. Dua tahun terakhir muncul pilihan baru yang kedengeran paling nyambung sama kerjaan kami, yaitu bangun pusat data buat nampung AI orang lain.",
        "Kami gak bilang satu pun dari itu salah. Yang mau kami tunjukin bukan mana yang paling untung, tapi apa yang sebenernya kamu beli waktu milih salah satunya, dan apa yang berubah kalau jangkanya ditarik sampai empat puluh tahun.",
        "Empat puluh tahun dipilih bukan buat gaya-gayaan. Itu jarak yang bikin bunga berbunga kelihatan bentuk aslinya, dan cukup panjang buat nunjukin kalau yang nentuin hasil akhir bukan cuma seberapa cepet naiknya.",
      ],
    },

    curve: {
      label: "02 · Kurva mentah",
      heading: "Semua mulai\ndari angka seratus.",
      sub: "Tujuh aset, satu indeks, sumbu tegaknya logaritmik. Jarak yang sama artinya kelipatan yang sama, bukan selisih rupiah yang sama.",
      chart: {
        title: "Tujuh aset, satu sumbu, 40 tahun",
        unit: "indeks, mulai dari 100",
        xLabel: "Tahun",
        yLabel: "Indeks",
        scaleLabel: "Skala",
        log: "Logaritmik",
        linear: "Linier",
        horizonLabel: "Sampai tahun",
        readout: "Tahun",
        hint: "Klik namanya buat nampilin atau nyembunyiin garisnya. Geser di atas grafik buat baca angka semua aset di tahun itu.",
        capNote:
          "Tujuh garis sekaligus itu penuh. Warnanya cuma tiga tingkat abu, jadi bedanya dipegang juga sama ikon dan bentuk garis di daftarnya, nama di ujung garisnya, dan tabel di bawah. Kalau mau lebih tenang, matiin yang gak dibutuhin, atau baca angkanya satu tahun lewat penunjuk.",
        selectAll: "Pilih semua",
        clear: "Sisain software",
        srHint: "Pakai panah kiri dan kanan buat geser tahunnya.",
        tableHeaders: [
          "Tahun",
          "Software AI",
          "Bitcoin",
          "Pusat data",
          "Kafe & resto",
          "Tambang",
          "Villa & hotel",
          "Tanah Bali",
        ],
      },
      after:
        "Kalau berhenti di sini, kesimpulannya gampang: bangun software, kelar. Masalahnya kurva ini nganggep semua aset selamat sampai tahun ke-40. Buat tanah, itu asumsi yang masuk akal. Buat kafe dan buat perusahaan software yang baru mulai, itu asumsi yang salah banget.",
    },

    haircut: {
      label: "03 · Dipotong peluang gagal",
      heading: "Sekarang kali\npeluang selamatnya.",
      sub: "Tiap kurva dikali peluang kamu masih megang versi yang hidup di tahun ke-40. Buat usaha, keakuisisi tetep diitung selamat, soalnya pemiliknya tetep dibayar.",
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
        body: "Urutannya kebalik. Bitcoin lewat di atas software, dan kafe yang tadinya nomor empat jatuh ke paling bawah, tinggal balik modal doang. Dua-duanya bukan salah ketik dan bukan basa-basi merendah. Itu hasil langsung dari asumsi yang kami tulis sendiri, dan kami tampilin justru karena bagian inilah yang bisa ngubah pikiran orang.",
      },
      cafe: {
        label: "Soal kafe",
        body: "Angka kafe itu yang paling penting di halaman ini, dan paling gak enak dibaca. Dasarnya bukan pendapat kami, tapi tabel ketahanan usaha: cuma sekitar separuh restoran yang masih buka lewat tahun kelima, dan margin bersihnya rata-rata cuma segelintir persen dari omzet. Empat puluh tahun itu delapan kali lipat lima tahun.",
      },
    },

    drawdown: {
      label: "04 · Tahun terburuk",
      heading: "Bukan cuma\nseberapa tinggi.",
      sub: "Naik sekian persen rata-rata setahun itu angka yang enak dibaca. Tapi yang bikin orang jual di waktu paling salah bukan rata-ratanya, melainkan tahun terburuknya.",
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
        "Tanah kelihatan paling aman di grafik ini justru karena gak ada yang ngasih harganya tiap hari. Diem bukan berarti stabil.",
    },

    control: {
      label: "05 · Yang bisa dikendaliin",
      heading: "Kerja kamu\nngaruh gak?",
      sub: "Sampai sini semuanya soal angka. Yang di bawah ini yang sebenernya jadi alasan kami milih, dan dia gak nongol di kurva mana pun.",
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
        "Skala 0 sampai 4, dinilai dari kacamata orang yang mulai dari Bali tanpa modal dari luar. Empat artinya paling enak buat dia, bukan paling bagus secara umum. Kafe dapet nilai jelek di hampir semua baris dan nilai penuh di lapangan kerja, dan dua-duanya bener bareng.",
    },

    answer: {
      label: "06 · Jawabannya",
      heading: "Cuma satu garis\nyang nurut sama kerja.",
      items: [
        {
          title: "Tanah gak peduli kamu ngapain hari Senin",
          body: "Harga tanah di Canggu naik karena ada orang lain yang mau bayar lebih mahal. Kamu gak bisa bikin dia naik lebih cepet dengan kerja lebih keras. Bitcoin sama persis, dan harga batu bara juga. Semuanya aset yang kamu tungguin, bukan yang kamu garap.",
        },
        {
          title: "Software naik karena ada yang digarap",
          body: "Tiap fitur yang bener, tiap pelanggan yang batal berhenti, tiap harga yang dinaikin dan ternyata gak ada yang protes, itu semua langsung ngubah kemiringan garisnya. Bukan berarti lebih gampang. Berarti bisa diusahain.",
        },
        {
          title: "Pusat data itu AI, tapi tetep bangunan",
          body: "Ini pilihan yang paling deket sama kerjaan kami, dan tetep kami lewatin. Pusat data itu nyewain rak ke orang yang bikin AI. Dia punya dinding yang sama kayak hotel, cuma namanya megawatt bukan kamar, dan data yang lewat di dalamnya bukan punya dia.",
        },
        {
          title: "Kafe itu kerjaan, bukan aset",
          body: "Kafe ngasih kerjaan buat orang paling banyak dari semua pilihan di halaman ini, dan itu beneran berharga. Tapi sebagai tempat naruh duit empat puluh tahun, tabel ketahanannya bilang lain, dan kami gak mau nutupin angkanya.",
        },
        {
          title: "Yang numpuk bukan cuma duitnya",
          body: "Tiap koreksi yang dilakuin pemilik warung waktu makai produk kami balik lagi jadi data yang cuma kami yang punya. Aset itu gak nongol di grafik mana pun di halaman ini, dan gak ada yang jual.",
        },
        {
          title: "Duitnya muter balik ke sini",
          body: "Villa yang dibeli orang luar ngirim sewanya keluar Bali. Tambang ngirim hasilnya keluar pulau. Software yang dibangun di sini bayarin engineer yang tinggalnya juga di sini. Itu bukan alasan finansial, dan kami gak mau pura-pura itu alasan finansial.",
        },
      ],
      close: {
        label: "Bacanya gini",
        body: "Jadi jawabannya bukan software ngalahin Bitcoin. Liat grafik ketiga, dia enggak. Jawabannya: software itu mesin yang ngasilin duitnya, Bitcoin itu tangki tempat sisanya disimpen. Urutan siapa dibayar duluan ada di halaman ke mana modalnya.",
        link: "Ke mana modalnya",
      },
    },

    assumptions: {
      label: "07 · Asumsi & sumber",
      heading: "Kalau gak setuju,\nbantah angkanya.",
      sub: "Tabel pertama isinya semua input yang bikin tujuh kurva di atas. Tabel kedua isinya angka terbitan lembaga resmi yang jadi jangkarnya, lengkap sama linknya. Ganti satu input, gambarnya ikut ganti.",
      tableHeaders: [
        "Aset",
        "Naik per dekade (%)",
        "Peluang selamat 40 th",
        "Turun terdalam",
        "Per tahun, 40 th",
      ],
      note: "Naik per dekade dibaca urut: dekade pertama, kedua, ketiga, keempat. Semuanya nominal, udah termasuk pendapatan yang diputer balik, dan belum dipotong pajak. Inflasi Indonesia sendiri masih jalan, jadi angka nyatanya lebih kecil dari yang kelihatan di sini.",
      sourcesLabel: "Angka jangkarnya",
      sourceHeaders: ["Angka", "Yang diukur", "Sumber"],
      sourceNote:
        "Jangkar itu bukan ramalan. Dia cuma nentuin skala awal yang masuk akal buat tiap kurva; laju turunnya per dekade tetep asumsi kami. Satu aset di sini gak punya jangkar buat lajunya, yaitu software AI, soalnya perusahaannya belum ada. Yang berjangkar cuma peluang selamatnya.",
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
      },
    },

    legal: {
      label: "Catatan hukum",
      items: [
        "Halaman ini isinya perbandingan bentuk ekonomi antar jenis aset. Ini bukan penawaran investasi, bukan ajakan beli efek, dan bukan nasihat investasi.",
        "Semua kurva di sini hasil hitungan dari asumsi yang kami tulis sendiri di halaman ini. Angka jangkarnya terbitan lembaga resmi, tapi kurvanya bukan. Bukan hasil pengukuran, bukan data historis, dan bukan janji hasil.",
        "Kinerja masa lalu jenis aset apa pun gak menjamin hasil ke depan. Tanah, villa, kafe, tambang, pusat data, Bitcoin, dan saham perusahaan swasta semuanya bisa turun nilainya sampai nol.",
        "Bitcoin yang disebut di sini adalah aset kas perusahaan kami sendiri. Kami bukan pedagang kripto, gak jual produk kripto, dan gak ngasih saran beli atau jual ke siapa pun.",
        "Aset kripto risikonya tinggi dan bisa turun tajam. Pengawasannya ada di OJK, dan pajaknya ngikut aturan yang berlaku saat transaksi.",
        "Angka ketahanan usaha yang kami pakai berasal dari statistik Amerika Serikat, karena seri yang setara buat Indonesia belum diterbitkan. Kami pakai apa adanya dan gak nyesuaiin diam-diam.",
      ],
    },

    cta: {
      heading: "Mau bantah angkanya?",
      body: "Kami buka asumsinya, modelnya, dan angka terukur yang gak kami taruh di halaman ini.",
      label: "Ambil 15 menit",
    },
    next: { label: "Lanjut: ke mana modalnya", href: "/tesis/" },
  },

  en: {
    meta: {
      title:
        "Forty years: AI software against land, villas, cafes, mining, data centres, Bitcoin",
      description:
        "Why we build AI software instead of buying land, opening a cafe, or going into mining. Seven ways to put money to work in Indonesia on one axis for forty years, each cut by its own odds of failure, with every source linked.",
    },
    figure: {
      prefix: "FIG.",
      status: "MODEL",
      statusTitle: "Modelled from stated assumptions, not measured",
      table: "Show the numbers",
    },
    assets: {
      software: "AI software",
      bitcoin: "Bitcoin",
      datacenter: "Data centres",
      cafe: "Cafes & restaurants",
      mining: "Mining",
      hotel: "Villas & hotels",
      land: "Bali land",
    },

    eyebrow: "Forty-year horizon",
    heading: "Seven choices,\nforty years.",
    lead: "In Bali, spare capital goes into land, a villa, or a cafe. Outside Bali it goes into mining. Now there is a new option, a data centre for someone else's AI. We build AI software instead. This page puts those seven choices on one axis and then cuts each of them by its own odds of failure.",
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

    curve: {
      label: "02 · The raw curves",
      heading: "Everything starts\nat one hundred.",
      sub: "Seven assets, one index, a logarithmic vertical scale. Equal distance means equal multiple rather than equal rupiah.",
      chart: {
        title: "Seven assets, one axis, forty years",
        unit: "index, starting at 100",
        xLabel: "Year",
        yLabel: "Index",
        scaleLabel: "Scale",
        log: "Logarithmic",
        linear: "Linear",
        horizonLabel: "Through year",
        readout: "Year",
        hint: "Click a name to show or hide its line. Move across the chart to read every asset at that year.",
        capNote:
          "Seven lines at once is a full plot. There are only three grey steps, so identity is carried by the icon and stroke style in the legend, the name at the end of each line, and the table below. Switch off what you do not need, or read any single year off the pointer.",
        selectAll: "Show all",
        clear: "Software only",
        srHint: "Use the left and right arrow keys to move through the years.",
        tableHeaders: [
          "Year",
          "AI software",
          "Bitcoin",
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
      label: "03 · Cut by the odds of failure",
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
        body: "The order flips. Bitcoin passes software, and the cafe drops from fourth to last, worth roughly the money that went in. Neither is a typo and neither is false modesty. Both fall straight out of the assumptions we wrote ourselves, and we show them because this is the half that would change a reader's mind.",
      },
      cafe: {
        label: "About the cafe",
        body: "The cafe figure is the most important number on this page and the least comfortable one. It is not our opinion: it rests on the business survival tables, where only about half of restaurants are still trading past their fifth year, and on a net margin that averages a few percent of revenue. Forty years is eight of those five-year windows in a row.",
      },
    },

    drawdown: {
      label: "04 · The worst year",
      heading: "Not only\nhow high.",
      sub: "An average annual rate is a comfortable number to read. What makes people sell at the worst possible moment is not the average, it is the worst year.",
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
      label: "05 · What you can steer",
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
      label: "06 · The answer",
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
      label: "07 · Assumptions & sources",
      heading: "Disagree with\nthe inputs, not the picture.",
      sub: "The first table holds every input behind the seven curves above. The second holds the published figures they are anchored to, with links. Change one input and the picture changes.",
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
        "An anchor is not a forecast. It fixes a defensible starting scale for each curve; the rate at which each one decays per decade is still our assumption. One asset here has no anchor for its rate at all, AI software, because the company does not exist yet. Only its odds of surviving are anchored.",
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
      },
    },

    legal: {
      label: "Legal note",
      items: [
        "This page compares the economic shape of different asset classes. It is not an investment offer, not a solicitation to buy securities, and not investment advice.",
        "Every curve here is computed from assumptions we wrote on this page. The figures they are anchored to are published by official sources; the curves are not. They are not measurements, not historical data, and not a promise of results.",
        "Past performance of any asset class does not guarantee future results. Land, villas, cafes, mines, data centres, Bitcoin, and shares in a private company can all fall to zero.",
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
