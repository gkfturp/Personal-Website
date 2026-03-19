"use client";
import { motion } from "framer-motion";
import ResumeExperience, { Experience } from "./ResumeExperience";

export default function ResumeClientPage({ experiences }: { experiences: Experience[] }) {
  return (
    <main className="px-6 py-12 min-h-screen">
      <div className="mx-auto max-w-5xl">
        {/* Personal Resume Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-wide bg-gradient-to-b from-white via-neutral-200 to-neutral-600 bg-clip-text text-transparent">个人简历</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
            {/* Photo - Reused from Hero component */}
            <div className="relative aspect-[3/4] w-full max-w-[300px] mx-auto md:mx-0 bg-neutral-800 rounded-sm overflow-hidden shadow-2xl shadow-black/50">
               <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
               <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-sm">
                 [您的照片]
               </div>
            </div>

            {/* Info */}
            <div className="space-y-10 md:mt-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
                <h2 className="text-3xl font-bold text-white tracking-wide">章泽森</h2>
                <span className="text-lg text-neutral-400 font-medium">用户体验设计师</span>
              </div>

              <div className="space-y-6 text-sm md:text-base">
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <span className="text-neutral-500 font-medium">毕业院校</span>
                  <span className="text-neutral-200">华南理工大学-2019届-工业设计系</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <span className="text-neutral-500 font-medium">工作经验</span>
                  <span className="text-neutral-200">5年+</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <span className="text-neutral-500 font-medium">软件技能</span>
                  <span className="text-neutral-200 leading-relaxed">Figma、Framer、Ae、ComfyUI、Principle、Sketch、Ps...</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <span className="text-neutral-500 font-medium">行业标签</span>
                  <span className="text-neutral-200">汽车领域、C端社交、工程机械、Saas</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Intro Section */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mt-20 max-w-4xl mx-auto"
        >
           <h2 className="text-2xl font-bold text-white mb-6">个人简介</h2>
           <p className="text-neutral-400 leading-relaxed text-justify text-lg">
             本人2019年毕业于华南理工大学工业设计系交互设计方向，拥有5年UI/UX设计经验，参与过多个C端/B端产品的体验设计及UI设计，主导统筹过亿级流水社交直播产品多多开黑、出海华人社交产品CHeart、3D设计与协作SAAS平台Realibox Cloud、广汽传祺/广汽本田/广汽丰田/比亚迪腾势/上汽集团等知名车企云购车营销项目。
           </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mt-12">
           <ResumeExperience experiences={experiences} />
        </div>
      </div>
    </main>
  );
}
