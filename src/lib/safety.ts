/**
 * The third venture, at research stage.
 *
 * This page exists to be specific in both directions. It names what the work
 * is for, and it names what the work will not become, with the same weight.
 * The limits are not a disclaimer at the bottom; they are section 03, and they
 * are the reason an infrastructure operator or a regulator can read the rest
 * of it without flinching.
 *
 * If this copy is ever edited, the limits stay. They are the product decision.
 */

import type { Lang } from "@/lib/i18n"

const content = {
  id: {
    meta: {
      title: "Keselamatan publik: nyegah serangan di infrastruktur penting",
      description:
        "Usaha ketiga Dewata AI, masih tahap riset. Deteksi ancaman di bandara, pelabuhan, dan pembangkit, dengan batas yang ditulis duluan. Bukan pemantauan massal warga.",
    },
    eyebrow: "Usaha ketiga · Riset",
    heading: "Nyegah serangan\nsebelum kejadian.",
    lead: "Riset kami buat infrastruktur penting Indonesia. Belum ada produk, belum ada pelanggan, dan batasnya udah ditulis duluan.",
    meta_: "Tahap riset. Belum ada yang dijual.",

    statement: "Batasnya ditulis dulu.\nBaru kodenya.",

    problem: {
      label: "01 · Masalahnya",
      heading: "Yang dijaga\nkebanyakan manual.",
      body: [
        "Bandara, pelabuhan, pembangkit, sama tempat ibadah dijaga sama petugas yang harus melototin belasan layar sekaligus. Manusia capek, dan yang kelewat biasanya justru yang penting.",
        "Yang kami riset: sistem yang manggil petugas cuma pas ada yang beneran janggal. Bukan yang ngerekam semua orang terus disimpan.",
      ],
    },

    scope: {
      label: "02 · Ruang lingkup",
      heading: "Di lokasinya,\nbukan di kotanya.",
      items: [
        {
          key: "perimeter",
          title: "Cuma perimeter lokasi",
          body: "Pagar, gerbang, dan area terbatas yang dimiliki operator lokasi itu sendiri.",
        },
        {
          key: "anomaly",
          title: "Anomali, bukan identitas",
          body: "Yang dicari kejadian yang janggal. Bukan siapa orangnya.",
        },
        {
          key: "human",
          title: "Petugas yang mutusin",
          body: "Sistem cuma ngasih peringatan. Yang bertindak tetap manusia.",
        },
        {
          key: "isolated",
          title: "Gak nyambung ke data warga",
          body: "Gak ada penautan ke data kependudukan, media sosial, atau lokasi ponsel.",
        },
      ],
    },

    limits: {
      label: "03 · Batas",
      heading: "Yang gak bakal\nkami lakuin.",
      sub: "Ini bukan catatan kaki. Ini keputusan produknya.",
      items: [
        "Gak masang di ruang publik yang gak diminta operatornya",
        "Gak nyimpen rekaman lebih lama dari batas yang disepakati",
        "Gak nyambungin data antar lokasi tanpa dasar hukum",
        "Gak bikin daftar orang, dan gak bikin skor orang",
        "Gak ngasih sistem yang mutusin sendiri tanpa manusia",
        "Gak bikin pemantauan massal warga, sekarang atau nanti",
      ],
    },

    why: {
      label: "04 · Kenapa dibatasi duluan",
      heading: "Aturan yang ditulis\nbelakangan itu alasan.",
      body: "Teknologi keamanan gampang melar. Sekali kepasang buat satu tujuan, permintaan berikutnya selalu 'sekalian aja'. Batas yang ditulis sebelum barisnya ada itu satu-satunya yang nahan.",
    },

    status: {
      label: "05 · Statusnya hari ini",
      items: [
        "Masih riset, belum ada produk",
        "Belum ada pelanggan",
        "Belum ada kontrak, pemerintah maupun swasta",
        "Belum ada satu pun perangkat kepasang",
      ],
      note: "Kami tulis ini biar gampang dicek setahun lagi. Kalau ada yang berubah, halaman ini yang berubah duluan.",
    },

    legal: {
      label: "Catatan",
      items: [
        "Halaman ini menjelaskan arah riset, bukan penawaran produk atau jasa.",
        "Pemasangan apa pun nantinya tunduk pada UU 27/2022 tentang Pelindungan Data Pribadi dan aturan sektor terkait.",
        "Kami gak bekerja sama dengan pihak mana pun untuk pemantauan warga secara massal.",
      ],
    },

    cta: {
      heading: "Pengelola infrastruktur penting?",
      body: "Kami lagi nyari satu lokasi buat uji coba, dengan batas yang sama kayak di halaman ini.",
      label: "Ngobrol 15 menit",
    },
  },

  en: {
    meta: {
      title: "Public safety: preventing attacks on critical infrastructure",
      description:
        "Dewata AI's third venture, at research stage. Threat detection at airports, ports, and power plants, with the limits written first. Not population-scale monitoring.",
    },
    eyebrow: "Third venture · Research",
    heading: "Stop an attack\nbefore it happens.",
    lead: "Research aimed at Indonesia's critical infrastructure. No product, no customer, and the limits were written before any of it.",
    meta_: "Research stage. Nothing is for sale.",

    statement: "The limits first.\nThen the code.",

    problem: {
      label: "01 · The problem",
      heading: "Most of it is\nstill watched by hand.",
      body: [
        "Airports, ports, power plants, and places of worship are guarded by people asked to watch a dozen screens at once. People tire, and what gets missed tends to be what mattered.",
        "What we are researching: a system that calls a guard only when something is genuinely wrong. Not one that records everybody and keeps it.",
      ],
    },

    scope: {
      label: "02 · Scope",
      heading: "At the site,\nnot across the city.",
      items: [
        {
          key: "perimeter",
          title: "The site perimeter only",
          body: "Fences, gates, and restricted areas the site operator owns.",
        },
        {
          key: "anomaly",
          title: "Anomalies, not identities",
          body: "It looks for events that are out of place. Not for who someone is.",
        },
        {
          key: "human",
          title: "A person decides",
          body: "The system raises an alert. A human being acts on it.",
        },
        {
          key: "isolated",
          title: "No link to citizen data",
          body: "No joining to population registers, social media, or phone location.",
        },
      ],
    },

    limits: {
      label: "03 · Limits",
      heading: "What we will\nnot do.",
      sub: "This is not a footnote. It is the product decision.",
      items: [
        "No deployment in public space the operator did not ask for",
        "No retention beyond the agreed limit",
        "No joining data across sites without a legal basis",
        "No lists of people, and no scores on people",
        "No system that acts without a human in the loop",
        "No population-scale monitoring, now or later",
      ],
    },

    why: {
      label: "04 · Why the limits come first",
      heading: "Rules written afterwards\nare excuses.",
      body: "Security technology spreads easily. Once it is installed for one purpose, the next request is always to use it for one more. Limits written before the first line of code are the only thing that holds.",
    },

    status: {
      label: "05 · Where it stands today",
      items: [
        "Research, no product",
        "No customers",
        "No contracts, government or private",
        "Not a single device deployed",
      ],
      note: "We write this down so it is easy to check a year from now. If anything changes, this page changes first.",
    },

    legal: {
      label: "Note",
      items: [
        "This page describes a research direction, not an offer of a product or service.",
        "Any eventual deployment falls under Indonesia's Law 27/2022 on Personal Data Protection and the relevant sector rules.",
        "We do not work with anyone on population-scale monitoring of the public.",
      ],
    },

    cta: {
      heading: "Run critical infrastructure?",
      body: "We are looking for one site to trial this on, under the same limits set out on this page.",
      label: "Book 15 minutes",
    },
  },
} as const

export function getSafety(lang: Lang) {
  return content[lang] ?? content.id
}

export type Safety = (typeof content)["id"]
