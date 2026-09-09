/**
 * Dewata AI central content source of truth (bilingual: id + en).
 * Sections call getSite(lang) so copy stays consistent across both locales.
 *
 * Copy style: holding company. Short, plain, no sales pitch.
 *  - Say what the group is and what it owns. Nothing more.
 *  - Body copy stays at one or two short sentences.
 *  - Every headline is authored as exactly TWO lines, split on "\n" via lines().
 *    Keep each line under ~24 characters so it still sits on one row at 320px.
 *
 * NOTE: replace social URLs with the real ones before launch.
 */

import { ROUTES, type Lang } from "@/lib/i18n"

const WHATSAPP_NUMBER = "6285179755016"
/* Pre-filled WhatsApp text. It ends mid-sentence on purpose: the person taps
   through with the line already open and finishes it with their actual
   problem, so the first message arrives with something to work with. */
const WA_MESSAGE: Record<Lang, string> = {
  id: "Halo Dewata AI! Aku dari website nih. Mau ambil slot ngobrol 15 menit yang gratis. Masalah paling bikin pusing di bisnisku sekarang: ",
  en: "Hey Dewata AI! Came from your site. I want the free 15-minute slot. The biggest headache in my business right now: ",
}
const EMAIL = "gungdeweida8@gmail.com"
const wa = (lang: Lang) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE[lang])}`

/** Legal entity data (AHU / OSS). Shown in the footer and in Organization JSON-LD. */
const LEGAL = {
  legalName: "PT Dewata Artificial Intelligence",
  legalForm: "Perseroan Perorangan",
  nib: "1708260005107",
  ahuUrl:
    "https://ptp.ahu.go.id/sertifikat?id=69cdf5dc2dbf71196b5b6ee133d6a079:92cde0f301079391c3bb3093de5049fa",
  addressLine:
    "Jl. Sakura Gg. 1 No. 3, Dangin Puri Kangin, Denpasar Utara, Kota Denpasar, Bali",
  address: {
    street: "Jl. Sakura Gg. 1 No. 3",
    village: "Dangin Puri Kangin",
    district: "Denpasar Utara",
    city: "Kota Denpasar",
    region: "Bali",
    country: "ID",
  },
} as const

const content = {
  id: {
    meta: {
      title: "Dewata AI: produk AI yang bikin bisnis Indonesia untung",
      description:
        "Villa dapet booking direct tanpa komisi OTA. Pemilik usaha dapet pembukuan beres modal chat. Produknya punya kami, bukan agensi. Ngobrol 15 menit, gratis.",
      ogLocale: "id_ID",
    },

    brand: {
      name: "Dewata AI",
      legalName: LEGAL.legalName,
      domain: "dewataai.com",
      location: "Bali, Indonesia",
      email: EMAIL,
      whatsapp: wa("id"),
      tagline: "Kecerdasan buatan, dari Pulau Dewata.",
      legal: LEGAL,
    },

    /* Two dropdowns plus two flat links. `desc` is what makes a dropdown worth
       opening: the menu answers "what is this" before the click, instead of
       being a list of nouns. */
    nav: {
      groups: [
        {
          label: "Usaha",
          items: [
            {
              label: "Dewata Tech",
              href: `${ROUTES.ventures.id}dewata-tech/`,
              desc: "Booking direct buat villa, komisi OTA nol",
              icon: "booking",
            },
            {
              label: "Dagangku AI",
              href: `${ROUTES.ventures.id}dagangku-ai/`,
              desc: "Pembukuan modal chat, plus data yang numpuk",
              icon: "chat",
            },
            {
              label: "Keselamatan publik",
              href: ROUTES.safety.id,
              desc: "Usaha ketiga: nyegah serangan teror, masih riset",
              icon: "safety",
            },
            {
              label: "Semua usaha",
              href: ROUTES.ventures.id,
              desc: "Register lengkapnya ada di sini",
              icon: "register",
            },
          ],
        },
        {
          label: "Perusahaan",
          items: [
            { label: "Tentang", href: ROUTES.about.id, desc: "Induk, bukan agensi", icon: "about" },
            {
              label: "Visi",
              href: ROUTES.vision.id,
              desc: "Bootstrap, dan kenapa Bali harus bikin sendiri",
              icon: "vision",
            },
            {
              label: "Manifesto",
              href: ROUTES.manifesto.id,
              desc: "Sembilan prinsip yang kami pakai nyaring",
              icon: "manifesto",
            },
          ],
        },
        {
          label: "Angka",
          items: [
            {
              label: "Kenapa software AI",
              href: ROUTES.investor.id,
              desc: "Dibanding villa, hotel, dan restoran",
              icon: "investor",
            },
            {
              label: "Ke mana modalnya",
              href: ROUTES.thesis.id,
              desc: "Produk AI dulu, sisanya Bitcoin",
              icon: "thesis",
            },
            {
              label: "Empat puluh tahun",
              href: ROUTES.horizon.id,
              desc: "Lawan tanah, villa, hotel, dan Bitcoin",
              icon: "horizon",
            },
          ],
        },
      ],
      links: [
        { label: "Jurnal", href: ROUTES.journal.id },
        { label: "Pers", href: ROUTES.press.id },
      ],
      cta: { label: "Ngobrol dulu", href: ROUTES.contact.id },
    },

    hero: {
      eyebrow: "PT Dewata Artificial Intelligence",
      titleTop: "Cuan naik.",
      titleAccent: "Ribet auto turun.",
      sub: "Kami bikin software AI buat bisnis Indonesia. Villa dapet booking direct tanpa komisi OTA, pemilik usaha dapet pembukuan yang beres cuma modal chat.",
      ctaPrimary: { label: "Cek yang udah jalan", href: "#ekosistem" },
      ctaSecondary: { label: "Ngobrol 15 menit", href: "#penawaran" },
      demo: {
        eco: "Struktur grup",
        active: "Aktif",
        parentMeta: "Perusahaan induk",
        techDesc: "Booking direct buat villa",
        dagangDesc: "Pembukuan modal chat",
        webTag: "Web",
        aiTag: "AI",
      },
    },

    marquee: [
      "Produk AI",
      "Web & Rekayasa",
      "Otomatisasi Bisnis",
      "Riset Terapan",
      "Villa & Hospitality",
      "Bisnis Indonesia",
      "Bali",
      "Indonesia",
    ],

    about: {
      eyebrow: "01 · Tentang",
      heading: "Induk, bukan\nagensi.",
      imageAlt: "Tim Dewata AI di Bali",
      paragraphs: [
        "Kami gak jualan jasa. Produknya punya kami, kami yang bangun, kami juga yang jalanin tiap hari dari Bali.",
        "Tiap usaha punya tim, produk, dan pelanggan sendiri. Gak ada yang dianggurin.",
      ],
      facts: [
        { value: "Bali", label: "Basis operasi" },
        { value: "2", label: "Usaha aktif" },
        { value: "1", label: "Sedang dibangun" },
        { value: "2026", label: "Berbadan hukum" },
      ],
    },

    pillars: {
      eyebrow: "02 · Kapabilitas",
      heading: "Empat cara kami\nnambah cuan.",
      sub: "Semua udah jadi produk yang dipakai orang, bukan slide yang cakep doang.",
      /* `proof` names where the capability actually runs, so the claim is
         checkable instead of decorative. */
      proofLabel: "Terbukti di",
      items: [
        {
          key: "brain",
          title: "Produk AI",
          desc: "Bukan wrapper. Tiap koreksi pemakai bikin AI-nya makin akurat.",
          proof: "Dagangku AI",
        },
        {
          key: "code",
          title: "Web & Rekayasa",
          desc: "Website yang nutup booking, bukan cuma cakep.",
          proof: "Dewata Tech",
        },
        {
          key: "automation",
          title: "Otomatisasi",
          desc: "Kerjaan manual pindah ke sistem. Kamu tidur, dia tetap jalan.",
          proof: "Dua usaha",
        },
        {
          key: "research",
          title: "Riset Terapan",
          desc: "Model baru kami tes dulu, biar kamu gak jadi kelinci percobaan.",
          proof: "Uji internal",
        },
      ],
    },

    ventures: {
      eyebrow: "03 · Ekosistem",
      heading: "Dua usaha jalan.\nSatu dibangun.",
      sub: "Tiap usaha ngebunuh satu masalah yang bikin duit kamu bocor.",
      items: [
        {
          index: "01",
          mono: "DT",
          slug: "dewata-tech",
          name: "Dewata Tech",
          domain: "dewatatech.com",
          url: "https://dewatatech.com",
          tag: "Web & Software",
          headline: "Booking langsung.\nKomisi auto nol.",
          desc: "Website plus booking engine buat villa. Live 7 hari, komisi OTA langsung nol.",
          features: [
            "Website villa yang nutup booking, bukan brosur",
            "Booking direct plus bayar online",
            "Kalender OTA sinkron, no double booking",
          ],
          proof: [
            { value: "7 hari", label: "Website live" },
            { value: "0%", label: "Komisi OTA" },
            { value: "30 hari", label: "Garansi" },
          ],
          cta: "Kunjungi dewatatech.com",
          demo: {
            statusLabel: "Live",
            caption: "Direct booking villa",
            imageAlt: "Portofolio website villa oleh Dewata Tech",
          },
        },
        {
          index: "02",
          mono: "DA",
          slug: "dagangku-ai",
          name: "Dagangku AI",
          domain: "dagangkuai.com",
          url: "https://dagangkuai.com",
          tag: "Produk AI",
          headline: "Satu chat.\nPembukuan beres.",
          desc: "Pembukuan lewat chat. Gak perlu install, gak perlu Excel, gak perlu ngerti akuntansi.",
          features: [
            "Nyatet secepat kirim chat",
            "Untung rugi kelihatan hari ini juga",
            "Laporan PDF tinggal unduh",
            "Tiap koreksi kamu bikin AI-nya makin akurat",
          ],
          proof: [
            { value: "30 dtk", label: "Waktu setup" },
            { value: "Rp0", label: "Mulai gratis" },
            { value: "100%", label: "Bahasa Indonesia" },
          ],
          cta: "Kunjungi dagangkuai.com",
          demo: {
            online: "Online",
            msg1: "Jual nasi goreng 25rb",
            recorded: "Tercatat",
            category: "Makanan",
            msg2: "Untung hari ini berapa?",
            msg3: "Hari ini untung Rp180.000 dari 14 transaksi.",
            statLabel: "Untung hari ini",
            statValue: "Rp180.000",
            inputPlaceholder: "Ketik transaksi…",
          },
        },
      ],
      upcoming: {
        index: "03",
        mono: "+",
        name: "Usaha ketiga",
        tag: "Dijajaki",
        status: "Masih riset",
        desc: "Teknologi buat nyegah serangan teror di infrastruktur penting: bandara, pelabuhan, pembangkit, tempat ibadah. Dipasang cuma kalau operator lokasinya sendiri yang minta, pakai dasar hukum dan batas simpan data. Bukan pemantauan massal warga.",
        cta: "Lihat usaha ketiga",
        href: ROUTES.safety.id,
      },
    },

    dataThesis: {
      label: "Yang numpuk",
      statement: "Fitur bisa disalin.\nData yang numpuk tiap hari, enggak.",
      body: "Tiap pemilik usaha yang benerin catatan salah di Dagangku ninggalin satu pasangan data yang gak dijual di mana pun: bahasa warung ke jurnal akuntansi. Itu yang kami kejar, bukan jumlah fitur.",
      cta: "Lihat hitungannya",
    },

    stats: {
      eyebrow: "Bukti",
      heading: "Angka, bukan\njanji manis.",
      items: [
        {
          value: "2",
          unit: "",
          label: "Usaha aktif",
          desc: "Dipakai dan dibayar pelanggan beneran, bukan demo.",
        },
        {
          value: "7",
          unit: " hari",
          label: "Dari brief ke live",
          desc: "Dari brief ke website villa online, sepekan aja.",
        },
        {
          value: "0",
          unit: "%",
          label: "Komisi OTA",
          desc: "Booking direct masuk penuh ke kantong pemilik.",
        },
        {
          value: "24",
          unit: "/7",
          label: "Sistem bekerja",
          desc: "Sistemnya tetap kerja pas kamu lagi tidur.",
        },
      ],
    },

    vision: {
      eyebrow: "04 · Visi & Misi",
      visionLabel: "Visi",
      visionText: "Bisnis Indonesia\nkerja pakai AI.",
      missionLabel: "Misi",
      missionPoints: [
        "Bikin produk yang dampaknya kelihatan di rupiah, bukan di slide.",
        "Kasih bisnis kecil senjata selevel perusahaan gede.",
        "Kuasai satu masalah sampai tuntas sebelum pindah ke berikutnya.",
        "Jaga data pelanggan kayak jaga duit sendiri.",
      ],
      offer: {
        eyebrow: "Penawaran",
        heading: "15 menit.\nGratis, no pitch.",
        sub: "Ceritain masalahnya, kita bedah bareng. Keluar dari obrolan kamu udah pegang rencana yang bisa langsung dijalanin.",
        items: [
          "Audit kilat: di mana duit kamu bocor",
          "Rencana 30 hari, tinggal eksekusi",
          "Rekomendasi jujur, walau ujungnya bukan produk kami",
        ],
        guarantee: "Gak cocok? Kami bilang apa adanya. Gratis ya tetap gratis, gak ada jebakan.",
        note: "Biasanya dibales di hari yang sama.",
        cta: { label: "Gas, ambil slotnya", href: wa("id") },
      },
    },

    values: {
      eyebrow: "05 · Nilai",
      heading: "Empat prinsip,\ntanpa basa-basi.",
      /* Every company claims these. `cost` is what each one actually gives up,
         which is the part that is hard to copy. */
      costLabel: "Harganya",
      items: [
        {
          key: "local",
          title: "Berakar di Bali",
          desc: "Tim kami di sini, jam kerjanya sama kayak kamu.",
          cost: "Tim tetap di satu kota, walau pilihan rekrutmennya jadi lebih sempit.",
        },
        {
          key: "practical",
          title: "Hasil di atas gaya",
          desc: "Fitur yang gak nambah hasil ya kami buang, sesayang apa pun.",
          cost: "Fitur yang udah jadi tetap kami buang kalau ternyata gak nambah hasil.",
        },
        {
          key: "trust",
          title: "Kepercayaan dulu",
          desc: "Kami ngomong apa adanya, termasuk pas harus nolak.",
          cost: "Kalau produk kami bukan jawabannya, kami bilang, walau penjualannya batal.",
        },
        {
          key: "craft",
          title: "Rekayasa rapi",
          desc: "Cepat, aman, gampang dirawat bertahun-tahun.",
          cost: "Kami nolak tenggat yang cuma bisa dikejar pakai utang teknis.",
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      heading: "Sering\nditanyakan.",
      note: "Belum ketemu jawabannya? ",
      noteLink: "Chat kami langsung.",
      items: [
        {
          q: "Dewata AI itu apa?",
          a: "Perusahaan induk teknologi asal Bali. Kami punya dan jalanin Dewata Tech sama Dagangku AI.",
        },
        {
          q: "Hubungannya sama Dewata Tech dan Dagangku AI?",
          a: "Dua-duanya usaha milik Dewata AI. Masing-masing punya tim, produk, dan pelanggan sendiri.",
        },
        {
          q: "Produk AI kalian beda apa sama wrapper ChatGPT?",
          a: "Wrapper cuma kotak chat yang gak nyimpen apa-apa. Dagangku AI megang pembukuan usaha, plus korpus koreksi bahasa Indonesia yang numpuk tiap hari dari pemakainya sendiri. Rinciannya ada di halaman Dagangku AI.",
        },
        {
          q: "Dewata AI nerima proyek langsung?",
          a: "Proyek website dan sistem ditangani Dewata Tech. Kalau mau kerja sama tingkat grup, chat kami di sini.",
        },
        {
          q: "Kantornya di mana?",
          a: "Denpasar, Bali. Alamat lengkapnya ada di bagian bawah halaman ini.",
        },
        {
          q: "Udah berbadan hukum?",
          a: "Udah. PT Dewata Artificial Intelligence (Perseroan Perorangan), NIB 1708260005107.",
        },
      ],
    },

    cta: {
      eyebrow: "Kontak",
      headline: "Ngobrol dulu,\ngratis kok.",
      sub: "Chat aja. Biasanya kebales di hari yang sama.",
      primary: { label: "Chat WhatsApp", href: wa("id") },
      secondary: { label: EMAIL, href: `mailto:${EMAIL}` },
    },

    footer: {
      blurb: "Grup teknologi dari Bali. Kami bikin produknya, kami juga yang jalanin.",
      columns: [
        {
          title: "Perusahaan",
          links: [
            { label: "Tentang", href: ROUTES.about.id },
            { label: "Visi", href: ROUTES.vision.id },
            { label: "Manifesto", href: ROUTES.manifesto.id },
            { label: "Usaha", href: ROUTES.ventures.id },
            { label: "Investor", href: ROUTES.investor.id },
            { label: "Tesis investasi", href: ROUTES.thesis.id },
            { label: "Empat puluh tahun", href: ROUTES.horizon.id },
            { label: "Kontak", href: ROUTES.contact.id },
          ],
        },
        {
          title: "Ekosistem",
          links: [
            { label: "Dewata Tech", href: "https://dewatatech.com", external: true },
            { label: "Dagangku AI", href: "https://dagangkuai.com", external: true },
          ],
        },
        {
          title: "Media",
          links: [
            { label: "Jurnal", href: ROUTES.journal.id },
            { label: "Siaran Pers", href: ROUTES.press.id },
            { label: EMAIL, href: `mailto:${EMAIL}` },
            { label: "WhatsApp", href: wa("id"), external: true },
          ],
        },
      ],
      socials: [
        { key: "instagram", label: "Instagram", href: "#" },
        { key: "linkedin", label: "LinkedIn", href: "#" },
        { key: "whatsapp", label: "WhatsApp", href: wa("id") },
      ],
      entity: {
        heading: "Badan hukum",
        operator:
          "Dewata Tech dan Dagangku AI dikelola oleh PT Dewata Artificial Intelligence (Perseroan Perorangan).",
        certLabel: "Lihat sertifikat pendirian AHU",
        nibLabel: "NIB",
        addressLabel: "Alamat terdaftar",
      },
      legal: [{ label: "Kebijakan Privasi", href: ROUTES.privacy.id }],
      status: "Semua sistem beroperasi",
      copyright: "© 2026 PT Dewata Artificial Intelligence. Dibuat di Bali.",
    },
  },

  en: {
    meta: {
      title: "Dewata AI: AI products Indonesian businesses actually use",
      description:
        "Villas take direct bookings and pay zero OTA commission. Owners get books that close from a chat. We own what we build, not an agency. 15 free minutes.",
      ogLocale: "en_US",
    },

    brand: {
      name: "Dewata AI",
      legalName: LEGAL.legalName,
      domain: "dewataai.com",
      location: "Bali, Indonesia",
      email: EMAIL,
      whatsapp: wa("en"),
      tagline: "Artificial intelligence, from the Island of the Gods.",
      legal: LEGAL,
    },

    nav: {
      groups: [
        {
          label: "Ventures",
          items: [
            {
              label: "Dewata Tech",
              href: `${ROUTES.ventures.en}dewata-tech/`,
              desc: "Direct villa bookings, zero OTA commission",
              icon: "booking",
            },
            {
              label: "Dagangku AI",
              href: `${ROUTES.ventures.en}dagangku-ai/`,
              desc: "Bookkeeping from a chat, and the data it leaves",
              icon: "chat",
            },
            {
              label: "Public safety",
              href: ROUTES.safety.en,
              desc: "Third venture: preventing terror attacks, research stage",
              icon: "safety",
            },
            {
              label: "All ventures",
              href: ROUTES.ventures.en,
              desc: "The full register lives here",
              icon: "register",
            },
          ],
        },
        {
          label: "Company",
          items: [
            { label: "About", href: ROUTES.about.en, desc: "An owner, not an agency", icon: "about" },
            {
              label: "Vision",
              href: ROUTES.vision.en,
              desc: "Bootstrapped, and why Bali should build its own",
              icon: "vision",
            },
            {
              label: "Manifesto",
              href: ROUTES.manifesto.en,
              desc: "Nine principles we filter decisions through",
              icon: "manifesto",
            },
          ],
        },
        {
          label: "Numbers",
          items: [
            {
              label: "Why AI software",
              href: ROUTES.investor.en,
              desc: "Against villas, hotels, and restaurants",
              icon: "investor",
            },
            {
              label: "Where the capital goes",
              href: ROUTES.thesis.en,
              desc: "The AI product first, then Bitcoin",
              icon: "thesis",
            },
            {
              label: "Forty years",
              href: ROUTES.horizon.en,
              desc: "Against land, villas, hotels, and Bitcoin",
              icon: "horizon",
            },
          ],
        },
      ],
      links: [
        { label: "Journal", href: ROUTES.journal.en },
        { label: "Press", href: ROUTES.press.en },
      ],
      cta: { label: "Contact us", href: ROUTES.contact.en },
    },

    hero: {
      eyebrow: "PT Dewata Artificial Intelligence",
      titleTop: "Revenue up.",
      titleAccent: "Busywork gone.",
      sub: "We build AI software for Indonesian business. Villas take bookings direct with zero OTA commission, and owners get books that close themselves.",
      ctaPrimary: { label: "See what is live", href: "#ekosistem" },
      ctaSecondary: { label: "Free 15-min chat", href: "#penawaran" },
      demo: {
        eco: "Group structure",
        active: "Active",
        parentMeta: "Parent company",
        techDesc: "Direct booking for villas",
        dagangDesc: "Bookkeeping by chat",
        webTag: "Web",
        aiTag: "AI",
      },
    },

    marquee: [
      "AI Products",
      "Web & Engineering",
      "Business Automation",
      "Applied Research",
      "Villa & Hospitality",
      "Indonesian Business",
      "Bali",
      "Indonesia",
    ],

    about: {
      eyebrow: "01 · About",
      heading: "Holding company,\nnot an agency.",
      imageAlt: "The Dewata AI team in Bali",
      paragraphs: [
        "We do not sell services. We own the products, we built them, and we run them every day out of Bali.",
        "Each venture has its own team, product, and customers. Nothing is left to coast.",
      ],
      facts: [
        { value: "Bali", label: "Home base" },
        { value: "2", label: "Ventures live" },
        { value: "1", label: "In the works" },
        { value: "2026", label: "Incorporated" },
      ],
    },

    pillars: {
      eyebrow: "02 · Capabilities",
      heading: "Four ways we\nmove the money.",
      sub: "All of it already shipped and in use, not research on a slide.",
      proofLabel: "Proven in",
      items: [
        {
          key: "brain",
          title: "AI Products",
          desc: "Not a wrapper. Every user correction makes the model sharper.",
          proof: "Dagangku AI",
        },
        {
          key: "code",
          title: "Web & Engineering",
          desc: "Websites that close bookings, not just look good.",
          proof: "Dewata Tech",
        },
        {
          key: "automation",
          title: "Automation",
          desc: "Manual work moves into a system. You sleep, it keeps going.",
          proof: "Both ventures",
        },
        {
          key: "research",
          title: "Applied Research",
          desc: "New models get tested here first, so you are never the guinea pig.",
          proof: "Internal testing",
        },
      ],
    },

    ventures: {
      eyebrow: "03 · Ecosystem",
      heading: "Two live now.\nOne building.",
      sub: "Each venture kills one problem that costs real money.",
      items: [
        {
          index: "01",
          mono: "DT",
          slug: "dewata-tech",
          name: "Dewata Tech",
          domain: "dewatatech.com",
          url: "https://dewatatech.com",
          tag: "Web & Software",
          headline: "Book direct.\nZero commission.",
          desc: "Websites plus a booking engine for villas. Live in 7 days, OTA commission straight to zero.",
          features: [
            "Villa sites built to close, not to browse",
            "Direct booking with online payment",
            "OTA calendars in sync, no double bookings",
          ],
          proof: [
            { value: "7 days", label: "Website live" },
            { value: "0%", label: "OTA commission" },
            { value: "30 days", label: "Guarantee" },
          ],
          cta: "Visit dewatatech.com",
          demo: {
            statusLabel: "Live",
            caption: "Direct villa booking",
            imageAlt: "Villa website portfolio by Dewata Tech",
          },
        },
        {
          index: "02",
          mono: "DA",
          slug: "dagangku-ai",
          name: "Dagangku AI",
          domain: "dagangkuai.com",
          url: "https://dagangkuai.com",
          tag: "AI Product",
          headline: "One chat.\nBooks done.",
          desc: "Bookkeeping over chat. No install, no Excel, no accounting degree.",
          features: [
            "Log a sale as fast as sending a text",
            "Profit and loss visible today, not month end",
            "PDF reports ready to download",
            "Every correction you make sharpens the AI",
          ],
          proof: [
            { value: "30 sec", label: "Setup time" },
            { value: "Rp0", label: "Start free" },
            { value: "100%", label: "Bahasa Indonesia" },
          ],
          cta: "Visit dagangkuai.com",
          demo: {
            online: "Online",
            msg1: "Sold fried rice 25k",
            recorded: "Recorded",
            category: "Food",
            msg2: "How much profit today?",
            msg3: "Today you made Rp180,000 from 14 transactions.",
            statLabel: "Profit today",
            statValue: "Rp180,000",
            inputPlaceholder: "Type a transaction…",
          },
        },
      ],
      upcoming: {
        index: "03",
        mono: "+",
        name: "Third venture",
        tag: "Exploring",
        status: "Research stage",
        desc: "Technology for preventing terror attacks on critical infrastructure: airports, ports, power plants, places of worship. Deployed only where the site operator asks for it, with a legal basis and retention limits. Not population-scale monitoring.",
        cta: "See the third venture",
        href: ROUTES.safety.en,
      },
    },

    dataThesis: {
      label: "What compounds",
      statement: "Features get copied.\nWhat compounds daily does not.",
      body: "Every owner who fixes a wrong line in Dagangku leaves behind a pair nobody sells anywhere: shop-floor Indonesian mapped to an accounting entry. That is what we are after, not the feature count.",
      cta: "See the arithmetic",
    },

    stats: {
      eyebrow: "Proof",
      heading: "Numbers, not\npromises.",
      items: [
        {
          value: "2",
          unit: "",
          label: "Ventures live",
          desc: "Used and paid for by real customers, not demoed.",
        },
        {
          value: "7",
          unit: " days",
          label: "From brief to live",
          desc: "From brief to a villa website online, one week.",
        },
        {
          value: "0",
          unit: "%",
          label: "OTA commission",
          desc: "Direct bookings land in the owner pocket in full.",
        },
        {
          value: "24",
          unit: "/7",
          label: "Systems working",
          desc: "The system keeps working while you sleep.",
        },
      ],
    },

    vision: {
      eyebrow: "04 · Vision & Mission",
      visionLabel: "Vision",
      visionText: "Every business\nruns on AI.",
      missionLabel: "Mission",
      missionPoints: [
        "Build products whose impact shows up in rupiah, not in slides.",
        "Give small businesses the same firepower as the big ones.",
        "Own one problem completely before moving to the next.",
        "Guard customer data the way we would guard our own money.",
      ],
      offer: {
        eyebrow: "The offer",
        heading: "15 minutes.\nFree, no pitch.",
        sub: "Tell us the problem and we break it down with you. You leave with a plan you can start on tomorrow.",
        items: [
          "A fast audit of where the money leaks",
          "A 30-day plan you can just execute",
          "An honest answer, even if it is not our product",
        ],
        guarantee: "Not a fit? We say so straight. Free stays free, no catch.",
        note: "Usually answered the same day.",
        cta: { label: "Grab a slot", href: wa("en") },
      },
    },

    values: {
      eyebrow: "05 · Values",
      heading: "Four principles,\nno fluff.",
      costLabel: "What it costs",
      items: [
        {
          key: "local",
          title: "Rooted in Bali",
          desc: "Our team is here, working your hours.",
          cost: "The team stays in one city, even though it narrows who we can hire.",
        },
        {
          key: "practical",
          title: "Results over polish",
          desc: "If a feature adds nothing, we cut it, however much we liked it.",
          cost: "A finished feature still gets cut when it turns out to add nothing.",
        },
        {
          key: "trust",
          title: "Trust comes first",
          desc: "We tell you straight, including when we say no.",
          cost: "If our product is not the answer we say so, even when the sale dies.",
        },
        {
          key: "craft",
          title: "Clean engineering",
          desc: "Fast, secure, and easy to maintain for years.",
          cost: "We turn down deadlines that can only be met with technical debt.",
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      heading: "Questions\nwe get often.",
      note: "Still haven't found an answer? ",
      noteLink: "Contact us directly.",
      items: [
        {
          q: "What is Dewata AI?",
          a: "A Bali-based technology parent company. We own and run Dewata Tech and Dagangku AI.",
        },
        {
          q: "How does it relate to Dewata Tech and Dagangku AI?",
          a: "Both are ventures owned by Dewata AI. Each has its own team, product, and customers.",
        },
        {
          q: "How are your AI products different from a ChatGPT wrapper?",
          a: "A wrapper is a chat box that stores nothing. Dagangku AI holds the actual books of a business, plus a correction corpus in Indonesian that grows every day from the people using it. The Dagangku AI page has the detail.",
        },
        {
          q: "Does Dewata AI take on projects directly?",
          a: "Website and system projects are handled by Dewata Tech. For group-level partnerships, contact us here.",
        },
        {
          q: "Where are you based?",
          a: "Denpasar, Bali. The registered address is listed at the bottom of this page.",
        },
        {
          q: "Is the company formally incorporated?",
          a: "Yes. PT Dewata Artificial Intelligence (Perseroan Perorangan), NIB 1708260005107.",
        },
      ],
    },

    cta: {
      eyebrow: "Contact",
      headline: "Got 15 minutes?\nIt is free.",
      sub: "Message us. Usually answered the same day.",
      primary: { label: "Chat on WhatsApp", href: wa("en") },
      secondary: { label: EMAIL, href: `mailto:${EMAIL}` },
    },

    footer: {
      blurb: "A technology group from Bali. We build the products and we run them.",
      columns: [
        {
          title: "Company",
          links: [
            { label: "About", href: ROUTES.about.en },
            { label: "Vision", href: ROUTES.vision.en },
            { label: "Manifesto", href: ROUTES.manifesto.en },
            { label: "Ventures", href: ROUTES.ventures.en },
            { label: "Investors", href: ROUTES.investor.en },
            { label: "Capital thesis", href: ROUTES.thesis.en },
            { label: "Forty years", href: ROUTES.horizon.en },
            { label: "Contact", href: ROUTES.contact.en },
          ],
        },
        {
          title: "Ecosystem",
          links: [
            { label: "Dewata Tech", href: "https://dewatatech.com", external: true },
            { label: "Dagangku AI", href: "https://dagangkuai.com", external: true },
          ],
        },
        {
          title: "Media",
          links: [
            { label: "Journal", href: ROUTES.journal.en },
            { label: "Press", href: ROUTES.press.en },
            { label: EMAIL, href: `mailto:${EMAIL}` },
            { label: "WhatsApp", href: wa("en"), external: true },
          ],
        },
      ],
      socials: [
        { key: "instagram", label: "Instagram", href: "#" },
        { key: "linkedin", label: "LinkedIn", href: "#" },
        { key: "whatsapp", label: "WhatsApp", href: wa("en") },
      ],
      entity: {
        heading: "Legal entity",
        operator:
          "Dewata Tech and Dagangku AI are operated by PT Dewata Artificial Intelligence (Perseroan Perorangan).",
        certLabel: "View AHU incorporation certificate",
        nibLabel: "NIB",
        addressLabel: "Registered address",
      },
      legal: [{ label: "Privacy Policy", href: ROUTES.privacy.en }],
      status: "All systems operational",
      copyright: "© 2026 PT Dewata Artificial Intelligence. Built in Bali.",
    },
  },
} as const

export function getSite(lang: Lang) {
  return content[lang] ?? content.id
}

/** Split an authored two-line headline into its lines. */
export function lines(text: string): string[] {
  return text.split("\n")
}

export type Site = (typeof content)["id"]
