import { defineType, defineField } from "sanity";

export default defineType({
  name: "homeConfig",
  title: "Home Config",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
});
