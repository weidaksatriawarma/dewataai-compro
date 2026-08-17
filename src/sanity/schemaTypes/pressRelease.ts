import { defineField, defineType } from "sanity"

/**
 * Press release (/pers, /en/press).
 *
 * Shaped like an actual release rather than a blog post: dateline, boilerplate
 * "about the company" paragraph, and a named media contact, so journalists can
 * lift it straight into a story.
 */
export default defineType({
  name: "pressRelease",
  title: "Siaran Pers",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (rule) => rule.required().max(110),
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
      type: "string",
    }),
    defineField({
      name: "dateline",
      title: "Dateline",
      description: 'Kota terbit, misalnya "Denpasar, Bali".',
      type: "string",
      initialValue: "Denpasar, Bali",
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal terbit",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Lead",
      description: "Paragraf pembuka yang bisa dikutip apa adanya.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "body",
      title: "Isi",
      type: "blockContent",
    }),
    defineField({
      name: "boilerplate",
      title: "Tentang Dewata AI",
      description: "Paragraf standar yang muncul di akhir setiap siaran pers.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "contactName",
      title: "Kontak media: nama",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Kontak media: email",
      type: "string",
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
    select: { title: "title", subtitle: "lang" },
  },
})
