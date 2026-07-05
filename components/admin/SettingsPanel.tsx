"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

export default function SettingsPanel() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof typeof form, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const field =
    "w-full rounded-xl border border-base-border bg-base-navy px-3.5 py-2.5 text-sm text-ink-white placeholder:text-ink-faint focus:border-accent-blue focus:outline-none";
  const label = "mb-1 block text-xs font-medium text-ink-muted";

  return (
    <div className="flex flex-col gap-3.5">
      <div>
        <label className={label}>Nama Website</label>
        <input className={field} value={form.siteName} onChange={(e) => update("siteName", e.target.value)} />
      </div>
      <div>
        <label className={label}>Teks Inisial Logo (dipakai jika Gambar Logo kosong)</label>
        <input
          maxLength={3}
          className={field}
          placeholder="NX"
          value={form.logoText}
          onChange={(e) => update("logoText", e.target.value)}
        />
      </div>
      <div>
        <label className={label}>URL Gambar Logo (opsional)</label>
        <input
          className={field}
          placeholder="https://... atau /logo.png"
          value={form.logoImageUrl ?? ""}
          onChange={(e) => update("logoImageUrl", e.target.value)}
        />
        <p className="mt-1 text-[11px] text-ink-faint">
          Kosongkan untuk memakai teks inisial. Isi dengan link gambar (persegi, minimal 128×128px) untuk memakai logo asli.
        </p>
      </div>
      <div>
        <label className={label}>Tagline</label>
        <input className={field} value={form.siteTagline} onChange={(e) => update("siteTagline", e.target.value)} />
      </div>
      <div>
        <label className={label}>Judul Banner</label>
        <input className={field} value={form.bannerHeadline} onChange={(e) => update("bannerHeadline", e.target.value)} />
      </div>
      <div>
        <label className={label}>Deskripsi Banner</label>
        <textarea rows={2} className={field} value={form.bannerSubtext} onChange={(e) => update("bannerSubtext", e.target.value)} />
      </div>
      <div>
        <label className={label}>Link WhatsApp Channel</label>
        <input className={field} value={form.whatsappChannelUrl} onChange={(e) => update("whatsappChannelUrl", e.target.value)} />
      </div>
      <div>
        <label className={label}>Link WhatsApp (Nomor)</label>
        <input className={field} value={form.whatsappNumberUrl} onChange={(e) => update("whatsappNumberUrl", e.target.value)} />
      </div>
      <div>
        <label className={label}>Produk per Halaman</label>
        <input
          type="number"
          min={2}
          step={2}
          className={field}
          value={form.productsPerPage}
          onChange={(e) => update("productsPerPage", Number(e.target.value))}
        />
      </div>
      <div>
        <label className={label}>Password Admin</label>
        <input className={field} value={form.adminPassword} onChange={(e) => update("adminPassword", e.target.value)} />
      </div>

      <button
        onClick={handleSave}
        className="mt-2 w-full rounded-xl2 bg-blue-gradient py-3 text-sm font-semibold text-white shadow-card-hover"
      >
        {saved ? "Tersimpan ✓" : "Simpan Pengaturan"}
      </button>
    </div>
  );
}
