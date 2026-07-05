"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Product, ProductTier } from "@/lib/types";
import { X } from "lucide-react";

const emptyProduct = (order: number): Product => ({
  id: "",
  name: "",
  price: 0,
  tier: "basic",
  category: "Umum",
  shortDescription: "",
  fullDescription: "",
  specs: "",
  images: [""],
  videoUrl: "",
  actionUrl: "",
  isNew: true,
  active: true,
  order,
  createdAt: Date.now()
});

export default function ProductForm({
  initial,
  nextOrder,
  onSave,
  onClose
}: {
  initial?: Product;
  nextOrder: number;
  onSave: (product: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Product>(initial ?? emptyProduct(nextOrder));

  const update = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.actionUrl.trim()) return;
    onSave({
      ...form,
      id: form.id || nanoid(8),
      images: form.images.filter((i) => i.trim() !== "")
    });
    onClose();
  };

  const field =
    "w-full rounded-xl border border-base-border bg-base-navy px-3.5 py-2.5 text-sm text-ink-white placeholder:text-ink-faint focus:border-accent-blue focus:outline-none";
  const label = "mb-1 block text-xs font-medium text-ink-muted";

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center">
      <form
        onSubmit={handleSubmit}
        className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-t-xl2 border border-base-border bg-base-navy p-5 sm:rounded-xl2"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-bold">
            {initial ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <button type="button" onClick={onClose} className="text-ink-muted hover:text-ink-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          <div>
            <label className={label}>Nama Produk</label>
            <input
              required
              className={field}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Harga (Rp)</label>
              <input
                type="number"
                min={0}
                className={field}
                value={form.price}
                onChange={(e) => update("price", Number(e.target.value))}
              />
            </div>
            <div>
              <label className={label}>Kategori</label>
              <input
                className={field}
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={label}>Tipe Produk</label>
            <div className="flex gap-2">
              {(["premium", "basic"] as ProductTier[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => update("tier", t)}
                  className={`flex-1 rounded-xl border py-2 text-xs font-semibold capitalize transition ${
                    form.tier === t
                      ? t === "premium"
                        ? "border-accent-gold bg-gold-gradient text-base-black"
                        : "border-accent-blue bg-blue-gradient text-white"
                      : "border-base-border text-ink-muted"
                  }`}
                >
                  {t === "premium" ? "Premium (Beli)" : "Basic (Download)"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={label}>Deskripsi Singkat (maks 2 baris)</label>
            <textarea
              rows={2}
              className={field}
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Deskripsi Lengkap</label>
            <textarea
              rows={3}
              className={field}
              value={form.fullDescription}
              onChange={(e) => update("fullDescription", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Spesifikasi (opsional)</label>
            <input
              className={field}
              value={form.specs}
              onChange={(e) => update("specs", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>URL Foto Produk (satu per baris)</label>
            <textarea
              rows={3}
              className={field}
              placeholder="https://..."
              value={form.images.join("\n")}
              onChange={(e) => update("images", e.target.value.split("\n"))}
            />
          </div>

          <div>
            <label className={label}>URL Video Review — embed (opsional)</label>
            <input
              className={field}
              placeholder="https://www.youtube.com/embed/..."
              value={form.videoUrl}
              onChange={(e) => update("videoUrl", e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Link Tujuan Tombol (Beli/Download)</label>
            <input
              required
              className={field}
              placeholder="https://..."
              value={form.actionUrl}
              onChange={(e) => update("actionUrl", e.target.value)}
            />
          </div>

          <div className="flex gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs text-ink-muted">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(e) => update("isNew", e.target.checked)}
              />
              Label &quot;Baru&quot;
            </label>
            <label className="flex items-center gap-2 text-xs text-ink-muted">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => update("active", e.target.checked)}
              />
              Aktifkan produk
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-xl2 bg-blue-gradient py-3 text-sm font-semibold text-white shadow-card-hover"
        >
          Simpan Produk
        </button>
      </form>
    </div>
  );
}
