"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useStore } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";

export default function SearchPage() {
  const products = useStore((s) => s.products);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => p.active)
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div className="px-4 pt-6">
      <h1 className="mb-4 font-display text-xl font-bold">Cari Produk</h1>

      <div className="relative mb-6">
        <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ketik nama produk atau kategori..."
          className="w-full rounded-xl2 border border-base-border bg-base-card py-3 pl-10 pr-4 text-sm text-ink-white placeholder:text-ink-faint focus:border-accent-blue focus:outline-none"
        />
      </div>

      {query.trim() === "" ? (
        <p className="text-center text-sm text-ink-muted">Mulai ketik untuk mencari produk.</p>
      ) : (
        <>
          <p className="mb-3 text-xs text-ink-muted">{results.length} produk ditemukan</p>
          <ProductGrid products={results} />
        </>
      )}
    </div>
  );
}
