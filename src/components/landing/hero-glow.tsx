"use client";

import { motion } from "motion/react";

export function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary teal glow */}
      <motion.div
        className="absolute top-[-20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20,184,166,0.15) 0%, rgba(20,184,166,0.05) 40%, transparent 70%)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary offset glow */}
      <motion.div
        className="absolute top-[5%] left-[60%] h-[400px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20,184,166,0.08) 0%, rgba(16,185,129,0.03) 50%, transparent 70%)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
