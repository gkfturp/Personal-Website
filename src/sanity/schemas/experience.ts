import { defineType, defineField } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "例如：2020.03 - 2023.08",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
