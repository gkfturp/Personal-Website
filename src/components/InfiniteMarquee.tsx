'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

function MarqueeItem({ title, slug, cover }: { title: string; slug: string; cover?: string }) {
  return (
    <Link href={`/work/${slug}`} className="block relative flex-shrink-0 w-[300px] md:w-[400px] aspect-video mx-4 rounded-xl overflow-hidden group">
      <div className="w-full h-full bg-neutral-800 relative">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 300px, 400px"
          />
        ) : (
          /* Placeholder Gradient */
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-700 transition-transform duration-700 group-hover:scale-110" />
        )}
      </div>
    </Link>
  );
}

export default function InfiniteMarquee({ items }: { items: { title: string; slug: string; cover?: string }[] }) {
  // Use a longer list of items to ensure seamless scrolling
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className="w-full overflow-hidden py-12 relative">
      {/* Left Fade Mask */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      
      {/* Right Fade Mask */}
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div 
        className="flex w-max animate-scroll hover:pause"
      >
        {duplicatedItems.map((item, idx) => (
          <MarqueeItem key={`${item.slug}-${idx}`} title={item.title} slug={item.slug} cover={item.cover} />
        ))}
      </div>
    </div>
  );
}
