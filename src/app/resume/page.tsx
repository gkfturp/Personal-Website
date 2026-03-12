"use client";
import { motion, type Variants } from "framer-motion";

const experience = [
  { company: "某互联网公司", role: "UI/UX 设计师", period: "2022 - 至今", description: "负责核心产品的交互设计与用户研究，主导设计系统搭建与维护。" },
  { company: "某创新工作室", role: "交互设计师", period: "2019 - 2022", description: "多端统一的设计系统搭建与落地，参与多个创新项目的原型设计与验证。" },
];

const education = [
  { school: "华南理工大学", major: "工业设计系（交互研究方向）", period: "2015 - 2019", description: "主修人机交互、用户体验设计、服务设计。" },
];

const skills = ["Figma", "Sketch", "Protopie", "Principle", "HTML/CSS", "React (Basic)", "User Research", "Design System"];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] as const
    } 
  },
};

export default function ResumePage() {
  return (
    <main className="px-6 py-12 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-3xl font-semibold text-white">履历</h1>
          <p className="text-neutral-400 mt-3 text-lg leading-relaxed">
            2019年毕业于华南理工大学工业设计系交互研究方向，拥有 5 年 UI 与 UX 经验。
            <br />
            致力于通过理性分析与感性表达，创造优雅、易用且富有情感的数字产品体验。
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 space-y-16"
        >
          {/* Experience Section */}
          <section>
            <motion.h2 variants={item} className="text-xl font-medium mb-8 text-white/90">工作经历</motion.h2>
            <div className="relative border-l border-neutral-800 ml-3 space-y-10 pb-2">
              {experience.map((e, idx) => (
                <motion.div variants={item} key={idx} className="relative pl-10">
                  <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-neutral-700 ring-4 ring-neutral-900" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                    <h3 className="font-semibold text-lg text-white">{e.company}</h3>
                    <span className="text-sm font-mono text-neutral-500">{e.period}</span>
                  </div>
                  <div className="text-neutral-300 font-medium mb-2">{e.role}</div>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">{e.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section>
            <motion.h2 variants={item} className="text-xl font-medium mb-8 text-white/90">教育背景</motion.h2>
            <div className="relative border-l border-neutral-800 ml-3 space-y-10 pb-2">
              {education.map((e, idx) => (
                <motion.div variants={item} key={idx} className="relative pl-10">
                  <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-neutral-700 ring-4 ring-neutral-900" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                    <h3 className="font-semibold text-lg text-white">{e.school}</h3>
                    <span className="text-sm font-mono text-neutral-500">{e.period}</span>
                  </div>
                  <div className="text-neutral-300 font-medium mb-2">{e.major}</div>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">{e.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <motion.h2 variants={item} className="text-xl font-medium mb-6 text-white/90">专业技能</motion.h2>
            <motion.div variants={item} className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-800 hover:border-neutral-700 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
