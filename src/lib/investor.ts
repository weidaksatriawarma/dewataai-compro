/**
 * Investor-facing content: the leverage case (`/investor`) and the capital
 * thesis (`/tesis`).
 *
 * Two rules govern this file, and they are the reason anyone would believe it.
 *
 * 1. NUMBERS LIVE HERE ONCE. Both locales read the same constants, so the
 *    Indonesian and English pages can never quote different figures. Only
 *    labels are translated.
 * 2. EVERY NUMBER IS A STATED MODEL, NOT A MEASUREMENT. These are illustrative
 *    structures with their assumptions printed on the page next to them, not
 *    survey data and not our own trading results. Nothing internal to Dagangku
 *    (cost per AI credit, the margin floor, live traction) is published here;
 *    that lives in the Dagangku repo and is shared in person.
 *
 * If a number changes, change it in the constants below. Never restate a figure
 * inside a copy string.
 */

import type { Lang } from "@/lib/i18n"

/* ============================ shared constants ============================ */

/** Rupiah of capital needed to add roughly Rp100 million of monthly revenue. */
export const CAPITAL_TO_SCALE = [
  { key: "villa", value: 2_500_000_000 },
  { key: "resto", value: 800_000_000 },
  { key: "software", value: 253_000_000 },
] as const

/**
 * Where every Rp1,000,000 of revenue goes, on one shared four-part schema so
 * the three columns are actually comparable. Each column sums to 100.
 */
export const COST_SHARE_SCHEMA = ["serve", "fixed", "acquire", "left"] as const
export type CostShareKey = (typeof COST_SHARE_SCHEMA)[number]

export const COST_SHARE: Record<string, Record<CostShareKey, number>> = {
  villa: { serve: 22, fixed: 28, acquire: 18, left: 32 },
  resto: { serve: 40, fixed: 40, acquire: 10, left: 10 },
  software: { serve: 20, fixed: 40, acquire: 25, left: 15 },
}

/**
 * Capacity curve. `x` is demand as an index where 100 = the physical room or
 * seat inventory being completely full; `y` is revenue on the same index.
 * A villa stops at its inventory. Software does not have that particular wall.
 */
export const CAPACITY_CEILING = 100
export const CAPACITY_CURVE = [0, 25, 50, 75, 100, 125, 150, 175, 200].map((x) => ({
  x,
  physical: Math.min(x, CAPACITY_CEILING),
  software: x,
}))

/** Blended subscription revenue per paying customer per month, in rupiah. */
export const BLENDED_ARPU = 250_000

/** Paying customers at the end of each year, by scenario. Model, not forecast. */
export const PROJECTION_YEARS = [1, 2, 3, 4, 5] as const
export const PROJECTION = {
  low: [60, 150, 280, 400, 500],
  base: [150, 450, 1_000, 1_800, 2_500],
  high: [300, 1_100, 2_800, 5_200, 8_000],
} as const

/** Annual recurring revenue in rupiah for a given customer count. */
export const arr = (customers: number) => customers * BLENDED_ARPU * 12

/**
 * Short rupiah label, e.g. "Rp2,5 miliar". The scale words come from the copy
 * so both locales stay translatable, while the digits stay derived from the
 * constants above and can never drift from them.
 */
export function rupiahShort(
  value: number,
  lang: Lang,
  words: { billion: string; million: string },
) {
  const locale = lang === "en" ? "en-US" : "id-ID"
  const fmt = (n: number, digits: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(n)
  return value >= 1_000_000_000
    ? `Rp${fmt(value / 1_000_000_000, 1)} ${words.billion}`
    : `Rp${fmt(value / 1_000_000, 0)} ${words.million}`
}

/* ================================ content ================================ */

const content = {
  id: {
    investor: {
      meta: {
        title: "Kenapa software AI: bandingan vs villa dan restoran",
        description:
          "Villa nambah pendapatan dengan beli kamar lagi. Software nambah pendapatan dengan nemu pelanggan berikutnya. Bandingan modal, margin, dan batas kapasitasnya.",
      },
      figure: {
        prefix: "GBR.",
        status: "MODEL",
        statusTitle: "Angka model, bukan hasil pengukuran",
        table: "Lihat angkanya",
      },
      eyebrow: "Investor",
      heading: "Bentuk ekonominya\nyang beda.",
      lead: "Villa dan restoran itu bisnis bagus. Yang beda bukan bagus atau enggaknya, tapi apa yang harus dibeli tiap kali mau nambah pendapatan. Halaman ini ngebuka bandingannya, lengkap sama asumsinya.",
      meta_: "Semua angka di sini model ya, bukan hasil survei dan bukan capaian kami.",

      thesis: {
        label: "Intinya",
        heading: "Aset fisik naik lewat modal.\nSoftware naik lewat distribusi.",
        body: [
          "Villa nambah cuan dengan cara beli kamar lagi. Restoran nambah cuan dengan cara buka outlet lagi. Dua-duanya butuh modal gede di depan, dan modal itu susah ditarik balik kalau ternyata salah langkah.",
          "Software nambah cuan dengan cara nemu pelanggan berikutnya. Biayanya bisa disetop bulan depan kalau angkanya jelek. Bukan berarti lebih gampang ya, cuma bentuk risikonya yang beda.",
        ],
      },

      statement: "Pembukuannya\nyang jadi produknya.",

      record: {
        label: "01 · Cara mikir",
        heading: "Sistem pencatatan,\nbukan alat bantu.",
        sub: "Tiga hal ini kami ambil dari cara Palantir mikirin data dan cara Anduril mikirin kepemilikan produk, terus kami pasang di ukuran warung.",
        items: [
          {
            index: "I",
            title: "Yang megang catatan resminya, gak diganti",
            body: "Alat bantu gampang dilepas. Tapi sistem yang nyimpen kwitansi bernomor urut, stok, utang, gaji, sama laporan pajak itu udah jadi catatan resmi usahanya. Ninggalin dia berarti ninggalin riwayat usaha sendiri.",
          },
          {
            index: "II",
            title: "Satu peta buat satu usaha",
            body: "Produk, pelanggan, supplier, harga per pelanggan, kasbon, karyawan, dan aset gak kami simpen sebagai tabel yang kepisah-pisah, tapi sebagai satu peta yang nyambung. Pertanyaan kayak produk mana yang diam-diam bikin rugi cuma bisa dijawab kalau petanya nyambung.",
          },
          {
            index: "III",
            title: "Kami duduk bareng yang makai",
            body: "Fitur lahir dari duduk di warung orang, liat dia salah ngetik, terus dibenerin. Bukan dari rapat. Tiap koreksi yang dia lakuin balik lagi jadi data buat ngukur model mana yang paling ngerti bahasa dia.",
          },
        ],
      },

      capital: {
        label: "02 · Modal",
        heading: "Modal buat nambah\nRp100 juta per bulan.",
        sub: "Berapa duit yang harus keluar duluan sebelum tambahan cuan itu ada.",
        chart: {
          title: "Modal yang dibutuhkan",
          unit: "rupiah",
          units: { billion: "miliar", million: "juta" },
          items: {
            villa: "Villa 4 kamar",
            resto: "Restoran 40 kursi",
            software: "Software langganan",
          },
          notes: {
            villa: "Satu villa lagi, tanah plus bangunan",
            resto: "Satu outlet lagi, sewa plus renovasi plus alat",
            software: "505 pelanggan Pro, lewat biaya akuisisi",
          },
          tableHeaders: ["Usaha", "Modal", "Bentuknya"],
        },
        after:
          "Yang gak kelihatan di grafik: dua batang pertama itu belanja aset yang nempel selamanya. Batang ketiga itu biaya akuisisi yang bisa disetop bulan depan, dan kalau disetop pun, pelanggan yang udah ada tetap bayar.",
      },

      share: {
        label: "03 · Struktur biaya",
        heading: "Ke mana tiap sejuta\npendapatan pergi.",
        sub: "Empat pos yang sama buat ketiganya, biar bisa ditumpuk terus dibandingin.",
        chart: {
          title: "Alokasi tiap Rp1.000.000 pendapatan",
          unit: "persen",
          columns: {
            villa: "Villa 4 kamar",
            resto: "Restoran 40 kursi",
            software: "Software langganan",
          },
          segments: {
            serve: "Biaya melayani",
            fixed: "Biaya tetap operasi",
            acquire: "Cari pelanggan",
            left: "Sisa buat pemilik",
          },
          tableHeaders: ["Pos", "Villa", "Restoran", "Software"],
        },
        after:
          "Restoran keliatan paling berat karena bahan baku sama gaji ikut naik tiap ada tamu tambahan. Villa jauh lebih lega, dan bakal makin lega kalau komisi OTA-nya hilang. Itu persis yang dikerjain Dewata Tech.",
      },

      ceiling: {
        label: "04 · Batas kapasitas",
        heading: "Yang berhenti\ndi tembok.",
        sub: "Permintaan naik dua kali lipat. Yang satu ikut naik, yang satu mentok di jumlah kamarnya.",
        chart: {
          title: "Pendapatan kalau permintaan naik",
          xLabel: "Permintaan (100 = kamar penuh)",
          yLabel: "Pendapatan (indeks)",
          physical: "Villa atau restoran",
          software: "Software langganan",
          ceilingLabel: "Kamar habis",
          tableHeaders: ["Permintaan", "Aset fisik", "Software"],
        },
        after:
          "Villa yang penuh gak bisa nerima tamu kelima di kamar keempat, berapa pun tamunya mau bayar. Buat lewatin garis itu harus beli villa lagi, balik ke grafik pertama. Software gak punya tembok yang itu. Temboknya ada di distribusi, dan tembok distribusi bisa didorong tanpa beli tanah.",
      },

      fair: {
        label: "05 · Yang jujur",
        heading: "Yang lebih unggul\ndi villa dan restoran.",
        sub: "Kalau bagian ini gak ditulis, tiga bagian sebelumnya gak pantes dipercaya.",
        items: [
          {
            title: "Permintaannya udah ada dari hari pertama",
            body: "Villa di Bali gak perlu ngeyakinin orang bahwa nginep itu perlu. Software harus ngeyakinin orang bahwa nyatet itu perlu, dan itu pekerjaan yang jauh lebih berat.",
          },
          {
            title: "Asetnya nahan nilai",
            body: "Tanah dan bangunan masih ada nilainya walau usahanya gagal. Software yang gagal nilainya nol, kecuali datanya kepakai.",
          },
          {
            title: "Kasnya masuk dari bulan pertama",
            body: "Villa buka, tamu bayar. Software langganan butuh waktu sebelum jumlah pelanggannya nutup biaya tetap.",
          },
          {
            title: "Lebih gampang dijaminkan ke bank",
            body: "Bank ngerti kalau jaminannya properti. Bank belum tentu ngerti duit langganan yang masuk tiap bulan.",
          },
        ],
      },

      assumptions: {
        label: "Asumsi",
        heading: "Angkanya dari mana.",
        sub: "Ini model buat gambaran, bukan survei. Ganti asumsinya, angkanya ikut berubah.",
        groups: [
          {
            title: "Villa 4 kamar di Bali",
            items: [
              "Tarif rata-rata Rp1.500.000 per malam, okupansi 60 persen",
              "Pendapatan bulanan sekitar Rp108 juta",
              "Komisi OTA rata-rata 18 persen dari kamar yang dipesan lewat OTA",
              "Modal satu villa baru Rp2,5 miliar termasuk tanah",
            ],
          },
          {
            title: "Restoran 40 kursi",
            items: [
              "Dua kali putaran meja per hari, keterisian 60 persen",
              "Rata-rata belanja per tamu Rp85.000",
              "Bahan baku 33 persen, tenaga kerja 25 persen, sewa 12 persen",
              "Modal satu outlet baru Rp800 juta termasuk sewa di depan dan alat",
            ],
          },
          {
            title: "Software langganan",
            items: [
              "Harga publik Paket Pro Rp198.000 per bulan, Paket Tim Rp600.000 per bulan",
              "Pendapatan campuran per pelanggan Rp250.000 per bulan setelah bauran paket dan diskon tahunan",
              "Biaya akuisisi per pelanggan Rp500.000",
              "Biaya melayani satu pelanggan tambahan sekitar 20 persen dari harganya",
            ],
          },
        ],
        note: "Yang gak ada di halaman ini: biaya AI per pesan, lantai margin, dan jumlah pelanggan berbayar hari ini. Itu angka internal, dan kami bawa pas ketemu langsung.",
      },

      legal: {
        label: "Catatan hukum",
        items: [
          "Halaman ini informasi tentang perusahaan, bukan penawaran investasi dan bukan ajakan membeli efek.",
          "Kami gak melakukan penawaran umum efek. Penawaran umum di Indonesia diatur undang undang pasar modal dan diawasi OJK, dan kami gak terdaftar untuk itu.",
          "Angka di halaman ini proyeksi berbasis asumsi yang ditulis terbuka, bukan janji hasil.",
        ],
      },

      cta: {
        heading: "Mau angka yang beneran, bukan model?",
        body: "Traksi terukur, biaya akuisisi, sama retensi kami buka langsung pas ngobrol.",
        label: "Ngobrol 15 menit",
      },
      next: { label: "Lanjut ke tesis investasi", href: "/tesis/" },
    },

    thesis: {
      meta: {
        title: "Tesis investasi Dewata AI: produk AI dulu, sisanya Bitcoin",
        description:
          "Urutan klaim atas kas: cadangan 12 bulan, produk AI, distribusi, baru sisa kas ke Bitcoin. Plus proyeksi lima tahun tiga skenario dan risikonya.",
      },
      eyebrow: "Tesis investasi",
      heading: "Ke mana\nmodalnya pergi.",
      lead: "Dua tempat, dan urutannya gak pernah dibalik. Produk AI dulu sampai kenyang, sisa kas yang beneran nganggur baru ke Bitcoin.",
      meta_: "Proyeksi di sini model bertingkat, bukan janji manis.",

      statement: "Produk dulu.\nSelalu.",

      order: {
        label: "01 · Urutan",
        heading: "Kas dibagi\nberurutan.",
        sub: "Tiap tingkat harus penuh dulu sebelum yang bawahnya kebagian. Gak ada yang boleh nyerobot antrean.",
        steps: [
          {
            index: "01",
            title: "Operasi dan cadangan 12 bulan",
            body: "Gaji, server, sama tagihan setahun penuh disisihin duluan. Perusahaan yang mati gara-gara kas abis gak sempet buktiin apa-apa.",
          },
          {
            index: "02",
            title: "Bangun produk AI",
            body: "Ini yang pertama dapet jatah dari duit buat tumbuh. Aktivasi, kanal WhatsApp, sama alat buat ngukur model. Semuanya diarahin ke satu angka: jumlah usaha aktif dikali seberapa sering mereka nyatet.",
          },
          {
            index: "03",
            title: "Distribusi",
            body: "Satu kanal akuisisi yang angkanya terukur, dipompa sampai batas di mana biayanya masih masuk akal. Bukan lima kanal yang dicoba-coba.",
          },
          {
            index: "04",
            title: "Sisa kas ke Bitcoin",
            body: "Cuma kas yang beneran nganggur setelah tiga tingkat di atas. Bukan modal kerja, bukan duit gaji, dan gak pernah pakai utang.",
          },
        ],
      },

      btc: {
        label: "02 · Bitcoin",
        heading: "Aturannya ditulis\nsebelum harganya gerak.",
        body: [
          "Kami pegang Bitcoin sebagai tempat parkir kas jangka panjang, bukan sebagai sumber pendapatan dan bukan sebagai bahan trading. Alasannya sederhana: pasokannya terbatas dan gak ada yang bisa nambahin sepihak, padahal rupiah yang nganggur di rekening pasti kegerus.",
          "Kenapa aturannya ditulis di depan: kalau aturan treasury baru dibikin pas harga lagi gerak, yang nulis bukan kebijakan, tapi emosi.",
        ],
        rules: [
          { title: "Cuma dari surplus", body: "Setelah cadangan 12 bulan aman. Kalau cadangannya kurang, bulan itu jatahnya nol." },
          { title: "Gak pernah pakai utang", body: "Gak ada margin, gak ada pinjaman buat beli, gak ada agunan kripto." },
          { title: "Beli bertahap, bukan sekali besar", body: "Nominal tetap tiap bulan, gak sok nebak waktu masuk." },
          { title: "Bukan buat ditradingkan", body: "Gak ada target jual, gak ada leverage. Kalau butuh kas, produknya yang jadi sumber." },
          { title: "Pajak dan pencatatan ikut aturan", body: "Kepemilikan masuk pembukuan perusahaan dan pajaknya dihitung sesuai aturan yang berlaku saat transaksi." },
          { title: "Gak pernah dijual ke pelanggan", body: "Kami gak nawarin produk kripto, gak ngasih saran beli, dan gak ada kaitannya sama Dagangku AI." },
        ],
        note: "Kami sengaja gak nampilin proyeksi harga Bitcoin. Harganya gak bisa diramal, dan grafik ramalan harga cuma bikin pembaca ngira ada yang dijanjikan.",
      },

      projection: {
        label: "03 · Proyeksi",
        heading: "Lima tahun,\ntiga skenario.",
        sub: "Yang digerakin cuma satu angka: berapa usaha yang bayar. Sisanya tinggal ngikut.",
        chart: {
          title: "Pendapatan berulang tahunan",
          units: { billion: "miliar", million: "juta" },
          xLabel: "Tahun",
          yLabel: "Pendapatan berulang tahunan",
          axisUnit: "Rp miliar",
          low: "Pesimis",
          base: "Dasar",
          high: "Optimis",
          customersLabel: "pelanggan berbayar",
          tableHeaders: ["Tahun", "Pesimis", "Dasar", "Optimis"],
        },
        after:
          "Skenario optimis itu 8.000 usaha berbayar. Indonesia punya sekitar 65 juta UMKM, jadi angka itu 0,012 persen dari pasarnya. Yang bikin susah bukan besarnya pasar, tapi aktivasi: bikin orang yang udah daftar beneran nyatet tiap hari.",
        honest: {
          label: "Yang perlu diluruskan",
          body: "Grafik di atas model, bukan capaian. Kami gak nampilin jumlah pelanggan berbayar hari ini di halaman publik, tapi kami buka apa adanya pas ketemu, bareng biaya akuisisi sama retensinya.",
        },
      },

      risk: {
        label: "04 · Risiko",
        heading: "Yang bisa\nbikin ini gagal.",
        items: [
          {
            title: "Aktivasi gak naik",
            body: "Kebanyakan yang daftar berhenti sebelum nyatet apa-apa. Kalau ini gak berubah, semua aset data tumbuhnya pelan dan proyeksi di atas gak bakal kejadian.",
          },
          {
            title: "Harga model AI berubah",
            body: "Biaya per pesan ngikutin harga penyedia model. Kami bikin biar gampang pindah model, tapi kalau harganya naik barengan, marginnya kena.",
          },
          {
            title: "Aturan data berubah",
            body: "UU PDP jalan tanpa lembaga pengawasnya. Peraturan pelaksana yang terbit belakangan bisa lebih ketat dari yang kami pakai sekarang.",
          },
          {
            title: "Bitcoin turun dalam",
            body: "Nilai treasury bisa anjlok dan lama baliknya. Makanya alokasinya cuma dari surplus, biar harga turun gak pernah nyentuh gaji atau server.",
          },
        ],
      },

      legal: {
        label: "Catatan hukum",
        items: [
          "Halaman ini informasi tentang kebijakan modal perusahaan, bukan penawaran investasi, bukan ajakan membeli efek, dan bukan saran investasi.",
          "Kami gak melakukan penawaran umum efek dan gak terdaftar untuk itu. Pembicaraan dengan calon investor dilakukan langsung dan tunduk pada aturan yang berlaku.",
          "Bitcoin yang kami pegang adalah aset treasury perusahaan sendiri. Kami bukan penyelenggara perdagangan aset kripto, gak nawarin produk kripto ke siapa pun, dan gak ngasih saran beli atau jual.",
          "Aset kripto berisiko tinggi dan nilainya bisa turun dalam. Pengawasannya ada di OJK, dan kewajiban pajaknya kami hitung sesuai aturan yang berlaku saat transaksi.",
          "Proyeksi di halaman ini model berbasis asumsi, bukan janji hasil.",
        ],
      },

      cta: {
        heading: "Mau bedah angkanya bareng?",
        body: "Kami buka asumsinya, modelnya, sama angka terukur yang gak ada di halaman ini.",
        label: "Ngobrol 15 menit",
      },
      next: { label: "Balik ke bandingan leverage", href: "/investor/" },
    },
  },

  en: {
    investor: {
      meta: {
        title: "Why AI software: compared against villas and restaurants",
        description:
          "A villa adds revenue by buying another room. Software adds revenue by finding the next customer. The capital, the margin, and the capacity ceiling, compared.",
      },
      figure: {
        prefix: "FIG.",
        status: "MODEL",
        statusTitle: "Modelled figures, not measurements",
        table: "Show the numbers",
      },
      eyebrow: "Investors",
      heading: "A different\nshape of economics.",
      lead: "Villas and restaurants are good businesses. The difference is not whether they are good, it is what you have to buy every time you want more revenue. This page opens that comparison, assumptions included.",
      meta_: "Every figure on this page is a model, not survey data and not our own results.",

      thesis: {
        label: "The short version",
        heading: "Physical assets grow on capital.\nSoftware grows on distribution.",
        body: [
          "A villa adds revenue by buying another room. A restaurant adds revenue by opening another outlet. Both need large capital up front, and that capital is hard to pull back if the bet was wrong.",
          "Software adds revenue by finding the next customer. That spend can be stopped next month if the numbers look bad. This does not make it easier, it makes the risk a different shape.",
        ],
      },

      statement: "The books\nare the product.",

      record: {
        label: "01 · How we think",
        heading: "A system of record,\nnot a helper app.",
        sub: "Three things taken from how Palantir thinks about data and how Anduril thinks about owning the product, then fitted to the size of a corner shop.",
        items: [
          {
            index: "I",
            title: "Whoever holds the official record does not get replaced",
            body: "A helper app is easy to drop. A system holding a business's numbered receipts, stock, debts, payroll, and tax filings becomes its official record. Leaving it means leaving your own history behind.",
          },
          {
            index: "II",
            title: "One map per business",
            body: "Products, customers, suppliers, per-customer prices, IOUs, staff, and assets are not stored as separate tables but as one connected map. A question like which product is quietly losing money can only be answered when the map connects.",
          },
          {
            index: "III",
            title: "We sit with the people using it",
            body: "Features come from sitting in someone's shop, watching them mistype, and fixing it. Not from a meeting. Every correction they make comes back as data for measuring which model actually understands how they talk.",
          },
        ],
      },

      capital: {
        label: "02 · Capital",
        heading: "Capital to add\nRp100M a month.",
        sub: "What has to be spent before that extra revenue exists at all.",
        chart: {
          title: "Capital required",
          unit: "rupiah",
          units: { billion: "billion", million: "million" },
          items: {
            villa: "Four-room villa",
            resto: "Forty-seat restaurant",
            software: "Subscription software",
          },
          notes: {
            villa: "One more villa, land plus build",
            resto: "One more outlet, lease plus fit-out plus equipment",
            software: "505 Pro customers, through acquisition spend",
          },
          tableHeaders: ["Business", "Capital", "Shape of it"],
        },
        after:
          "What the chart does not show: the first two bars buy assets that stay bought. The third is acquisition spend that can be stopped next month, and if it is stopped, the customers already won keep paying.",
      },

      share: {
        label: "03 · Cost structure",
        heading: "Where every million\nin revenue goes.",
        sub: "The same four buckets for all three, so the columns can actually be stacked against each other.",
        chart: {
          title: "Allocation of every Rp1,000,000 of revenue",
          unit: "percent",
          columns: {
            villa: "Four-room villa",
            resto: "Forty-seat restaurant",
            software: "Subscription software",
          },
          segments: {
            serve: "Cost to serve",
            fixed: "Fixed operations",
            acquire: "Winning customers",
            left: "Left for the owner",
          },
          tableHeaders: ["Bucket", "Villa", "Restaurant", "Software"],
        },
        after:
          "The restaurant looks heaviest because ingredients and shift labour rise with every additional guest. The villa has far more room, and gets more still when the OTA commission disappears. That is exactly the job Dewata Tech does.",
      },

      ceiling: {
        label: "04 · The ceiling",
        heading: "One of them\nhits a wall.",
        sub: "Demand doubles. One line follows it, the other stops at the number of rooms.",
        chart: {
          title: "Revenue as demand rises",
          xLabel: "Demand (100 = rooms full)",
          yLabel: "Revenue (index)",
          physical: "Villa or restaurant",
          software: "Subscription software",
          ceilingLabel: "Rooms sold out",
          tableHeaders: ["Demand", "Physical asset", "Software"],
        },
        after:
          "A full villa cannot take a fifth guest in a fourth room, whatever that guest is willing to pay. Getting past the line means buying another villa, which returns you to the first chart. Software has no wall of that kind. Its wall is distribution, and a distribution wall can be pushed without buying land.",
      },

      fair: {
        label: "05 · The fair part",
        heading: "Where villas and\nrestaurants win.",
        sub: "Without this section the three above it do not deserve to be believed.",
        items: [
          {
            title: "The demand already exists",
            body: "A villa in Bali does not have to convince anyone that staying somewhere is necessary. Software has to convince people that bookkeeping is necessary, which is far harder work.",
          },
          {
            title: "The asset holds value",
            body: "Land and buildings are worth something even if the business fails. Failed software is worth nothing unless the data gets used.",
          },
          {
            title: "Cash arrives in month one",
            body: "Open the villa, guests pay. Subscription software takes time before customer count covers the fixed cost.",
          },
          {
            title: "Banks understand the collateral",
            body: "A bank knows what to do with property. A bank does not necessarily know what to do with recurring subscription revenue.",
          },
        ],
      },

      assumptions: {
        label: "Assumptions",
        heading: "Where the numbers come from.",
        sub: "These are illustrative models, not surveys. Change an assumption and the numbers change with it.",
        groups: [
          {
            title: "Four-room villa in Bali",
            items: [
              "Average rate Rp1,500,000 a night at 60 percent occupancy",
              "Roughly Rp108 million of monthly revenue",
              "Average OTA commission of 18 percent on rooms booked through an OTA",
              "Rp2.5 billion to build one more villa, land included",
            ],
          },
          {
            title: "Forty-seat restaurant",
            items: [
              "Two table turns a day at 60 percent occupancy",
              "Average spend of Rp85,000 per guest",
              "Ingredients 33 percent, labour 25 percent, rent 12 percent",
              "Rp800 million for one more outlet, including lease deposit and equipment",
            ],
          },
          {
            title: "Subscription software",
            items: [
              "Public pricing: Pro at Rp198,000 a month, Team at Rp600,000 a month",
              "Blended revenue of Rp250,000 per customer per month after plan mix and annual discount",
              "Rp500,000 to acquire one customer",
              "Roughly 20 percent of the price to serve one additional customer",
            ],
          },
        ],
        note: "What is deliberately not on this page: AI cost per message, the margin floor, and today's paying customer count. Those are internal, and we bring them to the meeting.",
      },

      legal: {
        label: "Legal note",
        items: [
          "This page is company information. It is not an investment offer and not a solicitation to buy securities.",
          "We make no public offering of securities. Public offerings in Indonesia are governed by capital markets law and supervised by OJK, and we are not registered for one.",
          "The figures here are projections built on assumptions printed in the open, not a promise of results.",
        ],
      },

      cta: {
        heading: "Want the real numbers instead of a model?",
        body: "Measured traction, acquisition cost, and retention we open up in the conversation.",
        label: "Book 15 minutes",
      },
      next: { label: "On to the capital thesis", href: "/en/thesis/" },
    },

    thesis: {
      meta: {
        title: "Dewata AI capital thesis: AI product first, then Bitcoin",
        description:
          "The order of claims on cash: twelve months of reserve, the AI product, distribution, then surplus into Bitcoin. Plus a five-year model and the risks.",
      },
      eyebrow: "Capital thesis",
      heading: "Where the\ncapital goes.",
      lead: "Two places, and the order never gets reversed. The AI product until it is fed, then genuinely idle cash into Bitcoin.",
      meta_: "The projection on this page is a tiered model, not a promise.",

      statement: "The product first.\nAlways.",

      order: {
        label: "01 · The order",
        heading: "Cash is claimed\nin sequence.",
        sub: "Each tier fills before the one below it gets anything. Nobody jumps the queue.",
        steps: [
          {
            index: "01",
            title: "Operations and twelve months of reserve",
            body: "Salaries, servers, and obligations for a full year are set aside first. A company that dies of an empty bank account never gets to be right about anything else.",
          },
          {
            index: "02",
            title: "Build the AI product",
            body: "First claim on money meant for growth. Activation, the WhatsApp channel, and model evaluation tooling. All of it points at one variable: active businesses times how often they record.",
          },
          {
            index: "03",
            title: "Distribution",
            body: "One acquisition channel with real numbers, pushed to the point where the cost still makes sense. Not five channels being sampled.",
          },
          {
            index: "04",
            title: "Surplus cash to Bitcoin",
            body: "Only cash that is genuinely idle after the three tiers above. Not working capital, not payroll, and never borrowed.",
          },
        ],
      },

      btc: {
        label: "02 · Bitcoin",
        heading: "The rules were written\nbefore the price moved.",
        body: [
          "We hold Bitcoin as a long-horizon place to park cash, not as a source of income and not as something to trade. The reasoning is plain: the supply is capped and nobody can add to it unilaterally, while idle rupiah in an account loses ground with certainty.",
          "Why the rules are written up front: a treasury policy written while the price is moving is not policy, it is emotion.",
        ],
        rules: [
          { title: "Surplus only", body: "After the twelve-month reserve is whole. If the reserve is short, that month's allocation is zero." },
          { title: "Never with borrowed money", body: "No margin, no loan to buy, no crypto pledged as collateral." },
          { title: "Bought in steps, not one lump", body: "A fixed amount each month, with no attempt to time the entry." },
          { title: "Not a trading position", body: "No sell target and no leverage. If cash is needed, the product is the source." },
          { title: "Taxed and booked properly", body: "Holdings sit on the company books and tax is calculated under the rules in force at the time of the transaction." },
          { title: "Never sold to customers", body: "We offer no crypto product, give no buy advice, and none of this touches Dagangku AI." },
        ],
        note: "We deliberately publish no Bitcoin price projection. The price cannot be forecast, and a forecast chart only makes readers think something was promised.",
      },

      projection: {
        label: "03 · Projection",
        heading: "Five years,\nthree scenarios.",
        sub: "One variable drives it: how many businesses pay. Everything else is downstream.",
        chart: {
          title: "Annual recurring revenue",
          units: { billion: "billion", million: "million" },
          xLabel: "Year",
          yLabel: "Annual recurring revenue",
          axisUnit: "Rp billion",
          low: "Low",
          base: "Base",
          high: "High",
          customersLabel: "paying customers",
          tableHeaders: ["Year", "Low", "Base", "High"],
        },
        after:
          "The high case is 8,000 paying businesses. Indonesia has roughly 65 million MSMEs, so that is 0.012 percent of the market. The hard part is not the size of the market, it is activation: getting people who signed up to actually record every day.",
        honest: {
          label: "To be clear",
          body: "The chart above is a model, not an achievement. We do not publish today's paying customer count on a public page, but we open it plainly in the meeting, along with acquisition cost and retention.",
        },
      },

      risk: {
        label: "04 · Risk",
        heading: "What could\nsink this.",
        items: [
          {
            title: "Activation does not improve",
            body: "Most people who sign up stop before recording anything. If that does not change, every data asset grows slowly and the projection above does not happen.",
          },
          {
            title: "Model pricing moves",
            body: "Cost per message follows provider pricing. We are built to switch models, but a broad price rise still hits the margin.",
          },
          {
            title: "Data rules change",
            body: "Indonesia's PDP law is in force without its supervisory body. Implementing regulations issued later could be stricter than what we run on today.",
          },
          {
            title: "Bitcoin falls hard",
            body: "The treasury can lose a lot of value for a long time. That is exactly why the allocation is surplus only, so a drawdown never reaches payroll or servers.",
          },
        ],
      },

      legal: {
        label: "Legal note",
        items: [
          "This page describes company capital policy. It is not an investment offer, not a solicitation to buy securities, and not investment advice.",
          "We make no public offering of securities and are not registered for one. Conversations with prospective investors happen directly and under the rules that apply.",
          "The Bitcoin we hold is the company's own treasury asset. We are not a crypto trading operator, we offer no crypto product to anyone, and we give no buy or sell advice.",
          "Crypto assets carry high risk and can fall sharply. Supervision sits with OJK, and tax is calculated under the rules in force at the time of the transaction.",
          "The projection on this page is a model built on assumptions, not a promise of results.",
        ],
      },

      cta: {
        heading: "Want to take the numbers apart with us?",
        body: "We open the assumptions, the model, and the measured figures that are not on this page.",
        label: "Book 15 minutes",
      },
      next: { label: "Back to the leverage comparison", href: "/en/investor/" },
    },
  },
} as const

export function getInvestor(lang: Lang) {
  return content[lang] ?? content.id
}

export type Investor = (typeof content)["id"]
