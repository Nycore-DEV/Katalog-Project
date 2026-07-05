import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, SiteSettings, Transaction } from "./types";
import { defaultSettings, seedProducts, seedTransactions } from "./seed";

interface StoreState {
  products: Product[];
  transactions: Transaction[];
  settings: SiteSettings;
  hasJoinedWhatsapp: boolean;
  isAdminAuthed: boolean;

  addProduct: (product: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  reorderProducts: (orderedIds: string[]) => void;

  addTransaction: (tx: Transaction) => void;

  updateSettings: (patch: Partial<SiteSettings>) => void;

  setJoinedWhatsapp: (v: boolean) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: seedProducts,
      transactions: seedTransactions,
      settings: defaultSettings,
      hasJoinedWhatsapp: false,
      isAdminAuthed: false,

      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),

      updateProduct: (id, patch) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p))
        })),

      deleteProduct: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

      reorderProducts: (orderedIds) =>
        set((state) => {
          const map = new Map(state.products.map((p) => [p.id, p]));
          const reordered = orderedIds
            .map((id, idx) => {
              const p = map.get(id);
              return p ? { ...p, order: idx + 1 } : undefined;
            })
            .filter(Boolean) as Product[];
          return { products: reordered };
        }),

      addTransaction: (tx) =>
        set((state) => ({ transactions: [tx, ...state.transactions] })),

      updateSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),

      setJoinedWhatsapp: (v) => set({ hasJoinedWhatsapp: v }),

      loginAdmin: (password) => {
        const ok = password === get().settings.adminPassword;
        if (ok) set({ isAdminAuthed: true });
        return ok;
      },
      logoutAdmin: () => set({ isAdminAuthed: false })
    }),
    {
      name: "katalog-digital-store"
    }
  )
);
