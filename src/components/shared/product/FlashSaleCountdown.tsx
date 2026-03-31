"use client";

import { useEffect, useState } from "react";

type FlashSaleCountdownProps = {
  /** Tổng số giây còn lại khi khởi tạo */
  initialSeconds: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function FlashSaleCountdown({ initialSeconds }: FlashSaleCountdownProps) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (remaining <= 0) {
    return <span className="text-xs text-[#ee4d2d]">ĐÃ KẾT THÚC</span>;
  }

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return (
    <span className="text-xs text-[#ee4d2d]">
      KẾT THÚC TRONG{" "}
      <span className="inline-flex items-center gap-0.5 font-mono font-semibold">
        <span className="rounded bg-[#ee4d2d] px-1 py-0.5 text-white">{pad(hours)}</span>
        <span>:</span>
        <span className="rounded bg-[#ee4d2d] px-1 py-0.5 text-white">{pad(minutes)}</span>
        <span>:</span>
        <span className="rounded bg-[#ee4d2d] px-1 py-0.5 text-white">{pad(seconds)}</span>
      </span>
    </span>
  );
}
