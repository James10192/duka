import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: "DUKA — Gestion commerciale intelligente",
  description:
    "La plateforme de gestion commerciale conçue pour les commerces en Afrique francophone. Stock, ventes, factures, CRM et IA.",
  keywords: [
    "gestion commerciale",
    "Afrique",
    "Côte d'Ivoire",
    "factures",
    "stock",
    "Mobile Money",
    "OHADA",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
