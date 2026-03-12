import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "作品详情 | Zesen",
};

// Mock data for static template
const project = {
  title: "移动端交互重设计",
  summary: "对核心流程进行信息架构优化与动效增强，提升用户操作效率与满意度。",
  coverImage: "/placeholder-project.jpg", // We don't have this, will use a div
  role: "UI/UX Designer",
  tools: ["Figma", "Protopie", "After Effects"],
  duration: "2023.04 - 2023.06",
  date: "2023-06-01",
  content: [
    "项目背景：随着业务功能的不断叠加，原有移动端应用的信息架构逐渐变得臃肿，用户反馈核心操作路径过长，且视觉风格陈旧。",
    "设计目标：简化核心流程，提升操作效率；统一视觉语言，建立设计规范；引入微交互，提升用户体验。",
    "解决方案：\n1. 重构信息架构，将原有的5层深度减少为3层。\n2. 建立全新的设计系统，统一色彩、字体与组件。\n3. 在关键操作节点加入微交互，如加载动画、操作反馈等。",
    "成果：改版后，核心任务完成时间缩短了30%，用户满意度提升了20%。"
  ]
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // In a real app, fetch data based on params.slug
  // const data = await client.fetch(query, { slug: params.slug });
  // if (!data) return notFound();

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Image */}
      <div className="w-full h-[50vh] bg-neutral-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">{project.summary}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12">
        {/* Main Content */}
        <article className="prose prose-invert lg:prose-lg">
          {project.content.map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line text-neutral-300 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
          
          <div className="my-12 p-8 bg-neutral-900 rounded-xl border border-white/10">
            <p className="text-center text-neutral-500 italic">
              更多详细设计过程与高保真图稿将在后续补充。
            </p>
          </div>
        </article>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Role</h3>
            <p className="text-neutral-400">{project.role}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map(tool => (
                <span key={tool} className="px-2 py-1 bg-neutral-800 text-neutral-300 text-sm rounded border border-white/5">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Duration</h3>
            <p className="text-neutral-400 font-mono text-sm">{project.duration}</p>
          </div>

           <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Date</h3>
            <p className="text-neutral-400 font-mono text-sm">{project.date}</p>
          </div>
        </aside>
      </div>

      {/* Navigation Footer */}
      <div className="max-w-4xl mx-auto px-6 mt-20 pt-10 border-t border-white/10 flex justify-between">
        <Link href="/work" className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
          ← 返回作品列表
        </Link>
      </div>
    </main>
  );
}
