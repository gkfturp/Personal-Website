import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 | Zesen",
  robots: { index: false },
};

const experience = [
  { company: "某互联网公司", role: "UI/UX 设计师", period: "2022 - 至今", description: "负责核心产品的交互设计与用户研究" },
  { company: "某创新工作室", role: "交互设计师", period: "2019 - 2022", description: "多端统一的设计系统搭建与落地" },
];

export default function AboutPage() {
  return (
    <main className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold">关于</h1>
        <p className="text-neutral-600 mt-3">毕业于华南理工大学工业设计系交互研究方向，拥有 5 年 UI 与 UX 经验。</p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">工作经历</h2>
          <ul className="space-y-4">
            {experience.map((e, idx) => (
              <li key={idx} className="border rounded-lg p-4 bg-white/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{e.company}</span>
                  <span className="text-sm text-neutral-500">{e.period}</span>
                </div>
                <div className="text-sm text-neutral-700 mt-1">{e.role}</div>
                {e.description && (
                  <p className="text-sm text-neutral-600 mt-2">{e.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
