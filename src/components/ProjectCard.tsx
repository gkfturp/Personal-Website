'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectCard({ title, summary, slug }: { title: string; summary?: string; slug?: string }) {
  const CardContent = (
    <motion.article
      whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-lg border border-white/10 bg-neutral-900 overflow-hidden h-full flex flex-col"
    >
      <div className="h-48 w-full bg-neutral-800 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-700 transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5 space-y-2 flex-1 flex flex-col">
        <h3 className="font-medium text-lg leading-snug text-white">{title}</h3>
        {summary && <p className="text-sm text-neutral-400 line-clamp-2">{summary}</p>}
      </div>
    </motion.article>
  );

  if (slug) {
    return (
      <Link href={`/work/${slug}`} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
