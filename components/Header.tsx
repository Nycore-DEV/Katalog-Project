"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Header() {
  const settings = useStore((s) => s.settings);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-base-border/70 bg-base-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          {settings.logoImageUrl ? (
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-base-navy">
              <Image
                src={settings.logoImageUrl}
                alt={settings.siteName}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-gradient font-display text-xs font-extrabold">
              {settings.logoText}
            </div>
          )}
          <span className="font-display text-[15px] font-bold tracking-tight">
            {settings.siteName}
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <a
            href={settings.whatsappNumberUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi via WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-base-border text-ink-muted transition hover:border-accent-blue hover:text-accent-blueLight"
          >
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
    </header>
  );
}
