'use client';
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const nav: { href: Route; labelZh: string; labelEn: string }[] = [
  { href: "/" as Route, labelZh: "主页", labelEn: "HOME" },
  { href: "/resume" as Route, labelZh: "简历", labelEn: "RESUME" },
  { href: "/work" as Route, labelZh: "作品", labelEn: "WORKS" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ x: 0, width: 0, ready: false });

  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = itemRefs.current[pathname];
      const navElement = navRef.current;

      if (!activeItem || !navElement) {
        setIndicator((prev) => ({ ...prev, ready: false }));
        return;
      }

      const activeRect = activeItem.getBoundingClientRect();
      const navRect = navElement.getBoundingClientRect();

      setIndicator({
        x: activeRect.left - navRect.left + (activeRect.width - 24) / 2,
        width: 24,
        ready: true,
      });
    };

    updateIndicator();

    const frame = window.requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateIndicator)
        : null;

    if (navRef.current) {
      resizeObserver?.observe(navRef.current);
    }

    Object.values(itemRefs.current).forEach((item) => {
      if (item) {
        resizeObserver?.observe(item);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateIndicator);
      resizeObserver?.disconnect();
    };
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-[32px] border-b border-white/5 transition-all duration-300"
    >
      <div className="mx-auto max-w-6xl px-6 h-24 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="group flex flex-col items-start gap-1">
          <div className="h-[2px] w-5 bg-white mb-0.5 group-hover:bg-yellow-400 transition-colors duration-300" />
          <div className="flex flex-col text-sm font-bold tracking-widest text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
            <span>ZESEN</span>
            <span>ZHANG</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav ref={navRef} className="relative flex items-center gap-10">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                ref={(node) => {
                  itemRefs.current[n.href] = node;
                }}
                className="relative group flex flex-col items-center"
              >
                <div className={`flex items-baseline gap-1.5 text-sm tracking-wider transition-colors duration-300 ${
                  active ? "text-yellow-400 font-bold" : "text-neutral-400 hover:text-white"
                }`}>
                  <span>{n.labelZh}</span>
                  <span className="text-xs uppercase opacity-80">{n.labelEn}</span>
                </div>
              </Link>
            );
          })}

          <motion.div
            aria-hidden="true"
            className="absolute -bottom-2 h-[2px] bg-yellow-400"
            initial={false}
            animate={{
              x: indicator.x,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        </nav>
      </div>
    </header>
  );
}
