/**
 * The vision page: who we are building for, why the company is bootstrapped,
 * and what Bali has to do with any of it.
 *
 * Copy rule for this file: one idea per block, one or two short sentences per
 * body. If a paragraph needs a third sentence it belongs somewhere else.
 */

import type { Lang } from "@/lib/i18n"

/**
 * The one number this page is built around, and the arithmetic behind it, kept
 * next to each other so nobody has to take it on faith.
 *
 * Two caveats, both printed on the page: religion is a proxy for ethnicity
 * rather than the same thing, and the generation share comes from the 2020
 * census while the population total is 2024. This is an order of magnitude,
 * not a headcount.
 */
export const BALI = {
  population: 4_360_000,
  hinduShare: 0.865,
  genZShare: 0.261,
  sources: [
    {
      label: "BPS Provinsi Bali",
      note: "Penduduk Bali, 2024",
      href: "https://bali.bps.go.id/en/statistics-table/3/V1ZSbFRUY3lTbFpEYTNsVWNGcDZjek53YkhsNFFUMDkjMw==/jumlah-penduduk--laju-pertumbuhan-penduduk--distribusi-persentase-penduduk--kepadatan-penduduk--rasio-jenis-kelamin-penduduk-menurut-kabupaten-kota-di-provinsi-bali--2024.html",
    },
    {
      label: "BPS Provinsi Bali",
      note: "Penduduk menurut agama, sensus 2024",
      href: "https://bali.bps.go.id/en/statistics-table/1/MTg5IzE=/penduduk-provinsi-bali-menurut-agama-yang-dianut-hasil-sensus-penduduk-1971--2000--2010--dan-2024.html",
    },
    {
      label: "BPS, Sensus Penduduk 2020",
      note: "Komposisi generasi penduduk Bali",
      href: "https://bali.bps.go.id/en",
    },
  ],
} as const

/** Roughly how many Balinese Hindu Gen Z there are. */
export const baliGenZ = Math.round(BALI.population * BALI.hinduShare * BALI.genZShare)

const content = {
  id: {
    meta: {
      title: "Visi Dewata AI: Bali bikin teknologinya sendiri",
      description:
        "Kami bootstrap, dan itu pilihan. Kenapa anak muda Bali harus masuk industri teknologi, bukan cuma melayani pariwisata, dan apa yang lagi kami kerjain sekarang.",
    },
    eyebrow: "Visi",
    heading: "Bali gak cuma\nbuat melayani.",
    lead: "Pariwisata ngasih kerjaan. Teknologi ngasih kepemilikan. Kami mau anak Bali dapat dua-duanya.",
    meta_: "Perusahaan bootstrap. Modal sendiri, keputusan sendiri.",

    statement: "Kecil sekarang.\nBukan berarti kecil terus.",

    numbers: {
      label: "00 · Angkanya",
      heading: "Sekitar sejuta orang.\nItu ukuran taruhannya.",
      lead: "Bukan pasar. Ini jumlah anak muda Bali Hindu yang lagi milih mau jadi apa sepuluh tahun ke depan.",
      stats: [
        { value: "4,36 jt", label: "Penduduk Bali", year: "2024" },
        { value: "86,5%", label: "Beragama Hindu", year: "2024" },
        { value: "26,1%", label: "Generasi Z", year: "Sensus 2020" },
      ],
      resultLabel: "Perkiraan Gen Z Bali Hindu",
      method:
        "Dikali gitu aja: penduduk Bali kali persentase Hindu kali persentase Gen Z. Dua hal yang perlu kamu tahu sebelum pakai angka ini: agama itu perkiraan kasar buat etnis, bukan hal yang sama, dan persentase generasinya dari Sensus 2020 sementara jumlah penduduknya 2024. Jadi ini besaran, bukan hitungan kepala.",
      sourcesLabel: "Sumber",
    },


    now: {
      label: "01 · Posisi",
      heading: "Yang jalan, yang dibangun,\nyang berikutnya.",
      sub: "Ditulis apa adanya, biar gampang dicek setahun lagi.",
      columns: [
        {
          key: "live",
          title: "Yang jalan",
          items: ["Dewata Tech: booking direct buat villa", "Dagangku AI: pembukuan lewat chat"],
        },
        {
          key: "building",
          title: "Yang lagi dibangun",
          items: [
            "Aktivasi Dagangku, biar yang daftar beneran nyatet",
            "Kanal WhatsApp, biar nyatet gak usah buka aplikasi",
            "Alat ukur model pakai koreksi pengguna sendiri",
          ],
        },
        {
          key: "next",
          title: "Yang berikutnya",
          items: [
            "Buku besar tersambung antar usaha",
            "Coretax dan e-Faktur beneran, bukan ekspor CSV",
            "Usaha ketiga di keselamatan publik",
          ],
        },
      ],
    },

    bootstrap: {
      label: "02 · Bootstrap",
      heading: "Modal sendiri,\nkeputusan sendiri.",
      body: "Kami gak lagi nyari investor. Pendanaan luar bikin jam kerja kami dimiliki orang lain, dan produk kami butuh sabar yang lebih panjang dari kesabaran uang cepat.",
      points: [
        {
          title: "Pelanggan yang danai",
          body: "Yang bayar produk kami itu yang nentuin arah, bukan yang punya kursi rapat.",
        },
        {
          title: "Kecil itu cepat",
          body: "Satu orang bisa mutusin, ngirim, dan benerin di hari yang sama.",
        },
        {
          title: "Kalau ada yang mau masuk",
          body: "Pintunya kebuka buat orang yang ngerti sabar. Tapi kami gak lagi nyari.",
        },
      ],
    },

    bali: {
      label: "03 · Bali",
      heading: "Bikin teknologinya,\nbukan cuma pakai.",
      body: [
        "Ekonomi Bali nempel ke pariwisata. Pas turis berhenti datang, semua orang tahu rasanya. Teknologi itu kaki kedua yang gak ikut goyang pas kaki pertama goyang.",
        "Anak Bali gak harus jadi penonton di industri ini. Bisa jadi yang bangun, yang punya, dan yang milih arahnya.",
      ],
      ladder: [
        { step: "01", title: "Kerja di teknologi", body: "Bukan cuma ngelayani, tapi ngebangun." },
        { step: "02", title: "Naik jadi yang mimpin", body: "Yang mutusin produknya mau ke mana." },
        { step: "03", title: "Bikin perusahaan sendiri", body: "Punya produknya, bukan cuma ngerjain." },
        { step: "04", title: "Balik jadi yang danai", body: "Uangnya muter di Bali, bukan keluar." },
      ],
      close:
        "Kami bukan siapa-siapa buat nyuruh. Kami cuma mau nunjukkin jalurnya ada, dari Denpasar, tanpa pindah ke Jakarta.",
    },

    market: {
      label: "04 · Prospeknya",
      heading: "Kenapa pasarnya\nmasih kebuka.",
      sub: "Tiga alasan yang kami pakai, dan satu yang bikin kami hati-hati.",
      items: [
        {
          title: "UMKM-nya kebanyakan belum pegang pembukuan",
          body: "Indonesia punya puluhan juta usaha mikro. Sebagian besar catatannya masih di kepala.",
        },
        {
          title: "Kepatuhan makin ketat",
          body: "Pajak dan pelaporan makin digital. Usaha yang catatannya berantakan bakal kena duluan.",
        },
        {
          title: "Harga model AI turun tiap tahun",
          body: "Yang tahun lalu kemahalan buat warung, tahun ini jadi masuk akal.",
        },
      ],
      caution: {
        title: "Yang bikin kami hati-hati",
        body: "Pasar gede bukan berarti gampang. Yang susah bukan nemuin usahanya, tapi bikin mereka nyatet tiap hari.",
      },
    },

    cta: {
      heading: "Anak Bali yang mau bangun?",
      body: "Kirim aja. Gak harus punya gelar, yang penting pernah bikin sesuatu sampai jadi.",
      label: "Ngobrol 15 menit",
    },
  },

  en: {
    meta: {
      title: "Dewata AI vision: Bali building its own technology",
      description:
        "We are bootstrapped, and that is a choice. Why young Balinese should move into technology instead of only serving tourism, and what we are building right now.",
    },
    eyebrow: "Vision",
    heading: "Bali is not only\na place that serves.",
    lead: "Tourism gives Bali jobs. Technology gives Bali ownership. We want young Balinese to have both.",
    meta_: "A bootstrapped company. Our own money, our own decisions.",

    statement: "Small now.\nNot small forever.",

    numbers: {
      label: "00 · The number",
      heading: "About a million people.\nThat is the size of it.",
      lead: "Not a market. That is how many young Balinese Hindus are deciding right now what they will be in ten years.",
      stats: [
        { value: "4.36M", label: "People in Bali", year: "2024" },
        { value: "86.5%", label: "Hindu", year: "2024" },
        { value: "26.1%", label: "Generation Z", year: "2020 census" },
      ],
      resultLabel: "Estimated Balinese Hindu Gen Z",
      method:
        "Plain multiplication: Bali's population times the Hindu share times the Gen Z share. Two things to know before using it: religion is a rough proxy for ethnicity rather than the same thing, and the generation share is from the 2020 census while the population total is 2024. So this is an order of magnitude, not a headcount.",
      sourcesLabel: "Sources",
    },


    now: {
      label: "01 · Where we are",
      heading: "Running, building,\nand next.",
      sub: "Written plainly, so it is easy to check a year from now.",
      columns: [
        {
          key: "live",
          title: "Running",
          items: ["Dewata Tech: direct bookings for villas", "Dagangku AI: bookkeeping over chat"],
        },
        {
          key: "building",
          title: "Being built",
          items: [
            "Activation, so people who sign up actually record",
            "The WhatsApp channel, so recording needs no app",
            "Model evaluation built on real user corrections",
          ],
        },
        {
          key: "next",
          title: "Next",
          items: [
            "Connected ledgers between businesses",
            "Real Coretax and e-Faktur, not a CSV export",
            "A third venture in public safety",
          ],
        },
      ],
    },

    bootstrap: {
      label: "02 · Bootstrapped",
      heading: "Our own money,\nour own decisions.",
      body: "We are not looking for investors. Outside funding hands part of our week to someone else, and this product needs more patience than fast money has.",
      points: [
        {
          title: "Customers fund it",
          body: "The people paying for the product set the direction, not the people holding board seats.",
        },
        {
          title: "Small is fast",
          body: "One person can decide, ship, and fix it the same day.",
        },
        {
          title: "If someone wants in",
          body: "The door is open to people who understand patience. But we are not out looking.",
        },
      ],
    },

    bali: {
      label: "03 · Bali",
      heading: "Build the technology,\ndo not just use it.",
      body: [
        "Bali's economy is bolted to tourism. When visitors stop arriving, everyone here learns what that feels like. Technology is a second leg that does not wobble when the first one does.",
        "Balinese do not have to be spectators in this industry. They can be the ones who build it, own it, and choose where it goes.",
      ],
      ladder: [
        { step: "01", title: "Work in technology", body: "Not only serving it, building it." },
        { step: "02", title: "Move up to leading", body: "Deciding where a product goes." },
        { step: "03", title: "Start the company", body: "Owning the product, not just the task." },
        { step: "04", title: "Come back as the funder", body: "The money circulates in Bali instead of leaving." },
      ],
      close:
        "We are nobody to be telling anyone what to do. We just want to show the path exists, from Denpasar, without moving to Jakarta.",
    },

    market: {
      label: "04 · The outlook",
      heading: "Why the market\nis still open.",
      sub: "Three reasons we act on, and one that keeps us careful.",
      items: [
        {
          title: "Most small businesses keep no books",
          body: "Indonesia has tens of millions of micro businesses. Most of their records live in someone's head.",
        },
        {
          title: "Compliance keeps tightening",
          body: "Tax and reporting keep going digital. Businesses with messy records feel it first.",
        },
        {
          title: "Model pricing falls every year",
          body: "What was too expensive for a corner shop last year becomes reasonable this year.",
        },
      ],
      caution: {
        title: "What keeps us careful",
        body: "A large market is not an easy one. The hard part is not finding the businesses, it is getting them to record every day.",
      },
    },

    cta: {
      heading: "Balinese and want to build?",
      body: "Send us a message. No degree required, just something you have actually finished.",
      label: "Book 15 minutes",
    },
  },
} as const

export function getVision(lang: Lang) {
  return content[lang] ?? content.id
}

export type Vision = (typeof content)["id"]
