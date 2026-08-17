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
const WA_MESSAGE: Record<Lang, string> = {
  id: "Halo Dewata AI! Saya menemukan website Anda dan ingin berdiskusi.",
  en: "Hello Dewata AI! I found your website and would like to talk.",
}
const EMAIL = "halo@dewataai.com" // TODO: konfirmasi alamat email resmi
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
      title: "Dewata AI: grup teknologi AI dari Bali",
      description:
        "PT Dewata Artificial Intelligence membangun dan menjalankan produk AI untuk bisnis Indonesia. Perusahaan induk Dewata Tech dan Dagangku AI.",
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

    nav: {
      links: [
        { label: "Usaha", href: ROUTES.ventures.id },
        { label: "Tentang", href: ROUTES.about.id },
        { label: "Manifesto", href: ROUTES.manifesto.id },
        { label: "Jurnal", href: ROUTES.journal.id },
        { label: "Pers", href: ROUTES.press.id },
      ],
      cta: { label: "Ngobrol dulu", href: ROUTES.contact.id },
    },

    hero: {
      eyebrow: "PT Dewata Artificial Intelligence",
      titleTop: "Kami bikin.",
      titleAccent: "Kami jalanin.",
      sub: "Software AI buat bisnis Indonesia: booking direct buat villa, dan pembukuan otomatis buat UMKM.",
      taglines: [
        "Produk sendiri, bukan agensi",
        "Dua usaha jalan hari ini",
        "Usaha keluarga dari Denpasar",
      ],
      ctaPrimary: { label: "Lihat ekosistem", href: "#ekosistem" },
      ctaSecondary: { label: "Ngobrol 15 menit", href: "#penawaran" },
      demo: {
        eco: "Struktur grup",
        active: "Aktif",
        parentMeta: "Perusahaan induk",
        techDesc: "Website & booking villa",
        dagangDesc: "Asisten bisnis UMKM",
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
      "UMKM Indonesia",
      "Bali",
      "Indonesia",
    ],

    about: {
      eyebrow: "01 · Tentang",
      heading: "Induk, bukan\nagensi.",
      imageAlt: "Tim Dewata AI di Bali",
      paragraphs: [
        "Dewata AI punya dan jalanin produk software sendiri dari Bali.",
        "Tiap usaha punya tim, produk, dan pelanggannya masing-masing.",
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
      heading: "Empat bidang\nkerja kami.",
      sub: "Semuanya udah jadi produk, bukan riset di slide.",
      /* `proof` names where the capability actually runs, so the claim is
         checkable instead of decorative. */
      proofLabel: "Terbukti di",
      items: [
        {
          key: "brain",
          title: "Produk AI",
          desc: "Aplikasi AI yang langsung kepake tiap hari.",
          proof: "Dagangku AI",
        },
        {
          key: "code",
          title: "Web & Rekayasa",
          desc: "Website dan booking engine yang nutup pesanan.",
          proof: "Dewata Tech",
        },
        {
          key: "automation",
          title: "Otomatisasi",
          desc: "Kerjaan manual dipindah ke sistem yang jalan sendiri.",
          proof: "Dua usaha",
        },
        {
          key: "research",
          title: "Riset Terapan",
          desc: "Model baru kami tes dulu sebelum masuk produk.",
          proof: "Uji internal",
        },
      ],
    },

    ventures: {
      eyebrow: "03 · Ekosistem",
      heading: "Dua usaha jalan.\nSatu dibangun.",
      sub: "Tiap usaha nyelesain satu masalah yang mahal.",
      items: [
        {
          index: "01",
          mono: "DT",
          slug: "dewata-tech",
          name: "Dewata Tech",
          domain: "dewatatech.com",
          url: "https://dewatatech.com",
          tag: "Web & Software",
          headline: "Booking langsung.\nKomisi jadi nol.",
          desc: "Website dan booking engine buat villa. Live dalam 7 hari.",
          features: [
            "Website villa yang nutup booking",
            "Booking direct plus pembayaran online",
            "Integrasi channel manager",
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
          desc: "Asisten pembukuan lewat chat buat UMKM. Tanpa install, tanpa Excel.",
          features: [
            "Catat transaksi secepat kirim chat",
            "Untung rugi kelihatan hari ini",
            "Laporan PDF siap dipakai",
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
        tag: "Segera",
        status: "Sedang dibangun",
        desc: "Kami lagi nyari masalah mahal berikutnya.",
        cta: "Ceritain masalah kamu",
        href: "#kontak",
      },
    },

    stats: {
      eyebrow: "Bukti",
      heading: "Angka yang\nbisa dibuktikan.",
      items: [
        {
          value: "2",
          unit: "",
          label: "Usaha aktif",
          desc: "Dipakai dan dibayar pelanggan beneran.",
        },
        {
          value: "7",
          unit: " hari",
          label: "Dari brief ke live",
          desc: "Website villa online dalam sepekan.",
        },
        {
          value: "0",
          unit: "%",
          label: "Komisi OTA",
          desc: "Booking direct masuk penuh ke pemilik.",
        },
        {
          value: "24",
          unit: "/7",
          label: "Sistem bekerja",
          desc: "Tetap jalan waktu kamu tidur.",
        },
      ],
    },

    vision: {
      eyebrow: "04 · Visi & Misi",
      visionLabel: "Visi",
      visionText: "Bisnis Indonesia\nkerja pakai AI.",
      missionLabel: "Misi",
      missionPoints: [
        "Bikin produk yang dampaknya kelihatan di rupiah.",
        "Kasih UMKM teknologi selevel perusahaan besar.",
        "Jaga data pelanggan kayak jaga uang mereka sendiri.",
      ],
      offer: {
        eyebrow: "Penawaran",
        heading: "15 menit.\nGratis, no pitch.",
        sub: "Ceritain masalahnya, kita bedah bareng. Keluar dari obrolan, kamu udah pegang langkah konkret.",
        items: [
          "Audit singkat: di mana duitmu bocor",
          "Rencana 30 hari yang bisa langsung jalan",
          "Rekomendasi jujur, walau bukan produk kami",
        ],
        guarantee: "Gak cocok? Kami bilang terus terang. Gratis tetap gratis.",
        note: "Dibalas di hari yang sama.",
        cta: { label: "Ambil slot ngobrol", href: wa("id") },
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
          desc: "Tim kami di sini, sezona waktu sama kamu.",
          cost: "Tim tetap di satu kota, walau pilihan rekrutmennya jadi lebih sempit.",
        },
        {
          key: "practical",
          title: "Hasil di atas gaya",
          desc: "Fitur yang gak nambah hasil ya kami buang.",
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
      headline: "Mau ngobrol\nbentar?",
      sub: "Kirim pesan, kami bales di hari yang sama.",
      primary: { label: "Chat WhatsApp", href: wa("id") },
      secondary: { label: EMAIL, href: `mailto:${EMAIL}` },
    },

    footer: {
      blurb: "Grup teknologi asal Bali. Kami bikin dan jalanin produk AI.",
      columns: [
        {
          title: "Perusahaan",
          links: [
            { label: "Tentang", href: ROUTES.about.id },
            { label: "Manifesto", href: ROUTES.manifesto.id },
            { label: "Usaha", href: ROUTES.ventures.id },
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
      title: "Dewata AI: an AI technology group from Bali",
      description:
        "PT Dewata Artificial Intelligence builds and runs AI products for Indonesian business. Parent company of Dewata Tech and Dagangku AI.",
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
      links: [
        { label: "Ventures", href: ROUTES.ventures.en },
        { label: "About", href: ROUTES.about.en },
        { label: "Manifesto", href: ROUTES.manifesto.en },
        { label: "Journal", href: ROUTES.journal.en },
        { label: "Press", href: ROUTES.press.en },
      ],
      cta: { label: "Contact us", href: ROUTES.contact.en },
    },

    hero: {
      eyebrow: "PT Dewata Artificial Intelligence",
      titleTop: "We build it.",
      titleAccent: "We run it.",
      sub: "AI software for Indonesian business: direct booking for villas, and automatic bookkeeping for small shops.",
      taglines: [
        "Our own products, not an agency",
        "Two ventures live today",
        "A family business from Denpasar",
      ],
      ctaPrimary: { label: "See the ecosystem", href: "#ekosistem" },
      ctaSecondary: { label: "Free 15-min chat", href: "#penawaran" },
      demo: {
        eco: "Group structure",
        active: "Active",
        parentMeta: "Parent company",
        techDesc: "Villa websites & booking",
        dagangDesc: "SME business assistant",
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
      "Indonesian SMEs",
      "Bali",
      "Indonesia",
    ],

    about: {
      eyebrow: "01 · About",
      heading: "Holding company,\nnot an agency.",
      imageAlt: "The Dewata AI team in Bali",
      paragraphs: [
        "Dewata AI owns and runs its own software products out of Bali.",
        "Each venture has its own team, product, and customers.",
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
      heading: "Four areas\nwe work in.",
      sub: "All of it already shipped as product, not research on a slide.",
      proofLabel: "Proven in",
      items: [
        {
          key: "brain",
          title: "AI Products",
          desc: "AI apps that do real work from day one.",
          proof: "Dagangku AI",
        },
        {
          key: "code",
          title: "Web & Engineering",
          desc: "Websites and booking engines that close orders.",
          proof: "Dewata Tech",
        },
        {
          key: "automation",
          title: "Automation",
          desc: "Manual work moved into a system that runs itself.",
          proof: "Both ventures",
        },
        {
          key: "research",
          title: "Applied Research",
          desc: "New models get tested before they reach a product.",
          proof: "Internal testing",
        },
      ],
    },

    ventures: {
      eyebrow: "03 · Ecosystem",
      heading: "Two live now.\nOne building.",
      sub: "Each venture solves one expensive problem.",
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
          desc: "Websites and booking engines for villas. Live in 7 days.",
          features: [
            "Villa websites built to close bookings",
            "Direct booking and online payment",
            "Channel manager integration",
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
          desc: "A chat-based bookkeeping assistant for small business. No install, no Excel.",
          features: [
            "Log a sale as fast as sending a chat",
            "Profit and loss visible today",
            "PDF reports ready to use",
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
        tag: "Coming soon",
        status: "In the works",
        desc: "We are hunting for the next expensive problem.",
        cta: "Tell us the problem",
        href: "#kontak",
      },
    },

    stats: {
      eyebrow: "Proof",
      heading: "Numbers we\ncan back up.",
      items: [
        {
          value: "2",
          unit: "",
          label: "Ventures live",
          desc: "Used and paid for by real customers.",
        },
        {
          value: "7",
          unit: " days",
          label: "From brief to live",
          desc: "A villa website online in a week.",
        },
        {
          value: "0",
          unit: "%",
          label: "OTA commission",
          desc: "Direct bookings land with the owner in full.",
        },
        {
          value: "24",
          unit: "/7",
          label: "Systems working",
          desc: "Serving your customers while you sleep.",
        },
      ],
    },

    vision: {
      eyebrow: "04 · Vision & Mission",
      visionLabel: "Vision",
      visionText: "Every business\nruns on AI.",
      missionLabel: "Mission",
      missionPoints: [
        "Build products whose impact is measured in rupiah.",
        "Give small businesses enterprise-grade technology.",
        "Guard customer data the way we would guard their money.",
      ],
      offer: {
        eyebrow: "The offer",
        heading: "15 minutes.\nFree, no pitch.",
        sub: "Tell us the problem and we break it down with you. You leave the call with concrete steps.",
        items: [
          "A quick audit of where the money leaks",
          "A 30-day plan you can start on",
          "An honest answer, even if it is not our product",
        ],
        guarantee: "Not a fit? We say so straight. Free stays free.",
        note: "Answered the same day.",
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
          desc: "Our team is here, in your time zone.",
          cost: "The team stays in one city, even though it narrows who we can hire.",
        },
        {
          key: "practical",
          title: "Results over polish",
          desc: "If a feature adds nothing, we cut it.",
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
      headline: "Want to talk\nit over?",
      sub: "Send a message and we reply the same day.",
      primary: { label: "Chat on WhatsApp", href: wa("en") },
      secondary: { label: EMAIL, href: `mailto:${EMAIL}` },
    },

    footer: {
      blurb: "A technology group out of Bali. We build and run AI products.",
      columns: [
        {
          title: "Company",
          links: [
            { label: "About", href: ROUTES.about.en },
            { label: "Manifesto", href: ROUTES.manifesto.en },
            { label: "Ventures", href: ROUTES.ventures.en },
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
