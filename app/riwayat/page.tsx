"use client";

import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/format";
import { ExternalLink, CheckCircle2, Clock, XCircle } from "lucide-react";
import { TransactionStatus } from "@/lib/types";

const statusMap: Record<TransactionStatus, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  berhasil: { label: "Berhasil", className: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10", icon: CheckCircle2 },
  pending: { label: "Pending", className: "text-accent-gold border-accent-gold/30 bg-accent-gold/10", icon: Clock },
  gagal: { label: "Gagal", className: "text-red-400 border-red-400/30 bg-red-400/10", icon: XCircle }
};

export default function HistoryPage() {
  const transactions = useStore((s) => s.transactions);

  return (
    <div className="px-4 pt-6">
      <h1 className="mb-4 font-display text-xl font-bold">Riwayat Transaksi</h1>

      {transactions.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink-muted">Belum ada transaksi.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {transactions.map((tx) => {
            const status = statusMap[tx.status];
            const StatusIcon = status.icon;
            return (
              <div
                key={tx.id}
                className="rounded-xl2 border border-base-border bg-base-card p-4 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink-white">{tx.productName}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{formatDate(tx.date)}</p>
                  </div>
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${status.className}`}
                  >
                    <StatusIcon size={12} />
                    {status.label}
                  </span>
                </div>

                {tx.status === "berhasil" && (
                  <a
                    href={tx.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blueLight hover:underline"
                  >
                    Buka kembali link produk
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
