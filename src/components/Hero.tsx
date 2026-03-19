'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="container max-w-[1200px] mx-auto px-6 py-12 space-y-20">
        {/* 顶部标题区域 */}
      <motion.div 
        className="text-center space-y-4 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider bg-gradient-to-b from-white via-neutral-200 to-neutral-600 bg-clip-text text-transparent pb-2">
          很高兴认识您
        </h1>
        <p className="text-sm md:text-base font-medium tracking-[0.5em] text-neutral-500 uppercase">
          NICE TO MEET U
        </p>
      </motion.div>

      {/* 左右分栏区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[800px] mx-auto pt-4">
        {/* 左侧图片 */}
        <motion.div
          className="relative aspect-[3/4] max-w-[320px] mx-auto md:mx-0 bg-neutral-800 rounded-sm overflow-hidden shadow-2xl shadow-black/50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 这里应该是一张图片，暂时使用渐变背景占位 */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
          <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-sm">
            [您的照片]
          </div>
        </motion.div>

        {/* 右侧文本 */}
        <motion.div
          className="space-y-6 md:pl-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-medium text-white">I&apos;M</span>
            <span className="text-4xl md:text-5xl font-black tracking-wide text-white">ZESEN ,</span>
          </div>
          
          <div className="space-y-1.5 text-neutral-400 leading-relaxed text-sm">
            <p>2019年毕业于华南理工大学工业设计系交互研究方向，</p>
            <p>拥有5年UI和UX经验，</p>
            <p>我希望用设计来解决问题，</p>
            <p>欢迎您点击上方菜单详细了解我的履历及个人作品。</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
