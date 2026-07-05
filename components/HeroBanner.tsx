"use client";

import { useStore } from "@/lib/store";
import { ChevronDown } from "lucide-react";

export default function HeroBanner() {
  const settings = useStore((s) => s.settings);

  const scrollToCatalog = () => {
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient px-5 pb-12 pt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-blue/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-accent-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-base-border bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-ink-muted">
          {settings.siteTagline}
        </span>
        <h1 className="mt-4 font-display text-[26px] font-extrabold leading-tight tracking-tight sm:text-3xl">
          {settings.bannerHeadline}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
          {settings.bannerSubtext}
        </p>
        <button
          onClick={scrollToCatalog}
          className="mt-6 inline-flex items-center gap-2 rounded-xl2 bg-blue-gradient px-6 py-3 text-sm font-semibold text-white shadow-card-hover transition active:scale-[0.98]"
        >
          Lihat Katalog
          <ChevronDown size={16} />
        </button>
      </div>
    </section>
  );
}
