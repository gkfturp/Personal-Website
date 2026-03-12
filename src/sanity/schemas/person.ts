import { defineType, defineField } from "sanity";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "email", title: "Email", type: "string" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "dribbble", title: "Dribbble", type: "url" },
        { name: "behance", title: "Behance", type: "url" },
        { name: "website", title: "Website", type: "url" },
      ],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
