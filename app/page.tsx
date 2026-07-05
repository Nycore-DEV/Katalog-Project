"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  const products = useStore((s) => s.products);
  const perPage = useStore((s) => s.settings.productsPerPage);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("Semua");

  const activeProducts = useMemo(
    () => products.filter((p) => p.active).sort((a, b) => a.order - b.order),
    [products]
  );

  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(activeProducts.map((p) => p.category)))],
    [activeProducts]
  );

  const filtered = useMemo(
    () => (category === "Semua" ? activeProducts : activeProducts.filter((p) => p.category === category)),
    [activeProducts, category]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div>
      <HeroBanner />

      <div id="katalog" className="pt-6">
        <div className="mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                category === cat
                  ? "border-transparent bg-blue-gradient text-white shadow-card"
                  : "border-base-border text-ink-muted hover:border-accent-blue/60 hover:text-ink-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <ProductGrid products={pageItems} />
        <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
