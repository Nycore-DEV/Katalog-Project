"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onChange
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    const clamped = Math.min(Math.max(p, 1), totalPages);
    onChange(clamped);
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-3 px-4">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-base-border text-ink-muted transition disabled:opacity-30 enabled:hover:border-accent-blue enabled:hover:text-accent-blueLight"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="font-mono text-xs text-ink-muted">
        Halaman <span className="font-semibold text-ink-white">{page}</span> dari {totalPages}
      </span>
      <button
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-base-border text-ink-muted transition disabled:opacity-30 enabled:hover:border-accent-blue enabled:hover:text-accent-blueLight"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
