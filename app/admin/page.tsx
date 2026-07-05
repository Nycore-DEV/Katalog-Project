"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useStore } from "@/lib/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const loginAdmin = useStore((s) => s.loginAdmin);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(password);
    if (ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Password salah, coba lagi.");
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-blue-gradient shadow-card-hover">
        <Lock size={20} className="text-white" />
      </div>
      <h1 className="mt-4 font-display text-lg font-bold">Login Admin</h1>
      <p className="mt-1 text-center text-xs text-ink-muted">
        Masuk untuk mengelola katalog produk dan pengaturan website.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-xs">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password admin"
          className="w-full rounded-xl2 border border-base-border bg-base-card px-4 py-3 text-sm text-ink-white placeholder:text-ink-faint focus:border-accent-blue focus:outline-none"
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl2 bg-blue-gradient py-3 text-sm font-semibold text-white shadow-card-hover transition active:scale-[0.98]"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
