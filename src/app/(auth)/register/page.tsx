"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { phoneAuth, signUp } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("+225");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePhoneSendOtp() {
    if (!name.trim()) {
      toast.error("Entrez votre nom");
      return;
    }
    setLoading(true);
    try {
      await phoneAuth.sendOtp({ phoneNumber: phone });
      setOtpSent(true);
      toast.success("Code envoyé par SMS");
    } catch {
      toast.error("Erreur lors de l'envoi du code");
    } finally {
      setLoading(false);
    }
  }

  async function handlePhoneVerify() {
    setLoading(true);
    try {
      await phoneAuth.verify({
        phoneNumber: phone,
        code: otp,
      });
      router.push("/onboarding");
    } catch {
      toast.error("Code invalide");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailRegister() {
    if (!name.trim()) {
      toast.error("Entrez votre nom");
      return;
    }
    setLoading(true);
    try {
      await signUp.email({ email, password, name });
      router.push("/onboarding");
    } catch {
      toast.error("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">DUKA</h1>
        <p className="mt-2 text-muted-foreground">Créer votre compte</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Votre nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Aminata Koné"
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
        />
      </div>

      <div className="flex gap-2 rounded-lg bg-secondary p-1">
        <button
          onClick={() => setMode("phone")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            mode === "phone"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Téléphone
        </button>
        <button
          onClick={() => setMode("email")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            mode === "email"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Email
        </button>
      </div>

      {mode === "phone" ? (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+225 07 00 00 00 00"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
              disabled={otpSent}
            />
          </div>

          {otpSent && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Code de vérification
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-center font-mono text-lg tracking-widest outline-none ring-ring focus:ring-2"
              />
            </div>
          )}

          <button
            onClick={otpSent ? handlePhoneVerify : handlePhoneSendOtp}
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading
              ? "Chargement..."
              : otpSent
                ? "Vérifier le code"
                : "Envoyer le code SMS"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 caractères"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
          <button
            onClick={handleEmailRegister}
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
