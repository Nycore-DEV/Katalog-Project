import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <p className="font-display text-sm font-semibold text-ink-white">Belum ada produk</p>
        <p className="max-w-xs text-xs text-ink-muted">
          Produk yang cocok belum ditemukan. Coba kata kunci lain atau kembali lagi nanti.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
