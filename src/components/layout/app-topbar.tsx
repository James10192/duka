"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Settings, LogOut, ChevronDown, Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { useTheme } from "next-themes";

export function AppTopbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  function cycleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  const unreadCount = 0;

  const userInitial =
    session?.user?.name?.[0]?.toUpperCase() ||
    session?.user?.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <header className="flex h-14 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-2 h-4" />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <button
        onClick={cycleTheme}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Changer le theme"
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>

        <AnimatePresence>
          {notificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-popover shadow-xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Notifications
                  </h3>
                  <button className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                    Tout marquer comme lu
                  </button>
                </div>

                {/* Empty state */}
                <div className="flex flex-col items-center justify-center gap-2 px-4 py-8">
                  <Bell className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Aucune notification</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* User profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Avatar"}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
              {userInitial}
            </div>
          )}
          <span className="max-w-[120px] truncate">
            {session?.user?.name || session?.user?.email || "Utilisateur"}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>

        <AnimatePresence>
          {userMenuOpen && (
            <>
              {/* Overlay to close on outside click */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setUserMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-border bg-popover py-1 shadow-xl"
              >
                {/* User info header */}
                <div className="border-b border-border px-3 py-2">
                  <p className="truncate text-sm font-medium text-foreground">
                    {session?.user?.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>

                {/* Settings link */}
                <Link
                  href="/dashboard/parametres"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Settings className="size-4" />
                  Parametres
                </Link>

                {/* Sign out */}
                <div className="border-t border-border">
                  <button
                    onClick={() => {
                      signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            window.location.href = "/login";
                          },
                        },
                      });
                      setUserMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 transition-colors hover:bg-muted hover:text-red-300"
                  >
                    <LogOut className="size-4" />
                    Deconnexion
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
