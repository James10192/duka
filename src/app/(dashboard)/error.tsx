"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  const isAuthError =
    error.message?.includes("Not authenticated") ||
    error.message?.includes("session");

  if (isAuthError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Session expiree</h2>
        <p className="text-muted-foreground">
          Votre session a expire. Veuillez vous reconnecter.
        </p>
        <Button onClick={() => (window.location.href = "/login")}>
          Se reconnecter
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Une erreur est survenue</h2>
      <p className="text-muted-foreground text-sm">
        {error.message || "Erreur inattendue"}
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={reset}>
          Reessayer
        </Button>
        <Button onClick={() => (window.location.href = "/dashboard")}>
          Retour au dashboard
        </Button>
      </div>
    </div>
  );
}
