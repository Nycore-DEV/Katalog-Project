"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 650);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base-black">
      <div className="h-11 w-11 rounded-xl2 bg-blue-gradient flex items-center justify-center font-display font-extrabold text-sm shadow-card-hover animate-pulse">
        NX
      </div>
      <div className="mt-4 h-1 w-28 overflow-hidden rounded-full bg-base-border">
        <div className="h-full w-1/2 animate-[loadingbar_0.65s_ease-in-out_infinite] bg-blue-gradient" />
      </div>
      <style>{`
        @keyframes loadingbar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}
