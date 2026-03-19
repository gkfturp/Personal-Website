'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type IntroCodeBackgroundProps = {
  intensity?: number;
  color?: string;
  fontSize?: number;
  fpsCap?: number;
  className?: string;
  seedText?: string[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const DEFAULT_SEED_TEXT = [
  'const',
  'let',
  'export',
  'import',
  'function',
  'return',
  'async',
  'await',
  'useEffect',
  'useState',
  'motion',
  'AnimatePresence',
  '=>',
  '{}',
  '[]',
  '()',
  ';',
  '0x',
  'null',
  'true',
  'false',
  'npm',
  'git',
];

export default function IntroCodeBackground({
  intensity = 0.8,
  color = '#E5E5E5',
  fontSize = 13,
  fpsCap = 30,
  className,
  seedText,
}: IntroCodeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const tokens = useMemo(() => seedText ?? DEFAULT_SEED_TEXT, [seedText]);
  const intensity01 = clamp(intensity, 0, 1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(Boolean(mql.matches));
    update();
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    }
    mql.addListener(update);
    return () => mql.removeListener(update);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pickToken = () => tokens[Math.floor(Math.random() * tokens.length)] ?? '';

    let width = 0;
    let height = 0;
    let dpr = 1;
    let lineHeight = 18;
    let colWidth = 16;
    let cols = 0;
    let y: number[] = [];
    let v: number[] = [];
    let t: string[] = [];
    let raf = 0;
    let lastFrame = 0;

    const setup = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      const nextDpr = window.devicePixelRatio || 1;

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      ctx.font = `${Math.max(10, Math.floor(fontSize))}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

      lineHeight = Math.max(14, fontSize * 1.5);
      colWidth = Math.max(10, fontSize * 1.25);
      cols = Math.max(16, Math.floor(width / colWidth));

      const activeCols = Math.max(8, Math.floor(cols * (0.45 + intensity01 * 0.55)));
      y = new Array(activeCols).fill(0).map(() => -Math.random() * height);
      v = new Array(activeCols)
        .fill(0)
        .map(() => (0.55 + Math.random() * (0.95 + intensity01 * 1.1)) * (0.9 + intensity01));
      t = new Array(activeCols).fill(0).map(() => pickToken());
    };

    const renderFrame = () => {
      if (!width || !height) return;

      const overlayAlpha = clamp(0.22 - intensity01 * 0.12, 0.08, 0.22);
      ctx.globalAlpha = overlayAlpha;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      const baseAlpha = clamp(0.06 + intensity01 * 0.1, 0.04, 0.22);
      ctx.fillStyle = color;

      for (let i = 0; i < y.length; i++) {
        const x = i * colWidth;
        const jumpChance = 0.01 + intensity01 * 0.03;
        const jump = Math.random() < jumpChance ? (Math.random() - 0.5) * lineHeight * (0.4 + intensity01) : 0;
        y[i] += v[i] * lineHeight * (0.5 + intensity01 * 0.9);

        if (Math.random() < 0.03 + intensity01 * 0.08) t[i] = pickToken();

        const drawY = y[i] + jump;
        ctx.globalAlpha = baseAlpha;
        ctx.fillText(t[i], x, drawY);

        if (Math.random() < intensity01 * 0.04) {
          ctx.globalAlpha = clamp(baseAlpha * 2.8, 0, 1);
          ctx.fillText(t[i], x, drawY - 1);
        }

        if (y[i] > height + lineHeight * 2) {
          y[i] = -Math.random() * height * 0.8;
          v[i] = (0.55 + Math.random() * (0.95 + intensity01 * 1.1)) * (0.9 + intensity01);
          t[i] = pickToken();
        }
      }

      ctx.globalAlpha = 1;
    };

    const renderStatic = () => {
      setup();
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.globalAlpha = clamp(0.08 + intensity01 * 0.1, 0.06, 0.22);
      for (let i = 0; i < y.length; i++) {
        const x = i * colWidth;
        const py = Math.random() * (height - lineHeight);
        ctx.fillText(pickToken(), x, py);
      }
      ctx.globalAlpha = 1;
    };

    const onResize = () => setup();

    setup();

    if (reduceMotion) {
      renderStatic();
      window.addEventListener('resize', onResize, { passive: true });
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }

    const minFrameMs = 1000 / Math.max(10, fpsCap);
    const frame = (now: number) => {
      if (!lastFrame || now - lastFrame >= minFrameMs) {
        lastFrame = now;
        renderFrame();
      }
      raf = window.requestAnimationFrame(frame);
    };

    window.addEventListener('resize', onResize, { passive: true });
    raf = window.requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(raf);
    };
  }, [color, fontSize, fpsCap, intensity01, reduceMotion, tokens]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? 'absolute inset-0 h-full w-full opacity-70'}
    />
  );
}

