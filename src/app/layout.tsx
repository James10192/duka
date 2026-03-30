import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DUKA — Gestion commerciale intelligente pour l'Afrique",
    template: "%s | DUKA",
  },
  description:
    "La plateforme de gestion commerciale concue pour les commerces en Afrique francophone. Stock, ventes, factures OHADA, CRM, IA generative et Mobile Money.",
  keywords: [
    "gestion commerciale",
    "Afrique",
    "Cote d'Ivoire",
    "factures OHADA",
    "stock",
    "Mobile Money",
    "point de vente",
    "CRM",
    "SaaS",
    "IA",
  ],
  metadataBase: new URL("https://duka-rho.vercel.app"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://duka-rho.vercel.app",
    siteName: "DUKA",
    title: "DUKA — Gestion commerciale intelligente pour l'Afrique",
    description:
      "Stock, ventes, factures OHADA, CRM, IA generative et Mobile Money. Le tout-en-un pour les commercants africains.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DUKA — Gestion commerciale intelligente",
    description:
      "Stock, ventes, factures OHADA, CRM, IA et Mobile Money pour l'Afrique francophone.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
