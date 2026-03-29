"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DukaLogo } from "@/components/duka-logo";

const navLinks = [
  { label: "Fonctionnalites", href: "#fonctionnalites" },
  { label: "Tarifs", href: "#tarifs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <DukaLogo size={24} />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/docs"
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-200"
            title="Documentation"
          >
            <BookOpen className="size-[18px]" />
          </Link>
          <a
            href="https://github.com/James10192/duka"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-200"
            title="GitHub"
          >
            <svg className="size-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <div className="mx-1 h-5 w-px bg-zinc-800" />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Demarrer</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-zinc-400 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-md md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Documentation
              </Link>
              <div className="flex gap-3 pt-3">
                <Button variant="ghost" size="sm" className="flex-1" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    Demarrer
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
