'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import { PortableText } from "next-sanity";

// Helper to extract dimensions from Sanity asset ref
const getImageDimensions = (ref: string) => {
  const pattern = /image-[a-zA-Z0-9]+-(\d+)x(\d+)-[a-z]+/;
  const match = pattern.exec(ref);
  if (!match) {
    return null;
  }
  const [, width, height] = match;
  return { width: parseInt(width), height: parseInt(height) };
};

export const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      
      const dims = getImageDimensions(value.asset._ref);
      
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative w-full my-12 rounded-lg overflow-hidden bg-neutral-900"
        >
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Project Image'}
            width={dims?.width || 1200}
            height={dims?.height || 800}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </motion.div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-12 mb-6 text-white">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-12 mb-6 text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-8 mb-4 text-white">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 text-neutral-300 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-neutral-700 pl-6 italic my-8 text-neutral-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-5 mb-6 text-neutral-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-5 mb-6 text-neutral-300">
        {children}
      </ol>
    ),
  },
};

export function CustomPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={ptComponents} />;
}

export default ptComponents;
