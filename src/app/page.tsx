import Hero from "@/components/Hero";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import { getClient } from "@/sanity/client";
import { homeQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export default async function Home() {
  const client = getClient();
  let projects = [];

  try {
    const data = await client.fetch(homeQuery);
    console.log("Sanity Data:", data); // Debug log
    projects = data?.projects?.map((p: any) => ({
      title: p.title,
      summary: p.summary,
      slug: p.slug.current,
      cover: p.coverImage ? urlFor(p.coverImage).width(800).height(450).url() : null,
    })) || [];
  } catch (error) {
    console.error("Failed to fetch projects from Sanity:", error);
    // Fallback to static data
    projects = [
      { title: "移动端交互重设计", summary: "对核心流程进行信息架构优化与动效增强", slug: "mobile-redesign", cover: "/projects/demo1.jpg" },
      { title: "企业管理后台设计", summary: "复杂表格与流程的可用性提升与主题化", slug: "admin-dashboard", cover: "/projects/demo2.jpg" },
      { title: "官网改版与前端实现", summary: "组件化设计系统与响应式实现", slug: "website-revamp", cover: "/projects/demo3.jpg" },
      { title: "智能家居控制系统", summary: "跨设备无缝连接体验", slug: "smart-home", cover: "/projects/demo4.jpg" },
      { title: "金融数据可视化平台", summary: "复杂数据直观呈现", slug: "finance-datav", cover: "/projects/demo5.jpg" },
    ];
  }

  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* 作品无限滚动区域 */}
      <section className="mt-12 mb-20">
        <InfiniteMarquee items={projects} />
      </section>
    </main>
  );
}
