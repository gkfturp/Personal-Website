import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { groq } from "next-sanity";
import { getClient } from "@/sanity/client";

import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "作品 | Zesen",
};

export const revalidate = 60;

const query = groq`
  *[_type == "project"] | order(featured desc, _updatedAt desc) {
    title,
    "slug": slug.current,
    summary,
    coverImage,
    role,
    duration
  }
`;

export default async function WorkPage() {
  const projects = await getClient().fetch(query);

  return (
    <main className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-4 mb-12 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-b from-white via-neutral-200 to-neutral-600 bg-clip-text text-transparent">个人作品</h1>
          <p className="text-sm text-neutral-500 tracking-[0.5em]">感谢阅读 欢迎指正</p>
        </div>

        <section className="mt-8 grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((p: any, idx: number) => (
            <ProjectCard
              key={idx}
              index={idx}
              title={p.title}
              summary={p.summary}
              slug={p.slug}
              coverImage={p.coverImage}
              role={p.role}
              duration={p.duration}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
