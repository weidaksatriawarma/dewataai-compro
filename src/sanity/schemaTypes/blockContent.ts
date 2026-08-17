import { defineArrayMember, defineType } from "sanity"

/**
 * The rich-text body shared by journal posts and press releases.
 * Deliberately narrow: the site's design only styles these marks and blocks.
 */
export default defineType({
  name: "blockContent",
  title: "Isi",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraf", value: "normal" },
        { title: "Judul", value: "h2" },
        { title: "Sub-judul", value: "h3" },
        { title: "Kutipan", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Nomor", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Tebal", value: "strong" },
          { title: "Miring", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Tautan",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Teks alternatif" }],
    }),
  ],
})
