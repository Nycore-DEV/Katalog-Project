"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Receipt } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cari", label: "Search", icon: Search },
  { href: "/riwayat", label: "Riwayat", icon: Receipt }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-base-border/70 bg-base-black/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md shadow-nav">
      <div className="mx-auto flex max-w-2xl items-stretch justify-around px-2 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex min-w-[76px] flex-col items-center gap-1 rounded-xl2 px-3 py-1.5 transition"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                  active ? "bg-blue-gradient shadow-card-hover" : "text-ink-muted"
                }`}
              >
                <Icon size={18} className={active ? "text-white" : "text-ink-muted"} />
              </span>
              <span className={`text-[11px] font-medium ${active ? "text-ink-white" : "text-ink-faint"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
