import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import BackToTop from "@/components/BackToTop";
import LoadingScreen from "@/components/LoadingScreen";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Nexa Store — Katalog Produk Digital",
  description: "Katalog produk digital modern: template, preset, ebook, dan lainnya."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-base-black text-ink-white antialiased`}>
        <LoadingScreen />
        <WhatsAppPopup />
        <Header />
        <main className="min-h-screen pb-24 pt-16">{children}</main>
        <BottomNav />
        <BackToTop />
      </body>
    </html>
  );
}
