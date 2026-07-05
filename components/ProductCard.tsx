"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Download, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const isPremium = product.tier === "premium";

  return (
    <Link
      href={`/produk/${product.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl2 border bg-base-card shadow-card transition hover:-translate-y-0.5 ${
        isPremium ? "border-accent-gold/40 hover:shadow-gold-glow" : "border-base-border hover:shadow-card-hover"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-navy">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 300px"
          className="object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute left-2 top-2 rounded-md bg-blue-gradient px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-card">
            Baru
          </span>
        )}
        {isPremium && (
          <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-gradient shadow-gold-glow">
            <Star size={12} className="fill-base-black text-base-black" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink-white">
          {product.name}
        </h3>
        <p className="font-mono text-[13px] font-semibold text-accent-blueLight">
          {formatPrice(product.price)}
        </p>
        <p className="line-clamp-2 text-[11.5px] leading-snug text-ink-muted">
          {product.shortDescription}
        </p>

        <div
          className={`mt-2 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-semibold ${
            isPremium
              ? "bg-gold-gradient text-base-black"
              : "border border-accent-blue/50 text-accent-blueLight"
          }`}
        >
          {isPremium ? (
            <>
              <ShoppingBag size={13} /> Beli
            </>
          ) : (
            <>
              <Download size={13} /> Download
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
