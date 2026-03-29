"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ERROR_MESSAGES: Record<string, string> = {
  unable_to_link_account:
    "Ce compte est deja lie a une autre methode de connexion.",
  invalid_callback_request: "Erreur de callback OAuth. Reessayez.",
  state_not_found: "Session OAuth expiree. Reessayez.",
};

export function ErrorToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const err = searchParams.get("error");
    if (err) {
      toast.error(ERROR_MESSAGES[err] || `Erreur: ${err}`);
    }
  }, [searchParams]);

  return null;
}
