"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Star, LogOut, Package, Settings2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { Product } from "@/lib/types";
import ProductForm from "@/components/admin/ProductForm";
import SettingsPanel from "@/components/admin/SettingsPanel";

export default function AdminDashboardPage() {
  const router = useRouter();
  const isAdminAuthed = useStore((s) => s.isAdminAuthed);
  const products = useStore((s) => s.products);
  const deleteProduct = useStore((s) => s.deleteProduct);
  const addProduct = useStore((s) => s.addProduct);
  const updateProduct = useStore((s) => s.updateProduct);
  const logoutAdmin = useStore((s) => s.logoutAdmin);

  const [hydrated, setHydrated] = useState(false);
  const [tab, setTab] = useState<"produk" | "pengaturan">("produk");
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (!useStore.getState().isAdminAuthed) {
      router.replace("/admin");
    }
  }, [router]);

  if (!hydrated || !isAdminAuthed) return null;

  const sorted = [...products].sort((a, b) => a.order - b.order);

  const handleSave = (product: Product) => {
    if (editing) {
      updateProduct(product.id, product);
    } else {
      addProduct(product);
    }
    setEditing(null);
  };

  return (
    <div className="px-4 pt-5">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-lg font-bold">Dashboard Admin</h1>
        <button
          onClick={() => {
            logoutAdmin();
            router.push("/");
          }}
          className="flex items-center gap-1.5 rounded-full border border-base-border px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink-white"
        >
          <LogOut size={13} /> Keluar
        </button>
      </div>

      <div className="mb-5 flex gap-2 rounded-xl2 border border-base-border bg-base-card p-1">
        <button
          onClick={() => setTab("produk")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition ${
            tab === "produk" ? "bg-blue-gradient text-white" : "text-ink-muted"
          }`}
        >
          <Package size={14} /> Produk
        </button>
        <button
          onClick={() => setTab("pengaturan")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition ${
            tab === "pengaturan" ? "bg-blue-gradient text-white" : "text-ink-muted"
          }`}
        >
          <Settings2 size={14} /> Pengaturan
        </button>
      </div>

      {tab === "produk" ? (
        <div>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl2 border border-dashed border-accent-blue/50 py-3 text-sm font-semibold text-accent-blueLight"
          >
            <Plus size={16} /> Tambah Produk
          </button>

          <div className="flex flex-col gap-2.5">
            {sorted.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl2 border border-base-border bg-base-card p-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-ink-white">{p.name}</p>
                    {p.tier === "premium" && (
                      <Star size={12} className="shrink-0 fill-accent-gold text-accent-gold" />
                    )}
                    {!p.active && (
                      <span className="shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-ink-faint">
                        nonaktif
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-ink-muted">{formatPrice(p.price)}</p>
                </div>
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                  aria-label="Edit"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-base-border text-ink-muted hover:text-accent-blueLight"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Hapus "${p.name}"?`)) deleteProduct(p.id);
                  }}
                  aria-label="Hapus"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-base-border text-ink-muted hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SettingsPanel />
      )}

      {showForm && (
        <ProductForm
          initial={editing ?? undefined}
          nextOrder={sorted.length + 1}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
