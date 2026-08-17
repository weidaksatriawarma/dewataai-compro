import { defineField, defineType } from "sanity"

/**
 * Journal post (/jurnal, /en/journal).
 *
 * Locale handling is one document per language, tagged with `lang`. Pair a
 * translation by giving both documents the same `translationKey`, so the
 * language switcher can jump between them.
 */
export default defineType({
  name: "post",
  title: "Jurnal",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lang",
      title: "Bahasa",
      type: "string",
      options: {
        list: [
          { title: "Bahasa Indonesia", value: "id" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "id",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "translationKey",
      title: "Kunci terjemahan",
      description:
        "Isi sama persis di versi ID dan EN supaya tombol ganti bahasa nyambung.",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan",
      description: "Satu atau dua kalimat. Dipakai di daftar dan di hasil pencarian.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal terbit",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Gambar sampul",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Teks alternatif" }],
    }),
    defineField({
      name: "author",
      title: "Penulis",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Isi",
      type: "blockContent",
    }),
  ],
  orderings: [
    {
      title: "Terbaru",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "lang", media: "coverImage" },
  },
})
