/**
 * Copy for every page beyond the homepage (see lib/site.ts for the homepage
 * and shared brand data).
 *
 * Same rules as site.ts: headlines are authored as exactly two lines split on
 * "\n", body copy stays short, and the Indonesian is conversational rather
 * than formal.
 */

import type { Lang } from "@/lib/i18n"

/** Ventures that get their own detail page. Order drives the index page. */
export const VENTURE_SLUGS = ["dewata-tech", "dagangku-ai"] as const
export type VentureSlug = (typeof VENTURE_SLUGS)[number]

/** Bump when the privacy policy text changes. */
export const POLICY_UPDATED = "2026-08-17"

/** Shared toolbar strings for the journal and press indexes. */
const toolbar = {
  id: {
    searchLabel: "Cari",
    searchPlaceholder: "Cari judul atau isi…",
    submit: "Cari",
    sortLabel: "Urutkan",
    sortNewest: "Terbaru",
    sortOldest: "Terlama",
    filterCategory: "Kategori",
    filterYear: "Tahun",
    all: "Semua",
    reset: "Atur ulang",
    count: (shown: number, total: number) =>
      shown === total ? `${total} tulisan` : `${shown} dari ${total} tulisan`,
    noResults: "Nggak ada yang cocok. Coba kata lain atau atur ulang filternya.",
    categories: {
      produk: "Produk",
      rekayasa: "Rekayasa",
      bisnis: "Bisnis",
      catatan: "Catatan",
    } as Record<string, string>,
  },
  en: {
    searchLabel: "Search",
    searchPlaceholder: "Search titles or text…",
    submit: "Search",
    sortLabel: "Sort",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    filterCategory: "Category",
    filterYear: "Year",
    all: "All",
    reset: "Reset",
    count: (shown: number, total: number) =>
      shown === total ? `${total} entries` : `${shown} of ${total} entries`,
    noResults: "Nothing matches. Try another word, or reset the filters.",
    categories: {
      produk: "Product",
      rekayasa: "Engineering",
      bisnis: "Business",
      catatan: "Notes",
    } as Record<string, string>,
  },
}

export function getToolbar(lang: Lang) {
  return toolbar[lang] ?? toolbar.id
}

const content = {
  id: {
    ventures: {
      meta: {
        title: "Usaha kami: Dewata Tech dan Dagangku AI | Dewata AI",
        description:
          "Dua usaha yang kami punya dan jalanin sendiri. Dewata Tech bikin villa dapet booking direct tanpa komisi. Dagangku AI bikin pembukuan beres modal chat.",
      },
      eyebrow: "Usaha",
      heading: "Yang kami punya\ndan jalankan.",
      lead: "Ini bukan portofolio investasi. Semua usaha di bawah ini kami bangun sendiri, kami jalanin sendiri, dan sampai sekarang masih kami pegang.",
      openLabel: "Lihat detail",
      visitLabel: "Kunjungi situs",
      /* The hero renders as a register of holdings: entry 03 is deliberately
         vacant, which is both the honest state and the call to action. */
      register: {
        label: "Register usaha",
        issuedBy: "Dicatat atas nama",
        columns: { no: "No", name: "Usaha", field: "Bidang", status: "Status", domain: "Domain" },
        statusActive: "Aktif",
        statusOpen: "Riset",
        vacant: {
          no: "03",
          name: "Usaha ketiga",
          field: "Keselamatan publik",
          desc: "Nyegah serangan teror di infrastruktur penting. Masih riset, belum ada produknya.",
          action: "Lihat",
        },
      },
      third: {
        index: "03",
        name: "Usaha ketiga",
        tag: "Keselamatan publik",
        headline: "Deteksi ancaman,\nbukan awasi warga.",
        desc: "Riset teknologi buat nyegah serangan teror di infrastruktur penting Indonesia: bandara, pelabuhan, pembangkit, tempat ibadah. Belum ada produk, belum ada pelanggan.",
        boundsLabel: "Batas yang kami pegang duluan",
        bounds: [
          "Dipasang cuma kalau operator lokasinya sendiri yang minta",
          "Tiap pemasangan punya dasar hukum",
          "Data ada batas simpannya",
          "Tiap akses ninggalin jejak audit",
          "Keputusan tetap di tangan orang",
          "Bukan pemantauan massal warga",
        ],
        cta: "Buka halamannya",
      },
    },

    ventureDetail: {
      "dewata-tech": {
        meta: {
          title: "Dewata Tech: booking direct villa, komisi OTA nol | Dewata AI",
          description:
            "Website plus booking engine buat villa. Live 7 hari, komisi OTA yang 15 sampai 30 persen itu langsung nol, kalender OTA tetap sinkron. Garansi 30 hari.",
        },
        eyebrow: "Usaha 01",
        headline: "Booking langsung.\nKomisi auto nol.",
        lead: "Website plus booking engine buat villa dan properti sewa. Live 7 hari, komisi OTA langsung nol.",
        problem: {
          label: "Masalahnya",
          heading: "Villa penuh, rekening tetap tipis.",
          body: [
            "Tiap booking lewat OTA motong 15% sampai 30% pendapatan sebelum duitnya nyampe ke pemilik.",
            "Villa dengan omzet Rp100 juta sebulan bisa kehilangan Rp20 juta cuma dari komisi. Tiap bulan, selamanya.",
          ],
          cost: { value: "15-30%", label: "Pendapatan yang lari ke OTA" },
        },
        solution: {
          label: "Yang kami bangun",
          heading: "Jalur booking punya sendiri.",
          items: [
            {
              icon: "site",
              title: "Website yang nutup booking",
              desc: "Bukan brosur online. Semua halaman diarahin ke satu tujuan: tamu klik pesan.",
            },
            {
              icon: "booking",
              title: "Booking engine direct",
              desc: "Tamu pilih tanggal, bayar online, konfirmasi otomatis. Nol perantara.",
            },
            {
              icon: "sync",
              title: "Integrasi channel manager",
              desc: "Kalender OTA sama direct tetap sinkron, jadi kamar gak pernah double booking.",
            },
            {
              icon: "seo",
              title: "Brand SEO dan chatbot AI",
              desc: "Tamu yang cari nama villa kamu ketemu situsmu duluan, bukan listing OTA.",
            },
          ],
        },
        forWho: {
          label: "Cocok buat",
          items: ["Villa dan guest house", "Properti sewa harian", "Bisnis hospitality kecil"],
        },
        cta: {
          heading: "Mau lihat versinya buat villa kamu?",
          body: "Dewata Tech punya tim sama situsnya sendiri. Detail harga dan portofolionya lengkap di sana.",
          label: "Buka dewatatech.com",
        },
      },

      "dagangku-ai": {
        meta: {
          title: "Dagangku AI: pembukuan modal chat, bukan wrapper | Dewata AI",
          description:
            "Catat transaksi secepat kirim chat, untung rugi kelihatan hari itu juga. Bukan wrapper ChatGPT: kami pegang pembukuannya plus korpus koreksi bahasa warung.",
        },
        eyebrow: "Usaha 02",
        headline: "Satu chat.\nPembukuan beres.",
        lead: "Pembukuan lewat chat buat pemilik bisnis. Gak perlu install, gak perlu Excel, gak perlu ngerti akuntansi.",
        problem: {
          label: "Masalahnya",
          heading: "Jualan tiap hari, untungnya gak tahu.",
          body: [
            "Kebanyakan pemilik usaha gak tahu untung aslinya berapa, soalnya nyatet itu ribet dan gampang kelewat.",
            "Tanpa catatan yang rapi, gak ada dasar buat naikin harga, ajuin modal, atau tahu produk mana yang diam-diam bikin rugi.",
          ],
          cost: { value: "0", label: "Catatan yang biasanya dipegang pemilik bisnis" },
        },
        solution: {
          label: "Yang kami bangun",
          heading: "Pembukuan yang jalan dari chat.",
          items: [
            {
              icon: "chat",
              title: "Catat secepat kirim chat",
              desc: 'Ketik "jual nasi goreng 25rb". AI yang urus kategori, tanggal, dan angkanya.',
            },
            {
              icon: "profit",
              title: "Untung rugi hari ini",
              desc: "Bukan nunggu akhir bulan. Tanya kapan aja, jawabannya langsung keluar.",
            },
            {
              icon: "stock",
              title: "Stok dan utang kepantau",
              desc: "Barang menipis sama tagihan jatuh tempo diingetin duluan, sebelum telat.",
            },
            {
              icon: "report",
              title: "Laporan PDF siap pakai",
              desc: "Buat ajuin modal atau sekadar tahu posisi bisnis, tinggal unduh.",
            },
          ],
        },
        /* The "you are just a ChatGPT wrapper" answer, said in public instead of
           only in the investor deck. Every claim below maps to something that
           already runs in the Dagangku codebase, and the one that does not is
           labelled as a design. Source of truth:
           dagangkuai/docs/strategy/DATA-MOAT-AND-DEFENSIBILITY.md */
        moat: {
          label: "Kenapa gak gampang ditiru",
          heading: "Wrapper jual chat.\nKami jual pembukuan.",
          body: [
            "Kotak chat gak nyimpen apa-apa. Pindah dari situ cuma butuh satu menit.",
            "Pembukuan itu catatan resmi usaha kamu: kwitansi bernomor urut yang udah sampai ke pelanggan, stok, kasbon, gaji, laporan SAK EMKM, hitungan PPh Final. Pindah dari situ berarti ninggalin riwayat usaha sendiri.",
          ],
          items: [
            {
              title: "Korpus koreksi bahasa warung",
              desc: "Tiap kali kamu benerin catatan yang AI-nya keliru, versi sebelum dan sesudahnya kami simpan. Data bahasa warung yang dipetakan ke jurnal akuntansi kayak gini gak dijual di mana pun.",
              status: "Jalan",
              live: true,
            },
            {
              title: "Konteks usaha kamu sendiri",
              desc: "Sebelum jawab, AI-nya baca dulu tren omzet, margin, dan kategori teratas usaha kamu. Makin lama kamu nyatet, makin nyambung jawabannya.",
              status: "Jalan",
              live: true,
            },
            {
              title: "13 lapis operasi harian",
              desc: "Kasir, kwitansi, stok, kasbon, gaji, aset, pajak, sampai antrean offline pas sinyal ilang. Yang susah ditiru bukan satu fiturnya, tapi semuanya yang saling ngunci.",
              status: "Jalan",
              live: true,
            },
            {
              title: "Buku besar tersambung",
              desc: "Kalau dua usaha sama-sama pakai Dagangku dan dua-duanya setuju, piutang di satu sisi ketemu utang di sisi lain. Ini masih rancangan, belum jalan.",
              status: "Rancangan",
              live: false,
            },
          ],
          limit: {
            label: "Batasnya",
            body: "Data kamu gak kami sandera: ekspor penuh selalu ada. Koreksi kamu dipakai buat ngukur model mana yang paling akurat buat bahasa Indonesia, bukan buat ngelatih model dari data usaha kamu.",
          },
        },
        forWho: {
          label: "Cocok buat",
          items: ["Warung dan toko", "Usaha jasa dan agency", "Pekerja lepas"],
        },
        cta: {
          heading: "Mau coba sendiri?",
          body: "Dagangku AI gratis buat mulai. Buka chatnya, catat transaksi pertama kamu, kelar.",
          label: "Buka dagangkuai.com",
        },
      },
    },

    about: {
      meta: {
        title: "Tentang Dewata AI: induk, bukan agensi | Dewata AI",
        description:
          "PT Dewata Artificial Intelligence punya dan jalanin Dewata Tech sama Dagangku AI dari Denpasar, Bali. Kami gak jualan jasa, produknya kami yang punya.",
      },
      eyebrow: "Tentang",
      heading: "Induk, bukan\nagensi.",
      lead: "Dewata AI bukan penyedia jasa yang ngerjain proyek orang. Produknya punya kami, kami yang jalanin, dan kami juga yang nanggung risikonya.",
      model: {
        label: "Cara kami kerja",
        heading: "Tiga tahap, tanpa lompatan.",
        steps: [
          {
            index: "01",
            title: "Bangun",
            desc: "Kami cari satu masalah yang mahal dan berulang, terus bikin produknya sampai beneran dipakai.",
          },
          {
            index: "02",
            title: "Jalankan",
            desc: "Produk yang jalan butuh operator, bukan cuma developer. Tim kami yang pegang hariannya.",
          },
          {
            index: "03",
            title: "Tumbuhkan",
            desc: "Kami pegang usahanya lama. Gak dijual buru-buru, gak ditinggal setengah jalan.",
          },
        ],
      },
      entity: {
        label: "Badan hukum",
        heading: "Terdaftar dan bisa dicek.",
        body: "Perusahaan ini berbadan hukum resmi. Nomor induk dan sertifikat pendiriannya bisa kamu verifikasi sendiri.",
        rows: [
          { label: "Nama badan hukum", key: "legalName" },
          { label: "Bentuk", key: "legalForm" },
          { label: "NIB", key: "nib" },
          { label: "Alamat terdaftar", key: "address" },
        ],
        certLabel: "Lihat sertifikat pendirian AHU",
      },
      team: {
        label: "Keluarga Ksatriawarma",
        heading: "Dua bersaudara.",
        intro: "Dewata AI dijalankan langsung sama pendirinya: satu pegang sisi bisnis, satu pegang sisi teknis. Usaha keluarga, jadi rentang waktunya panjang, kami bukan lagi bangun sesuatu buat dijual cepat.",
        /* Bagian ini otomatis tersembunyi kalau array-nya kosong. */
        members: [
          {
            name: "Anak Agung Gde Weida Ksatriawarma",
            initials: "WD",
            role: "Pendiri & CEO",
            bio: "Pegang arah grup, penjualan, dan pemasaran. Yang mutusin usaha mana yang layak dibangun berikutnya, dan yang duduk langsung sama pelanggan.",
            // TODO: isi URL LinkedIn kalau mau ditampilkan.
            linkedin: undefined,
          },
          {
            name: "Anak Agung Gde Wijaya Ksatriawarma",
            initials: "WJ",
            role: "Co-founder",
            bio: "Pegang sisi teknis grup. Yang bangun produknya dan jaga supaya tetap jalan, dari kode sampai sistem yang nyala 24 jam.",
            linkedin: undefined,
          },
        ] as {
          name: string
          initials: string
          role: string
          bio: string
          linkedin?: string
        }[],
      },
    },

    manifesto: {
      meta: {
        title: "Manifesto Dewata AI: yang kami bangun dan yang kami tolak",
        description:
          "Sembilan prinsip yang nentuin apa yang kami bangun dan apa yang kami tolak: masalah dulu, menang total di pasar kecil, dan yang numpuk tiap hari itu produknya.",
      },
      eyebrow: "Manifesto",
      heading: "Apa yang kami\npercaya.",
      lead: "Ini bukan nilai-nilai buat dipajang di dinding. Ini saringan yang kami pakai tiap kali mutusin bikin sesuatu atau nolak sesuatu.",
      points: [
        {
          index: "01",
          title: "Masalah dulu, teknologi belakangan.",
          body: "Kami gak mulai dari model AI terbaru. Kami mulai dari kerjaan yang tiap bulan makan waktu dan uang orang. Kalau masalahnya gak mahal, secanggih apa pun teknologinya gak ada gunanya.",
        },
        {
          index: "02",
          title: "Kalau gak kelihatan di rupiah, itu bukan hasil.",
          body: "Fitur yang keren tapi gak nambah pemasukan atau gak ngurangin jam kerja itu beban, bukan nilai. Kami buang.",
        },
        {
          index: "03",
          title: "Software harus bisa dipakai tanpa pelatihan.",
          body: "Pemilik warung gak punya waktu buat kursus. Kalau produk kami butuh manual, berarti kami yang belum selesai kerja.",
        },
        {
          index: "04",
          title: "Kami punya, bukan sekadar bikin.",
          body: "Agensi selesai pas invoice dibayar. Kami masih di sini lima tahun lagi, ngurusin server, pelanggan, dan bug yang muncul jam dua pagi. Itu bedanya.",
        },
        {
          index: "05",
          title: "Jujur lebih mahal daripada closing.",
          body: "Kalau produk kami bukan jawabannya, kami bilang. Satu penjualan yang batal jauh lebih murah daripada satu pelanggan yang nyesel.",
        },
        {
          index: "06",
          title: "Kelas dunia bisa lahir dari Bali.",
          body: "Kami gak perlu pindah ke Jakarta atau Singapura buat bikin software yang bagus. Timnya di sini, pelanggannya di sini, standarnya tetap global.",
        },
        {
          index: "07",
          title: "Kami nyari yang belum kelihatan orang.",
          body: "Pasar yang rame itu tandanya jawabannya udah ketemu semua orang, dan sisanya cuma rebutan harga. Kami milih masalah yang dianggap kekecilan atau keribetan, karena di situ masih ada yang bisa dimenangin.",
        },
        {
          index: "08",
          title: "Menang total di pasar kecil dulu.",
          body: "Warung dan usaha kecil di Bali dulu, sampai bener-bener kepakai tiap hari, baru melebar. Jadi pilihan nomor sepuluh di pasar gede itu cuma kalah pelan-pelan.",
        },
        {
          index: "09",
          title: "Yang numpuk tiap hari itu produknya.",
          body: "Fitur bisa disalin dalam sebulan. Data yang lahir dari orang benerin pembukuannya sendiri tiap hari gak bisa dibeli dan gak bisa dikarang. Itu yang kami kejar, bukan jumlah fitur.",
        },
      ],
      closing: {
        heading: "Kalau ini kedengeran masuk akal buat kamu, kita mungkin cocok kerja bareng.",
        cta: "Ngobrol 15 menit",
      },
    },

    journal: {
      meta: {
        title: "Jurnal Dewata AI: catatan dari ruang kerja",
        description:
          "Catatan tim Dewata AI soal bangun dan jalanin produk AI buat bisnis Indonesia. Ditulis pas masih anget, bukan pas udah keburu jadi teori.",
      },
      eyebrow: "Jurnal",
      heading: "Catatan dari\nruang kerja.",
      lead: "Apa yang kami pelajari sambil bangun dan jalanin produk. Ditulis pas masih hangat, bukan pas udah jadi teori.",
    },

    press: {
      meta: {
        title: "Siaran Pers Dewata AI: kabar resmi perusahaan",
        description:
          "Siaran pers resmi PT Dewata Artificial Intelligence, lengkap sama kontak media dan data perusahaan. Buat jurnalis, mitra, dan calon investor.",
      },
      eyebrow: "Siaran Pers",
      heading: "Pengumuman\nresmi.",
      lead: "Rilis resmi dari perusahaan. Bebas dikutip. Untuk wawancara atau aset media, hubungi kontak di bawah.",
      contactLabel: "Kontak media",
      boilerplateLabel: "Tentang Dewata AI",
      datelineLabel: "Terbit",
    },

    contact: {
      meta: {
        title: "Kontak Dewata AI: ngobrol 15 menit, gratis",
        description:
          "Ceritain masalah yang paling bikin pusing di bisnis kamu, kita bedah bareng 15 menit. Gratis, tanpa pitch, dan biasanya kebales di hari yang sama.",
      },
      eyebrow: "Kontak",
      heading: "Ngobrol dulu,\ngratis kok.",
      lead: "Ceritain masalahnya, kita bedah bareng. Gak ada presentasi jualan, gak ada biaya, gak ada jebakan.",
      channels: {
        label: "Jalur langsung",
        items: [
          { key: "whatsapp", title: "WhatsApp", desc: "Paling gercep. Biasanya kebales hari itu juga." },
          { key: "email", title: "Email", desc: "Buat yang butuh lampiran atau jejak tertulis." },
          { key: "office", title: "Kantor", desc: "Denpasar, Bali. Mau ketemu langsung juga bisa." },
        ],
      },
      steps: {
        label: "Setelah kamu kirim pesan",
        items: [
          { index: "01", title: "Kami bales hari itu juga", desc: "Bukan bot, bukan template." },
          { index: "02", title: "Ngobrol 15 menit", desc: "Kamu cerita, kami tanya balik seperlunya." },
          {
            index: "03",
            title: "Kamu dapat jawaban jujur",
            desc: "Termasuk kalau jawabannya bukan produk kami.",
          },
        ],
      },
    },

    privacy: {
      meta: {
        title: "Kebijakan Privasi | Dewata AI",
        description:
          "Data apa yang kami kumpulkan lewat situs ini, kenapa disimpan, berapa lama, siapa yang bisa mengaksesnya, dan cara kamu minta data itu dihapus.",
      },
      eyebrow: "Legal",
      heading: "Kebijakan\nPrivasi.",
      updatedLabel: "Terakhir diperbarui",
      lead: "Halaman ini menjelaskan data apa yang kami terima lewat dewataai.com, kenapa kami menyimpannya, dan apa hak kamu atas data itu.",
      sections: [
        {
          title: "Data yang kami kumpulkan",
          body: [
            "Situs ini tidak punya formulir pendaftaran dan tidak meminta data pribadi untuk dibaca isinya.",
            "Data hanya masuk kalau kamu menghubungi kami duluan: nama, nomor WhatsApp atau alamat email, dan apa pun yang kamu tulis dalam pesan itu.",
            "Seperti hampir semua situs, server juga mencatat data teknis standar seperti alamat IP, jenis browser, dan halaman yang dibuka.",
          ],
        },
        {
          title: "Kenapa kami menyimpannya",
          body: [
            "Untuk membalas pesan kamu dan melanjutkan pembicaraan yang sudah dimulai.",
            "Untuk memahami halaman mana yang berguna, lewat statistik kunjungan yang bersifat agregat.",
            "Kami tidak menjual data kamu, dan tidak menukarnya dengan pihak lain.",
          ],
        },
        {
          title: "Berapa lama disimpan",
          body: [
            "Percakapan yang tidak berlanjut jadi kerja sama kami hapus paling lama 12 bulan setelah kontak terakhir.",
            "Data pelanggan aktif disimpan selama hubungan kerja sama berjalan, dan setelahnya sesuai kewajiban pembukuan yang berlaku.",
          ],
        },
        {
          title: "Siapa yang bisa mengakses",
          body: [
            "Hanya orang di dalam PT Dewata Artificial Intelligence yang memang butuh untuk membalas kamu.",
            "Beberapa layanan pihak ketiga ikut memproses data ini sebagai bagian dari operasional, misalnya penyedia email, WhatsApp, hosting situs, dan alat statistik kunjungan.",
          ],
        },
        {
          title: "Cookie",
          body: [
            "Situs ini tidak memakai cookie iklan dan tidak memasang pelacak lintas situs untuk profil pribadi.",
            "Preferensi tampilan seperti mode terang atau gelap disimpan di perangkat kamu sendiri, bukan di server kami.",
          ],
        },
        {
          title: "Hak kamu",
          body: [
            "Kamu boleh minta salinan data kamu, minta diperbaiki kalau ada yang salah, atau minta dihapus seluruhnya.",
            "Kirim permintaannya ke email di bawah. Kami tanggapi paling lama 14 hari kerja.",
          ],
        },
        {
          title: "Perubahan kebijakan",
          body: [
            "Kalau kebijakan ini berubah, tanggal di atas ikut diperbarui. Perubahan besar akan kami sampaikan langsung ke pelanggan aktif.",
          ],
        },
      ],
      contactHeading: "Pertanyaan soal data kamu?",
      contactBody: "Kirim ke alamat di bawah, atau lewat WhatsApp resmi kami.",
    },
  },

  en: {
    ventures: {
      meta: {
        title: "Our ventures: Dewata Tech and Dagangku AI | Dewata AI",
        description:
          "Two companies we own and run ourselves. Dewata Tech gets villas booked direct with no commission. Dagangku AI closes a business's books from a chat.",
      },
      eyebrow: "Ventures",
      heading: "What we own\nand operate.",
      lead: "This is not an investment portfolio. We built each of these ourselves, we run them ourselves, and we still hold every one.",
      openLabel: "See details",
      visitLabel: "Visit site",
      register: {
        label: "Register of holdings",
        issuedBy: "Held by",
        columns: { no: "No", name: "Venture", field: "Field", status: "Status", domain: "Domain" },
        statusActive: "Active",
        statusOpen: "Research",
        vacant: {
          no: "03",
          name: "Third venture",
          field: "Public safety",
          desc: "Preventing terror attacks on critical infrastructure. Still research, no product yet.",
          action: "View",
        },
      },
      third: {
        index: "03",
        name: "Third venture",
        tag: "Public safety",
        headline: "Threat detection,\nnot watching people.",
        desc: "Researching technology to prevent terror attacks on Indonesia's critical infrastructure: airports, ports, power plants, places of worship. No product and no customer yet.",
        boundsLabel: "Limits written first",
        bounds: [
          "Deployed only where the site operator asks for it",
          "A legal basis for every deployment",
          "Data carries a retention limit",
          "Every access leaves an audit trail",
          "Decisions stay with people",
          "Not population-scale monitoring",
        ],
        cta: "Open the page",
      },
    },

    ventureDetail: {
      "dewata-tech": {
        meta: {
          title: "Dewata Tech: direct villa bookings, zero OTA commission",
          description:
            "A website and booking engine for villas. Live in 7 days, the 15 to 30 percent OTA commission goes to zero, calendars stay in sync. 30-day guarantee.",
        },
        eyebrow: "Venture 01",
        headline: "Book direct.\nZero commission.",
        lead: "Websites plus a booking engine for villas and short-stay rentals. Live in 7 days, OTA commission straight to zero.",
        problem: {
          label: "The problem",
          heading: "Full villa, thin bank account.",
          body: [
            "Every OTA booking takes 15% to 30% of the revenue before it ever reaches the owner.",
            "A villa doing Rp100 million a month loses Rp20 million to commission alone. Every month, forever.",
          ],
          cost: { value: "15-30%", label: "Of revenue lost to the OTA" },
        },
        solution: {
          label: "What we built",
          heading: "A booking channel you own.",
          items: [
            {
              icon: "site",
              title: "A site built to close",
              desc: "Not an online brochure. Every page drives at one action: the guest books.",
            },
            {
              icon: "booking",
              title: "Direct booking engine",
              desc: "Guests pick dates, pay online, get confirmed automatically. Zero middleman.",
            },
            {
              icon: "sync",
              title: "Channel manager integration",
              desc: "OTA and direct calendars stay in sync, so rooms never double book.",
            },
            {
              icon: "seo",
              title: "Brand SEO and an AI chatbot",
              desc: "Guests searching your villa name find your site first, not an OTA listing.",
            },
          ],
        },
        forWho: {
          label: "Built for",
          items: ["Villas and guest houses", "Short-stay rentals", "Small hospitality operators"],
        },
        cta: {
          heading: "Want to see it for your villa?",
          body: "Dewata Tech has its own team and its own site. Full pricing and portfolio live there.",
          label: "Open dewatatech.com",
        },
      },

      "dagangku-ai": {
        meta: {
          title: "Dagangku AI: bookkeeping from a chat, not a wrapper",
          description:
            "Log a sale as fast as sending a message and see profit the same day. Not a ChatGPT wrapper: we hold the actual books plus a correction corpus in Indonesian.",
        },
        eyebrow: "Venture 02",
        headline: "One chat.\nBooks done.",
        lead: "Bookkeeping over chat for business owners. No install, no Excel, no accounting degree.",
        problem: {
          label: "The problem",
          heading: "Selling daily, profit unknown.",
          body: [
            "Most owners have no idea what they actually earn, because recording it is tedious and easy to skip.",
            "Without clean records there is no basis to raise prices, apply for capital, or catch the product that is quietly losing money.",
          ],
          cost: { value: "0", label: "Records most business owners keep" },
        },
        solution: {
          label: "What we built",
          heading: "Bookkeeping that runs from a chat.",
          items: [
            {
              icon: "chat",
              title: "Log it like a message",
              desc: 'Type "sold fried rice 25k". The AI handles category, date, and the numbers.',
            },
            {
              icon: "profit",
              title: "Profit and loss today",
              desc: "Not at month end. Ask whenever and the answer comes straight back.",
            },
            {
              icon: "stock",
              title: "Stock and debts tracked",
              desc: "Low stock and due invoices get flagged before they bite you.",
            },
            {
              icon: "report",
              title: "PDF reports ready to use",
              desc: "For a loan application, or just to know where the business stands.",
            },
          ],
        },
        moat: {
          label: "Why it is hard to copy",
          heading: "Wrappers sell chat.\nWe sell your books.",
          body: [
            "A chat box stores nothing, so walking away from one takes a minute.",
            "A set of books is the official record of a business: numbered receipts already in your customers' hands, stock, IOUs, payroll, SAK EMKM statements, final income tax. Walking away from that means leaving your own history behind.",
          ],
          items: [
            {
              title: "A correction corpus in shop-floor Indonesian",
              desc: "Every time you fix a line the AI got wrong, we keep the before and the after. Nobody sells a dataset that maps warung language to accounting entries.",
              status: "Live",
              live: true,
            },
            {
              title: "The context of your own business",
              desc: "Before it answers, the AI reads your revenue trend, margin, and top categories. The longer you record, the closer the answers sit to your business.",
              status: "Live",
              live: true,
            },
            {
              title: "Thirteen layers of daily operations",
              desc: "Register, receipts, stock, IOUs, payroll, assets, tax, down to an offline queue when the signal drops. The hard part to copy is not one feature, it is how they lock into each other.",
              status: "Live",
              live: true,
            },
            {
              title: "Connected ledgers",
              desc: "When two businesses both use Dagangku and both agree, a receivable on one side meets a payable on the other. This is a design, not a shipped feature.",
              status: "In design",
              live: false,
            },
          ],
          limit: {
            label: "The limits",
            body: "We do not hold your data hostage: a full export is always there. Your corrections are used to measure which model is most accurate in Indonesian, not to train a model on your business data.",
          },
        },
        forWho: {
          label: "Built for",
          items: ["Shops and food stalls", "Service businesses and agencies", "Freelancers"],
        },
        cta: {
          heading: "Want to try it?",
          body: "Dagangku AI is free to start. Open the chat, log your first transaction, done.",
          label: "Open dagangkuai.com",
        },
      },
    },

    about: {
      meta: {
        title: "About Dewata AI: an owner, not an agency",
        description:
          "PT Dewata Artificial Intelligence owns and runs Dewata Tech and Dagangku AI out of Denpasar, Bali. We do not sell services, we run our own products.",
      },
      eyebrow: "About",
      heading: "Holding company,\nnot an agency.",
      lead: "Dewata AI is not a service shop delivering other people's projects. We own the products, we run them, and we carry the risk.",
      model: {
        label: "How we work",
        heading: "Three stages, no shortcuts.",
        steps: [
          {
            index: "01",
            title: "Build",
            desc: "We find one expensive, repeating problem and build the product until people actually use it.",
          },
          {
            index: "02",
            title: "Run",
            desc: "A live product needs operators, not just developers. Our team handles the day to day.",
          },
          {
            index: "03",
            title: "Grow",
            desc: "We hold each venture for the long run. Not flipped, not abandoned halfway.",
          },
        ],
      },
      entity: {
        label: "Legal entity",
        heading: "Registered and verifiable.",
        body: "The company is formally incorporated. The business number and incorporation certificate can be checked independently.",
        rows: [
          { label: "Legal name", key: "legalName" },
          { label: "Form", key: "legalForm" },
          { label: "NIB", key: "nib" },
          { label: "Registered address", key: "address" },
        ],
        certLabel: "View AHU incorporation certificate",
      },
      team: {
        label: "The Ksatriawarma family",
        heading: "Two brothers.",
        intro: "Dewata AI is run by the people who founded it: one on the business side, one on the technical side. A family business, so the horizon is long, we are not building something to flip.",
        members: [
          {
            name: "Anak Agung Gde Weida Ksatriawarma",
            initials: "WD",
            role: "Founder & CEO",
            bio: "Runs direction, sales and marketing for the group. Decides which venture is worth building next, and is the one sitting across from the customer.",
            linkedin: undefined,
          },
          {
            name: "Anak Agung Gde Wijaya Ksatriawarma",
            initials: "WJ",
            role: "Co-founder",
            bio: "Runs the technical side of the group. Builds the products and keeps them running, from the code to the systems that stay up around the clock.",
            linkedin: undefined,
          },
        ] as {
          name: string
          initials: string
          role: string
          bio: string
          linkedin?: string
        }[],
      },
    },

    manifesto: {
      meta: {
        title: "Dewata AI manifesto: what we build and what we refuse",
        description:
          "Nine principles that decide what we build and what we turn down: problem first, win one small market completely, and what compounds daily is the product.",
      },
      eyebrow: "Manifesto",
      heading: "What we\nbelieve.",
      lead: "These are not values for a wall poster. This is the filter we run every decision through, both what to build and what to refuse.",
      points: [
        {
          index: "01",
          title: "Problem first, technology second.",
          body: "We do not start from the newest AI model. We start from the job that eats someone's time and money every month. If the problem is not expensive, no amount of technology makes it worth building.",
        },
        {
          index: "02",
          title: "If it does not show up in rupiah, it is not a result.",
          body: "A clever feature that adds no income and saves no hours is a liability, not value. We cut it.",
        },
        {
          index: "03",
          title: "Software should work without training.",
          body: "A shop owner has no time for a course. If our product needs a manual, we have not finished the work.",
        },
        {
          index: "04",
          title: "We own it, we do not just ship it.",
          body: "An agency is done when the invoice clears. We are still here five years later, minding servers, customers, and the bug that surfaces at two in the morning. That is the difference.",
        },
        {
          index: "05",
          title: "Honesty costs less than a closed deal.",
          body: "If our product is not the answer, we say so. One lost sale is far cheaper than one customer who regrets it.",
        },
        {
          index: "06",
          title: "World class can come out of Bali.",
          body: "We do not need to move to Jakarta or Singapore to build good software. The team is here, the customers are here, and the standard stays global.",
        },
        {
          index: "07",
          title: "We look where nobody else is looking.",
          body: "A crowded market means everyone already found the answer and the rest is a fight over price. We pick the problems others call too small or too messy, because that is where something is still there to win.",
        },
        {
          index: "08",
          title: "Win one small market completely first.",
          body: "Warungs and small businesses in Bali first, until it is genuinely used every day, and only then widen. Being the tenth option in a huge market is just losing slowly.",
        },
        {
          index: "09",
          title: "What compounds daily is the product.",
          body: "Features can be copied in a month. Data born from people correcting their own books every day cannot be bought and cannot be faked. That is what we chase, not the feature count.",
        },
      ],
      closing: {
        heading: "If that sounds right to you, we might be a good fit.",
        cta: "Free 15-minute chat",
      },
    },

    journal: {
      meta: {
        title: "Dewata AI journal: notes from the workshop",
        description:
          "Notes from the Dewata AI team on building and running AI products for Indonesian business. Written while it is still fresh, not once it hardened into theory.",
      },
      eyebrow: "Journal",
      heading: "Notes from\nthe workshop.",
      lead: "What we learn while building and running the products. Written while it is still fresh, not once it has hardened into theory.",
    },

    press: {
      meta: {
        title: "Dewata AI press releases: official company news",
        description:
          "Official press releases from PT Dewata Artificial Intelligence, with media contact and company details. For journalists, partners, and prospective investors.",
      },
      eyebrow: "Press",
      heading: "Official\nannouncements.",
      lead: "Releases straight from the company. Free to quote. For interviews or media assets, use the contact below.",
      contactLabel: "Media contact",
      boilerplateLabel: "About Dewata AI",
      datelineLabel: "Published",
    },

    contact: {
      meta: {
        title: "Contact Dewata AI: 15 free minutes, no pitch",
        description:
          "Tell us the problem that hurts most in your business and we break it down with you in 15 minutes. Free, no pitch, and usually answered the same day.",
      },
      eyebrow: "Contact",
      heading: "Got 15 minutes?\nIt is free.",
      lead: "Tell us the problem and we break it down with you. No sales deck, no fee, no catch.",
      channels: {
        label: "Direct lines",
        items: [
          { key: "whatsapp", title: "WhatsApp", desc: "Fastest route. Usually answered the same day." },
          { key: "email", title: "Email", desc: "For anything needing attachments or a paper trail." },
          { key: "office", title: "Office", desc: "Denpasar, Bali. Meeting in person can be arranged." },
        ],
      },
      steps: {
        label: "After you send it",
        items: [
          { index: "01", title: "We reply the same day", desc: "Not a bot, not a template." },
          { index: "02", title: "A 15-minute call", desc: "You talk, we ask just enough back." },
          {
            index: "03",
            title: "You get a straight answer",
            desc: "Including when the answer is not our product.",
          },
        ],
      },
    },

    privacy: {
      meta: {
        title: "Privacy Policy | Dewata AI",
        description:
          "What data this site collects, why we keep it, how long we keep it, who can access it, and how to ask us to delete all of it.",
      },
      eyebrow: "Legal",
      heading: "Privacy\nPolicy.",
      updatedLabel: "Last updated",
      lead: "This page explains what data reaches us through dewataai.com, why we keep it, and what rights you have over it.",
      sections: [
        {
          title: "What we collect",
          body: [
            "This site has no sign-up form and asks for nothing personal in order to read it.",
            "Data only arrives when you contact us first: your name, a WhatsApp number or email address, and whatever you write in that message.",
            "Like nearly every site, the server also records standard technical data such as IP address, browser type, and pages visited.",
          ],
        },
        {
          title: "Why we keep it",
          body: [
            "To reply to you and continue a conversation you started.",
            "To understand which pages are useful, through aggregate visit statistics.",
            "We do not sell your data, and we do not trade it with anyone.",
          ],
        },
        {
          title: "How long we keep it",
          body: [
            "Conversations that do not turn into work are deleted no later than 12 months after the last contact.",
            "Active customer data is kept for the length of the working relationship, and afterwards only as long as accounting obligations require.",
          ],
        },
        {
          title: "Who can access it",
          body: [
            "Only people inside PT Dewata Artificial Intelligence who need it to answer you.",
            "Some third-party services process this data as part of normal operations, for example our email provider, WhatsApp, site hosting, and visit analytics.",
          ],
        },
        {
          title: "Cookies",
          body: [
            "This site uses no advertising cookies and sets no cross-site trackers for personal profiling.",
            "Display preferences such as light or dark mode are stored on your own device, not on our servers.",
          ],
        },
        {
          title: "Your rights",
          body: [
            "You can ask for a copy of your data, ask us to correct it, or ask us to delete all of it.",
            "Send the request to the address below. We respond within 14 working days.",
          ],
        },
        {
          title: "Changes to this policy",
          body: [
            "If this policy changes, the date above changes with it. Material changes are communicated directly to active customers.",
          ],
        },
      ],
      contactHeading: "Questions about your data?",
      contactBody: "Send them to the address below, or through our official WhatsApp.",
    },
  },
} as const

export function getPages(lang: Lang) {
  return content[lang] ?? content.id
}

export type Pages = (typeof content)["id"]
