'use client';

import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

export default function MouseGlow() {
  // 鼠标坐标 MotionValue
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 使用 Spring 动画使跟随更平滑
  // stiffness: 刚度，越高性能越好但可能过于灵敏；damping: 阻尼，控制回弹
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 初始位置设为屏幕中心，避免一开始在左上角
    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    const handleMouseMove = (e: MouseEvent) => {
      // clientX/Y 是相对于视口的坐标，适合 fixed 定位
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // 使用 useMotionTemplate 构建动态背景样式
  // 创建一个以鼠标为中心的径向渐变
  // 500px 是光晕半径，rgba(255,255,255,0.06) 是中心最亮处的颜色（很淡的白色）
  const background = useMotionTemplate`radial-gradient(500px circle at ${smoothX}px ${smoothY}px, rgba(255, 255, 255, 0.06), transparent 80%)`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: background,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
