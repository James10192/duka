"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { phoneAuth, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState<"email" | "phone">("email");
  const [phone, setPhone] = useState("+225");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePhoneSendOtp() {
    setError("");
    setLoading(true);
    try {
      await phoneAuth.sendOtp({ phoneNumber: phone });
      setOtpSent(true);
      toast.success("Code envoye par SMS");
    } catch {
      setError("Erreur lors de l'envoi du code");
    } finally {
      setLoading(false);
    }
  }

  async function handlePhoneVerify() {
    setError("");
    setLoading(true);
    try {
      await phoneAuth.verify({ phoneNumber: phone, code: otp });
      router.push(redirect);
    } catch {
      setError("Code invalide");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailLogin() {
    setError("");
    setLoading(true);
    try {
      await signIn.email({ email, password });
      router.push(redirect);
    } catch {
      setError("Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <span className="font-mono text-xl font-bold text-primary">D</span>
            <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl" />
          </div>
          <h1 className="font-mono text-2xl font-bold tracking-tight text-zinc-100">
            Connexion
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Connectez-vous a votre compte DUKA
          </p>
        </div>

        {/* Social buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() =>
              signIn.social({ provider: "google", callbackURL: redirect })
            }
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuer avec Google
          </button>
          <button
            onClick={() =>
              signIn.social({ provider: "github", callbackURL: redirect })
            }
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continuer avec GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-zinc-950 px-3 text-zinc-600">
              ou par email
            </span>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-1 rounded-lg bg-zinc-900/50 p-1">
          <button
            onClick={() => setMode("email")}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === "email"
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setMode("phone")}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === "phone"
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Telephone
          </button>
        </div>

        {/* Error display */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        {mode === "email" ? (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Mot de passe
                </label>
                <a
                  href="#"
                  className="text-xs text-zinc-500 transition-colors hover:text-primary"
                >
                  Mot de passe oublie ?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 pr-10 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors hover:text-zinc-400"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={handleEmailLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
              {!loading && <ArrowRight className="size-4" />}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                Numero de telephone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+225 07 00 00 00 00"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                disabled={otpSent}
              />
            </div>

            {otpSent && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Code de verification
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-center font-mono text-lg tracking-widest text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                />
              </div>
            )}

            <button
              onClick={otpSent ? handlePhoneVerify : handlePhoneSendOtp}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
            >
              {loading
                ? "Chargement..."
                : otpSent
                  ? "Verifier le code"
                  : "Envoyer le code SMS"}
              {!loading && <ArrowRight className="size-4" />}
            </button>

            {otpSent && (
              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="w-full text-sm text-zinc-500 hover:text-zinc-300"
              >
                Renvoyer le code
              </button>
            )}
          </div>
        )}

        <p className="text-center text-sm text-zinc-500">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="text-primary transition-colors hover:text-primary/80"
          >
            Creer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
