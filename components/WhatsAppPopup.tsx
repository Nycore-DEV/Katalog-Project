"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import { useStore } from "@/lib/store";

export default function WhatsAppPopup() {
  const { hasJoinedWhatsapp, setJoinedWhatsapp, settings } = useStore();
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (!useStore.getState().hasJoinedWhatsapp) {
      const t = setTimeout(() => setOpen(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  if (!hydrated || hasJoinedWhatsapp || !open) return null;

  const handleJoin = () => {
    setJoinedWhatsapp(true);
    setOpen(false);
    window.open(settings.whatsappChannelUrl, "_blank", "noopener,noreferrer");
  };

  const handleLater = () => {
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-sm rounded-t-xl2 sm:rounded-xl2 border border-base-border bg-base-navy p-6 shadow-card-hover animate-[popupIn_0.35s_ease-out]">
        <div className="flex justify-end">
          <button
            onClick={handleLater}
            aria-label="Tutup"
            className="rounded-full p-1 text-ink-muted hover:bg-white/5 hover:text-ink-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl2 bg-blue-gradient shadow-card-hover">
            {settings.logoImageUrl ? (
              <div className="relative h-full w-full">
                <Image src={settings.logoImageUrl} alt={settings.siteName} fill className="object-cover" />
              </div>
            ) : (
              <span className="font-display text-lg font-extrabold">{settings.logoText}</span>
            )}
          </div>
          <h2 className="font-display text-lg font-bold">Gabung WhatsApp Channel</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Dapatkan info produk baru, promo, dan update rilis langsung dari {settings.siteName}
            sebelum yang lain tahu.
          </p>

          <button
            onClick={handleJoin}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl2 bg-blue-gradient py-3 font-semibold text-white shadow-card-hover transition active:scale-[0.98]"
          >
            <MessageCircle size={18} />
            Join Channel
          </button>
          <button
            onClick={handleLater}
            className="mt-2 w-full rounded-xl2 py-2.5 text-sm font-medium text-ink-muted transition hover:text-ink-white"
          >
            Nanti saja
          </button>
        </div>
      </div>
      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
