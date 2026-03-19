"use client";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export default function ResumeExperience({ experiences }: { experiences: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      setCanScrollLeft(scrollLeft > 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 330, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 relative">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider text-center">工作经历</h2>
      </div>

      <div className="relative group/container">
        {/* Left Gradient Mask */}
        <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10 pointer-events-none hidden md:block transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Right Gradient Mask */}
        <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10 pointer-events-none hidden md:block transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

        {/* Right Arrow Button */}
        <button 
          onClick={scrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-800/80 hover:bg-neutral-700 backdrop-blur-sm transition-all border border-neutral-700/50 hidden md:block translate-x-1/2 duration-300 ${
            canScrollRight ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 group-hover:text-white"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        {/* Scroll Container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-12 pb-12 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
          }}
        >
          {/* Force Left Spacer */}
          <div className="w-[1px] md:w-[20px] flex-shrink-0 snap-start" />

          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-[330px] flex-shrink-0 snap-start flex flex-col relative group"
            >
               {/* Top: Period */}
               <div className="mb-6 h-[30px] flex items-end">
                 <span className="text-xl font-bold text-white tracking-wide">{exp.period}</span>
               </div>

               {/* Middle: Timeline */}
               <div className="relative h-4 flex items-center w-full">
                  <div className="w-3 h-3 rounded-full bg-white z-10 ring-4 ring-black flex-shrink-0"></div>
                  {/* Line to next item - spans full width of this item + gap */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-3 h-px border-t border-dashed border-neutral-600 top-1/2 -translate-y-1/2 w-[calc(100%+48px)]"></div>
                  )}
                  {/* For the last item, maybe a fading line or just stop? Screenshot shows line stops or fades. */}
                  {index === experiences.length - 1 && (
                     <div className="absolute left-3 h-px border-t border-dashed border-neutral-600/50 top-1/2 -translate-y-1/2 w-full bg-gradient-to-r from-neutral-600 to-transparent"></div>
                  )}
               </div>

               {/* Bottom: Content */}
               <div className="mt-6 pr-8">
                 <h3 className="text-xl font-bold text-white mb-3">
                   {exp.company} <span className="mx-1">·</span> {exp.role}
                 </h3>
                 <p className="text-sm text-neutral-400 leading-relaxed text-justify opacity-80 break-words">
                   {exp.description}
                 </p>
               </div>
            </motion.div>
          ))}
          
          {/* Spacer */}
          <div className="min-w-[50px] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
