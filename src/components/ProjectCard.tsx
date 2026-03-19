'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';

interface ProjectCardProps {
  title: string;
  summary?: string;
  slug?: string;
  coverImage?: any;
  role?: string;
  duration?: string;
  priority?: boolean;
}

export default function ProjectCard({ title, summary, slug, coverImage, role, duration, priority = false, index = 0 }: ProjectCardProps & { index?: number }) {
  const imageUrl = coverImage ? urlFor(coverImage).width(800).height(450).url() : null;

  const CardContent = (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group flex flex-col gap-3"
    >
      <div 
        className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-800 border border-white/10"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800" />
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          {role && (
            <span className="shrink-0 rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-400 border border-white/5">
              {role}
            </span>
          )}
          <h3 className="font-medium text-white line-clamp-1">{title}</h3>
        </div>
        {duration && (
          <p className="text-xs text-neutral-500 font-mono">
            {duration}
          </p>
        )}
      </div>
    </motion.article>
  );

  if (slug) {
    return (
      <Link href={`/work/${slug}`} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
