import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/image";
import ProjectCard from "@/components/ProjectCard";
import { groq } from "next-sanity";
import { getClient } from "@/sanity/client";
import { CustomPortableText } from "@/components/PortableTextComponents";

// Define project type locally
interface Project {
  title: string;
  summary: string;
  role: string;
  duration: string;
  content: any;
  slug: string;
}

// Revalidate every 60 seconds
export const revalidate = 60;

// Query for fetching project data
const query = groq`
  {
    "project": *[_type == "project" && slug.current == $slug][0] {
      title,
      summary,
      role,
      duration,
      content,
      "slug": slug.current
    },
    "others": *[_type == "project" && slug.current != $slug] {
      title,
      "slug": slug.current,
      summary,
      coverImage,
      role,
      duration
    }
  }
`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getClient().fetch(query, { slug });
  
  if (!project) {
    return {
      title: "Project Not Found | Zesen",
    };
  }

  return {
    title: `${project.title} | Zesen`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const data = await getClient().fetch(query, { slug });

  if (!data?.project) {
    return notFound();
  }

  const { project, others } = data;

  const stableHash = (value: string) => {
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  const randomOthers = others
    ? [...others]
        .sort((a: any, b: any) => {
          const aKey = String(a?.slug?.current ?? a?.slug ?? a?.title ?? '');
          const bKey = String(b?.slug?.current ?? b?.slug ?? b?.title ?? '');
          return stableHash(`${slug}:${aKey}`) - stableHash(`${slug}:${bKey}`);
        })
        .slice(0, 3)
    : [];

  return (
    <main className="min-h-screen pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex items-start gap-4 md:gap-6 mb-16 pt-24">
          <Link 
            href="/work" 
            className="mt-1.5 text-neutral-500 hover:text-white transition-colors p-1"
            aria-label="Back to projects"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              {project.role && (
                <span className="bg-neutral-900 border border-white/10 text-neutral-400 px-3 py-1 rounded text-sm font-medium tracking-wide">
                  {project.role}
                </span>
              )}
              <h1 
                className="text-3xl md:text-4xl font-bold text-white tracking-tight"
              >
                {project.title}
              </h1>
            </div>
            
            {project.duration && (
              <p className="text-neutral-500 font-mono text-sm pl-1 mt-1">
                {project.duration}
              </p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <article 
          className="prose prose-invert prose-neutral max-w-none lg:prose-lg mb-32"
        >
          {project.content ? (
            <CustomPortableText value={project.content} />
          ) : (
            <p className="text-neutral-500 italic text-center py-10">
              暂无详细内容
            </p>
          )}
        </article>

        {/* See Also Section */}
        {randomOthers.length > 0 && (
          <section className="border-t border-white/10 pt-16">
            <h2 className="text-2xl font-medium text-white mb-10">可以看看我的其他作品</h2>
            <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {randomOthers.map((p: any, idx: number) => (
                <ProjectCard
                  key={idx}
                  title={p.title}
                  summary={p.summary}
                  slug={p.slug}
                  coverImage={p.coverImage}
                  role={p.role}
                  duration={p.duration}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
