"use client";

import { useState } from "react";

type QuantitySelectorProps = {
  maxStock: number;
};

export default function QuantitySelector({ maxStock }: QuantitySelectorProps) {
  const safeMaxStock = Math.max(1, maxStock);
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increase = () => {
    setQuantity((prev) => Math.min(safeMaxStock, prev + 1));
  };

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex overflow-hidden rounded border border-[#d9d9d9]">
        <button
          type="button"
          className="h-8 w-8 text-[#999] disabled:cursor-not-allowed disabled:bg-[#f7f7f7] disabled:text-[#d5d5d5]"
          aria-label="Giảm số lượng"
          onClick={decrease}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="flex h-8 min-w-10 items-center justify-center border-x border-[#d9d9d9] text-[#333]">{quantity}</span>
        <button
          type="button"
          className="h-8 w-8 text-[#999] disabled:cursor-not-allowed disabled:bg-[#f7f7f7] disabled:text-[#d5d5d5]"
          aria-label="Tăng số lượng"
          onClick={increase}
          disabled={quantity >= safeMaxStock}
        >
          +
        </button>
      </div>
      <span className="text-[#757575]">{safeMaxStock} sản phẩm có sẵn</span>
    </div>
  );
}
