"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortOptionId = "popular" | "newest" | "bestseller" | "priceAsc" | "priceDesc";

type PriceSortDropdownProps = {
  selectedSort: SortOptionId;
};

export default function PriceSortDropdown({ selectedSort }: PriceSortDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPriceSort = selectedSort === "priceAsc" || selectedSort === "priceDesc" ? selectedSort : "";

  const handleChange = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue) {
      params.set("sort", nextValue);
    } else {
      params.delete("sort");
    }

    // Sorting changes should start from page 1 for predictable UX.
    params.delete("page");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <select
      value={selectedPriceSort}
      onChange={(event) => handleChange(event.target.value)}
      className="h-8 rounded-sm border border-[#d9d9d9] bg-white px-2 text-sm text-[#555] outline-none focus:border-[#ee4d2d]"
      aria-label="Sắp xếp theo giá"
    >
      <option value="">Giá</option>
      <option value="priceAsc">Giá thấp đến cao</option>
      <option value="priceDesc">Giá cao đến thấp</option>
    </select>
  );
}
