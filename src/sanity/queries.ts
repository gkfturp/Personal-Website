import { groq } from "next-sanity";

export const homeQuery = groq`{
  "projects": *[_type == "project"]|order(_updatedAt desc)[0..8]{
    title, slug, summary, coverImage
  },
  "experience": *[_type == "experience"]|order(_updatedAt desc)[0..20]{
    company, role, period, description
  }
}`;
