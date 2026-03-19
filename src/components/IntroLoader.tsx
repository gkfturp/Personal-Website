'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroCodeBackground from './IntroCodeBackground';

export default function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 禁用滚动
    document.body.style.overflow = 'hidden';

    // 3秒后开始执行退出动画（稍微延迟一点，让用户看清初始状态）
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 16列设计，交错动画
  const columns = Array.from({ length: 16 }, (_, i) => i);

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none flex"
          style={{ zIndex: 2147483647 }}
        >
          {columns.map((index) => (
            <motion.div
              key={index}
              className="relative h-full w-[12.5%] bg-black border-r border-white/5 last:border-r-0"
              initial={{ height: "100%" }}
              exit={{ 
                height: "0%",
                transition: { 
                  duration: 2.0, // 放慢收起速度 (原0.8)
                  ease: [0.22, 1, 0.36, 1], // 使用更平滑的缓动曲线
                  delay: index * 0.08 // 调整延迟间隔
                }
              }}
            >
              {/* 装饰性文字，仅在第一列和最后一列显示 */}
              {index === 0 && (
                <motion.div 
                  className="absolute bottom-10 left-10 font-mono text-xs text-neutral-500 -rotate-90 origin-bottom-left"
                  exit={{ opacity: 0 }}
                >
                  LOADING...
                </motion.div>
              )}
              {index === 7 && (
                <motion.div 
                  className="absolute top-10 right-10 font-mono text-xs text-neutral-500 rotate-90 origin-top-right"
                  exit={{ opacity: 0 }}
                >
                  ©2024
                </motion.div>
              )}
            </motion.div>
          ))}

          <motion.div
            className="absolute inset-0 z-[5] pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <IntroCodeBackground
              intensity={0.95}
              color="#D4D4D4"
              className="absolute inset-0 h-full w-full opacity-90"
            />
          </motion.div>
          
          {/* 中心 Logo 动画 */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mix-blend-difference"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-white text-4xl md:text-6xl font-bold tracking-widest mb-4 text-center"
            >
              ZESEN ZHANG
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-neutral-400 text-xs md:text-sm tracking-[0.3em] font-medium"
            >
              Design · Coding · Product
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
