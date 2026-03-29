"use client";

import { motion } from "motion/react";

export function PulseLine() {
  return (
    <div className="relative mx-auto h-px max-w-4xl overflow-hidden">
      <div className="absolute inset-0 bg-zinc-800" />
      <motion.div
        className="absolute top-0 h-full w-1/3"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(20,184,166,0.6), transparent)",
        }}
        animate={{
          x: ["-100%", "400%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1,
        }}
      />
    </div>
  );
}
