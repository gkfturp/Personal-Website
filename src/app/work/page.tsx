import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "作品 | Zesen",
};

const projects = Array.from({ length: 9 }).map((_, i) => ({
  title: `作品示例 ${i + 1}`,
  summary: "项目简介文本作为占位，后续接入真实数据",
  slug: `project-${i + 1}`,
}));

export default function WorkPage() {
  return (
    <main className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-white">作品</h1>
          <Link href={"/about" as Route} className="text-sm text-neutral-400 hover:text-white transition-colors">
            查看关于
          </Link>
        </div>

        <section className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <ProjectCard key={idx} title={p.title} summary={p.summary} slug={p.slug} />
          ))}
        </section>
      </div>
    </main>
  );
}
