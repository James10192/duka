"use client";

import { useState } from "react";
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
  const { theme, setTheme } = useTheme();

  const unreadCount = 0;

  const userInitial =
    session?.user?.name?.[0]?.toUpperCase() ||
    session?.user?.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <header className="flex h-14 items-center gap-2 border-b border-zinc-800/50 px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-2 h-4" />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="relative rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-zinc-200"
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
                className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                  <h3 className="text-sm font-semibold text-zinc-200">
                    Notifications
                  </h3>
                  <button className="text-xs text-zinc-500 transition-colors hover:text-zinc-300">
                    Tout marquer comme lu
                  </button>
                </div>

                {/* Empty state */}
                <div className="flex flex-col items-center justify-center gap-2 px-4 py-8">
                  <Bell className="size-8 text-zinc-600" />
                  <p className="text-sm text-zinc-500">Aucune notification</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      {/* User profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/50"
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
          <ChevronDown className="size-3.5 text-zinc-500" />
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
                className="absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-zinc-800 bg-zinc-900 py-1 shadow-xl"
              >
                {/* User info header */}
                <div className="border-b border-zinc-800 px-3 py-2">
                  <p className="truncate text-sm font-medium text-zinc-200">
                    {session?.user?.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    {session?.user?.email}
                  </p>
                </div>

                {/* Settings link */}
                <Link
                  href="/dashboard/parametres"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                >
                  <Settings className="size-4" />
                  Parametres
                </Link>

                {/* Sign out */}
                <div className="border-t border-zinc-800">
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
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 transition-colors hover:bg-zinc-800 hover:text-red-300"
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
