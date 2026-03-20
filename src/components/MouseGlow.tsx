'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

type MouseGlowProps = {
  variant?: 'code-particles';
  intensity?: number;
  interactiveBoost?: number;
};

type Pulse = {
  id: number;
  x: number;
  y: number;
  accent: boolean;
  kind: 'hover' | 'click';
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  token: string;
  accent: boolean;
};

const PARTICLE_TOKENS = ['<>', '/', '{}', 'ux', 'ui', '01', 'px', 'fn', '[]', '++'];
const INTERACTIVE_SELECTOR = 'a,button,[role="button"],input,textarea,summary,label';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function MouseGlow({
  variant = 'code-particles',
  intensity = 1,
  interactiveBoost = 1,
}: MouseGlowProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const interactiveStrength = useMotionValue(0);
  const clickStrength = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 26, stiffness: 320, mass: 0.45 });
  const smoothY = useSpring(mouseY, { damping: 26, stiffness: 320, mass: 0.45 });
  const smoothInteractive = useSpring(interactiveStrength, { damping: 20, stiffness: 180, mass: 0.35 });
  const smoothClick = useSpring(clickStrength, { damping: 16, stiffness: 260, mass: 0.25 });

  const [enabled, setEnabled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const pulseTimersRef = useRef<number[]>([]);
  const pulseIdRef = useRef(0);

  const variantMode = useMemo(() => variant, [variant]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMedia = window.matchMedia('(pointer: fine)');
    const hoverMedia = window.matchMedia('(hover: hover)');

    const updateCapability = () => {
      setReduceMotion(media.matches);
      setEnabled(pointerMedia.matches && hoverMedia.matches);
    };

    updateCapability();

    const addListener = (mql: MediaQueryList, handler: () => void) => {
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
      }

      mql.addListener(handler);
      return () => mql.removeListener(handler);
    };

    const cleanups = [
      addListener(media, updateCapability),
      addListener(pointerMedia, updateCapability),
      addListener(hoverMedia, updateCapability),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const pushPulse = (x: number, y: number, kind: Pulse['kind'], accent: boolean) => {
      const id = pulseIdRef.current++;
      setPulses((prev) => [...prev, { id, x, y, kind, accent }]);

      const timer = window.setTimeout(() => {
        setPulses((prev) => prev.filter((pulse) => pulse.id !== id));
        pulseTimersRef.current = pulseTimersRef.current.filter((entry) => entry !== timer);
      }, kind === 'click' ? 340 : 500);

      pulseTimersRef.current.push(timer);
    };

    const setInteractiveState = (target: EventTarget | null) => {
      const element = target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
      const accent = Boolean(
        element?.closest('nav') ||
          element?.closest('article') ||
          element?.closest('[aria-label="Back to projects"]') ||
          element?.closest('footer')
      );

      interactiveStrength.set(element ? clamp(0.55 * interactiveBoost + (accent ? 0.18 : 0), 0, 1.2) : 0);
      return accent;
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const accent = setInteractiveState(event.target);
      const element = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
      if (element) {
        pushPulse(event.clientX, event.clientY, 'hover', accent);
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof Element && nextTarget.closest(INTERACTIVE_SELECTOR)) {
        setInteractiveState(nextTarget);
        return;
      }

      interactiveStrength.set(0);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const accent = setInteractiveState(event.target);
      clickStrength.set(1);
      window.setTimeout(() => clickStrength.set(0), 180);
      pushPulse(event.clientX, event.clientY, 'click', accent);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('pointerdown', handlePointerDown);
      pulseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      pulseTimersRef.current = [];
    };
  }, [clickStrength, enabled, interactiveBoost, interactiveStrength, mouseX, mouseY]);

  useEffect(() => {
    if (!enabled || reduceMotion || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let lastTs = 0;
    let lastX = mouseX.get();
    let lastY = mouseY.get();
    const particles: Particle[] = [];

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.textAlign = 'center';
      context.textBaseline = 'middle';
    };

    const spawnParticle = (x: number, y: number, speed: number, accent: boolean) => {
      if (particles.length >= 24) {
        particles.splice(0, particles.length - 23);
      }

      const angle = Math.random() * Math.PI * 2;
      const velocity = 0.25 + Math.random() * 0.65 + speed * 0.02;

      particles.push({
        x: x + (Math.random() - 0.5) * 18,
        y: y + (Math.random() - 0.5) * 18,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - (0.1 + Math.random() * 0.22),
        life: 0,
        maxLife: 26 + Math.random() * 18,
        size: 10 + Math.random() * 4,
        token: PARTICLE_TOKENS[Math.floor(Math.random() * PARTICLE_TOKENS.length)] ?? '01',
        accent,
      });
    };

    const render = (timestamp: number) => {
      const dt = Math.min(1.6, (timestamp - lastTs || 16) / 16.6667);
      lastTs = timestamp;

      context.clearRect(0, 0, width, height);

      const x = mouseX.get();
      const y = mouseY.get();
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.hypot(dx, dy);
      const interaction = smoothInteractive.get();
      const accent = interaction > 0.68;
      const spawnRate = speed > 1 ? clamp(Math.floor(speed / 8) + (interaction > 0.2 ? 1 : 0), 0, accent ? 3 : 2) : 0;

      for (let i = 0; i < spawnRate; i++) {
        spawnParticle(x, y, speed, accent);
      }

      const burst = smoothClick.get();
      if (burst > 0.2 && particles.length < 22) {
        spawnParticle(x, y, speed + 8, true);
      }

      particles.forEach((particle, index) => {
        particle.life += dt;
        particle.x += particle.vx * dt * 2.4;
        particle.y += particle.vy * dt * 2.4;
        particle.vx *= 0.985;
        particle.vy *= 0.988;

        const progress = particle.life / particle.maxLife;
        const alpha = clamp((1 - progress) * (particle.accent ? 0.95 : 0.62) * intensity, 0, 1);

        context.save();
        context.font = `${particle.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        context.fillStyle = particle.accent
          ? `rgba(255, 210, 72, ${alpha})`
          : `rgba(200, 228, 255, ${alpha})`;
        context.shadowBlur = particle.accent ? 10 : 6;
        context.shadowColor = particle.accent ? 'rgba(255, 200, 80, 0.35)' : 'rgba(166, 214, 255, 0.25)';
        context.fillText(particle.token, particle.x, particle.y);
        context.restore();

        if (progress >= 1) {
          particles.splice(index, 1);
        }
      });

      lastX = x;
      lastY = y;
      raf = window.requestAnimationFrame(render);
    };

    setup();
    raf = window.requestAnimationFrame(render);
    window.addEventListener('resize', setup, { passive: true });

    return () => {
      window.removeEventListener('resize', setup);
      window.cancelAnimationFrame(raf);
    };
  }, [enabled, intensity, mouseX, mouseY, reduceMotion, smoothClick, smoothInteractive]);

  const glowRadius = useMotionTemplate`${180 + smoothInteractive.get() * 70 + smoothClick.get() * 32}px`;
  const coreOpacity = useMotionTemplate`${0.12 + smoothInteractive.get() * 0.08 + smoothClick.get() * 0.06}`;
  const haloOpacity = useMotionTemplate`${0.08 + smoothInteractive.get() * 0.11}`;
  const ringScale = useMotionTemplate`${1 + smoothInteractive.get() * 0.22 + smoothClick.get() * 0.1}`;
  const accentOpacity = useMotionTemplate`${smoothInteractive.get() > 0.68 ? 0.9 : 0.5}`;

  const glowBackground = useMotionTemplate`
    radial-gradient(
      ${glowRadius} circle at ${smoothX}px ${smoothY}px,
      rgba(190, 226, 255, ${coreOpacity}),
      rgba(72, 122, 180, ${haloOpacity}) 28%,
      transparent 72%
    )
  `;

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{ background: glowBackground }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed z-0 h-10 w-10 rounded-full border border-white/18"
          style={{
            left: smoothX,
            top: smoothY,
            x: '-50%',
            y: '-50%',
            scale: ringScale,
            opacity: accentOpacity,
            borderColor: smoothInteractive.get() > 0.68 ? 'rgba(255, 208, 84, 0.75)' : 'rgba(230, 244, 255, 0.38)',
            boxShadow:
              smoothInteractive.get() > 0.68
                ? '0 0 18px rgba(255, 196, 64, 0.2)'
                : '0 0 14px rgba(160, 214, 255, 0.12)',
          }}
        />
      )}

      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-0 rounded-full border"
          style={{
            left: pulse.x,
            top: pulse.y,
            x: '-50%',
            y: '-50%',
            borderColor: pulse.accent ? 'rgba(255, 208, 84, 0.38)' : 'rgba(190, 226, 255, 0.28)',
          }}
          initial={{
            width: pulse.kind === 'click' ? 14 : 20,
            height: pulse.kind === 'click' ? 14 : 20,
            opacity: pulse.kind === 'click' ? 0.8 : 0.45,
          }}
          animate={{
            width: pulse.kind === 'click' ? 74 : 58,
            height: pulse.kind === 'click' ? 74 : 58,
            opacity: 0,
          }}
          transition={{
            duration: pulse.kind === 'click' ? 0.24 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      {variantMode === 'code-particles' && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed z-0 h-px"
          style={{
            left: smoothX,
            top: smoothY,
            x: '-50%',
            y: '-50%',
            width: smoothInteractive.get() > 0.2 ? 88 : 52,
            background:
              smoothInteractive.get() > 0.68
                ? 'linear-gradient(90deg, transparent, rgba(255, 208, 84, 0.75), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(214, 236, 255, 0.55), transparent)',
            opacity: 0.28 + smoothInteractive.get() * 0.36,
          }}
        />
      )}
    </>
  );
}
