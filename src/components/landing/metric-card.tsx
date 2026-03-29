"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "motion/react";

export function MetricCard({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      motionVal.set(value);
    }
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(v).toLocaleString("fr-FR");
      }
    });
    return unsubscribe;
  }, [spring]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-mono text-3xl font-bold text-zinc-100 md:text-4xl">
        <span ref={displayRef}>0</span>
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </motion.div>
  );
}
