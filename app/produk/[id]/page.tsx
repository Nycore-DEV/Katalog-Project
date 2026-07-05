"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowLeft, Star, ShoppingBag, Download } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { nanoid } from "nanoid";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = useStore((s) => s.products.find((p) => p.id === id));
  const addTransaction = useStore((s) => s.addTransaction);
  const [slide, setSlide] = useState(0);

  const slides = useMemo(() => {
    if (!product) return [];
    const items: { type: "video" | "image"; src: string }[] = [];
    if (product.videoUrl) items.push({ type: "video", src: product.videoUrl });
    product.images.forEach((src) => items.push({ type: "image", src }));
    return items;
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 pt-20 text-center">
        <p className="font-display text-base font-semibold">Produk tidak ditemukan</p>
        <button
          onClick={() => router.push("/")}
          className="rounded-xl2 bg-blue-gradient px-5 py-2.5 text-sm font-semibold text-white"
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  const isPremium = product.tier === "premium";

  const next = () => setSlide((s) => (s + 1) % slides.length);
  const prev = () => setSlide((s) => (s - 1 + slides.length) % slides.length);

  const handleAction = () => {
    addTransaction({
      id: nanoid(8),
      productId: product.id,
      productName: product.name,
      date: Date.now(),
      status: "pending",
      actionUrl: product.actionUrl
    });
    window.open(product.actionUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pb-8">
      <div className="sticky top-16 z-10 flex items-center gap-3 bg-base-black/90 px-4 py-3 backdrop-blur">
        <button
          onClick={() => router.back()}
          aria-label="Kembali"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-base-border text-ink-muted hover:text-ink-white"
        >
          <ArrowLeft size={15} />
        </button>
        <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
      </div>

      <div className="relative mx-4 mt-2 aspect-[4/3] overflow-hidden rounded-xl2 bg-base-navy">
        {slides[slide]?.type === "video" ? (
          <iframe
            src={slides[slide].src}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image
            src={slides[slide]?.src ?? product.images[0]}
            alt={product.name}
            fill
            sizes="600px"
            className="object-cover"
          />
        )}

        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Sebelumnya"
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Berikutnya"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === slide ? "bg-accent-blueLight" : "bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}

        {isPremium && (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient shadow-gold-glow">
            <Star size={13} className="fill-base-black text-base-black" />
          </span>
        )}
      </div>

      <div className="px-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display text-lg font-bold leading-snug">{product.name}</h1>
        </div>
        <p className="mt-1 font-mono text-lg font-bold text-accent-blueLight">
          {formatPrice(product.price)}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{product.fullDescription}</p>

        {product.specs && (
          <div className="mt-4 rounded-xl2 border border-base-border bg-base-card p-3.5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">Spesifikasi</p>
            <p className="text-sm text-ink-muted">{product.specs}</p>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-[64px] z-40 border-t border-base-border bg-base-black/95 px-4 py-3 backdrop-blur">
        <button
          onClick={handleAction}
          className={`flex w-full items-center justify-center gap-2 rounded-xl2 py-3.5 text-sm font-semibold shadow-card-hover transition active:scale-[0.98] ${
            isPremium ? "bg-gold-gradient text-base-black" : "bg-blue-gradient text-white"
          }`}
        >
          {isPremium ? (
            <>
              <ShoppingBag size={16} /> Beli Sekarang
            </>
          ) : (
            <>
              <Download size={16} /> Download Sekarang
            </>
          )}
        </button>
      </div>
    </div>
  );
}
