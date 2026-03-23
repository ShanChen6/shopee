import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import MobileFilterToggle from "@/components/shared/product/MobileFilterToggle";
import PriceSortDropdown from "@/components/shared/product/PriceSortDropdown";
import { categories, categoryNameMap, normalizeText, products } from "@/data/catalog";
import Image from "next/image";
import Link from "next/link";

const moneyFormatter = new Intl.NumberFormat("vi-VN");
const promoProgramProductIds = new Set(["sp-3", "sp-11", "sp-18", "sp-22", "sp-34"]);
const likedProductIds = new Set(["sp-1", "sp-3", "sp-8", "sp-11", "sp-16", "sp-23", "sp-39"]);
const locationOptions = ["Hà Nội", "TP. Hồ Chí Minh", "Quận Hà Đông", "Quận Hoàng Mai"];
const shippingUnitOptions = ["SPX Express", "Giao Hàng Nhanh", "J&T Express", "Viettel Post"];
const brandOptions = ["Haras", "BEE GEE", "EZ BALO", "M.E.N"];

const sortOptions = [
  { id: "popular", label: "Phổ biến" },
  { id: "newest", label: "Mới nhất" },
  { id: "bestseller", label: "Bán chạy" },
] as const;

type SortOptionId = (typeof sortOptions)[number]["id"] | "priceAsc" | "priceDesc";

type ProductPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    subcategory?: string | string[];
    page?: string | string[];
    minPrice?: string | string[];
    maxPrice?: string | string[];
    minRating?: string | string[];
    onlyPromo?: string | string[];
    onlyLiked?: string | string[];
    sort?: string | string[];
    location?: string | string[];
    shippingUnit?: string | string[];
    brand?: string | string[];
  }>;
};

const toArray = (value?: string | string[]) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const productNumberFromId = (productId: string) => Number.parseInt(productId.replace(/[^0-9]/g, ""), 10) || 0;

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const selectedSubcategory = Array.isArray(params.subcategory)
    ? params.subcategory[0]
    : params.subcategory;
  const selectedPageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const selectedMinPriceParam = Array.isArray(params.minPrice) ? params.minPrice[0] : params.minPrice;
  const selectedMaxPriceParam = Array.isArray(params.maxPrice) ? params.maxPrice[0] : params.maxPrice;
  const selectedMinRatingParam = Array.isArray(params.minRating) ? params.minRating[0] : params.minRating;
  const selectedOnlyPromoParam = Array.isArray(params.onlyPromo) ? params.onlyPromo[0] : params.onlyPromo;
  const selectedOnlyLikedParam = Array.isArray(params.onlyLiked) ? params.onlyLiked[0] : params.onlyLiked;
  const selectedSortParam = Array.isArray(params.sort) ? params.sort[0] : params.sort;
  const selectedLocations = toArray(params.location).filter((item) => locationOptions.includes(item));
  const selectedShippingUnits = toArray(params.shippingUnit).filter((item) => shippingUnitOptions.includes(item));
  const selectedBrands = toArray(params.brand).filter((item) => brandOptions.includes(item));
  const parsedPage = Number.parseInt(selectedPageParam ?? "1", 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const pageSize = 10;
  const selectedMinPrice = Number.parseInt(selectedMinPriceParam ?? "", 10);
  const selectedMaxPrice = Number.parseInt(selectedMaxPriceParam ?? "", 10);
  const selectedMinRating = Number.parseFloat(selectedMinRatingParam ?? "");
  const onlyPromo = selectedOnlyPromoParam === "1";
  const onlyLiked = selectedOnlyLikedParam === "1";
  const selectedSort: SortOptionId =
    selectedSortParam === "newest" ||
    selectedSortParam === "bestseller" ||
    selectedSortParam === "priceAsc" ||
    selectedSortParam === "priceDesc"
      ? selectedSortParam
      : "popular";

  const selectedCategoryName = selectedCategory
    ? categoryNameMap.get(selectedCategory) ?? "Danh mục không xác định"
    : "Tất cả sản phẩm";

  const availableSubcategories = selectedCategory
    ? Array.from(
        new Set(
          products
            .filter((product) => product.category_id === selectedCategory && product.subcategory)
            .map((product) => product.subcategory as string),
        ),
      )
    : [];

  const filterQuery = {
    ...(Number.isFinite(selectedMinPrice) && selectedMinPrice > 0 ? { minPrice: String(selectedMinPrice) } : {}),
    ...(Number.isFinite(selectedMaxPrice) && selectedMaxPrice > 0 ? { maxPrice: String(selectedMaxPrice) } : {}),
    ...(Number.isFinite(selectedMinRating) && selectedMinRating > 0
      ? { minRating: String(selectedMinRating) }
      : {}),
    ...(onlyPromo ? { onlyPromo: "1" } : {}),
    ...(onlyLiked ? { onlyLiked: "1" } : {}),
    ...(selectedLocations.length > 0 ? { location: selectedLocations } : {}),
    ...(selectedShippingUnits.length > 0 ? { shippingUnit: selectedShippingUnits } : {}),
    ...(selectedBrands.length > 0 ? { brand: selectedBrands } : {}),
  };

  const sortingQuery = selectedSort !== "popular" ? { sort: selectedSort } : {};

  const filteredProducts = products.filter((product) => {
    const productNumber = productNumberFromId(product.id);
    const productLocation = locationOptions[productNumber % locationOptions.length];
    const productShippingUnit = shippingUnitOptions[(productNumber + 1) % shippingUnitOptions.length];
    const productBrand = brandOptions[(productNumber + 2) % brandOptions.length];

    if (selectedCategory && product.category_id !== selectedCategory) {
      return false;
    }

    if (selectedSubcategory) {
      if (!product.subcategory) {
        return false;
      }

      if (normalizeText(product.subcategory) !== normalizeText(selectedSubcategory)) {
        return false;
      }
    }

    if (Number.isFinite(selectedMinPrice) && selectedMinPrice > 0 && product.price < selectedMinPrice) {
      return false;
    }

    if (Number.isFinite(selectedMaxPrice) && selectedMaxPrice > 0 && product.price > selectedMaxPrice) {
      return false;
    }

    if (Number.isFinite(selectedMinRating) && selectedMinRating > 0 && product.rating < selectedMinRating) {
      return false;
    }

    if (onlyPromo && !promoProgramProductIds.has(product.id)) {
      return false;
    }

    if (onlyLiked && !likedProductIds.has(product.id)) {
      return false;
    }

    if (selectedLocations.length > 0 && !selectedLocations.includes(productLocation)) {
      return false;
    }

    if (selectedShippingUnits.length > 0 && !selectedShippingUnits.includes(productShippingUnit)) {
      return false;
    }

    if (selectedBrands.length > 0 && !selectedBrands.includes(productBrand)) {
      return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "newest": {
        const aId = Number.parseInt(a.id.replace(/[^0-9]/g, ""), 10) || 0;
        const bId = Number.parseInt(b.id.replace(/[^0-9]/g, ""), 10) || 0;
        return bId - aId;
      }
      case "bestseller":
        return b.sold - a.sold;
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "popular":
      default: {
        const scoreA = a.rating * 1000 + a.sold;
        const scoreB = b.rating * 1000 + b.sold;
        return scoreB - scoreA;
      }
    }
  });

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const visibleProducts = sortedProducts.slice(startIndex, startIndex + pageSize);
  const hasPrevPage = safeCurrentPage > 1;
  const hasNextPage = safeCurrentPage < totalPages;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header variant="product" />
      <main className="mx-auto max-w-[1200px] px-4 py-4 sm:py-6">
        <section className="rounded-md bg-white p-4 shadow-shoppe sm:p-5">
          <h1 className="text-xl font-semibold text-[#222] sm:text-2xl">{selectedCategoryName}</h1>
          {selectedSubcategory ? (
            <p className="mt-1 text-sm text-[#666]">
              Đang lọc theo nhóm con: <span className="font-medium text-[#ee4d2d]">{selectedSubcategory}</span>
            </p>
          ) : (
            <p className="mt-1 text-sm text-[#666]">Danh sách sản phẩm theo danh mục bạn vừa chọn.</p>
          )}
          <p className="mt-1 text-xs text-[#888]">
            Hiển thị {visibleProducts.length}/{filteredProducts.length} sản phẩm phù hợp. Trang {safeCurrentPage}/{totalPages}.
          </p>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1.5 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden">
            <Link
              href="/main/product"
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
                !selectedCategory
                  ? "border-[#ee4d2d] bg-[#fff1ed] text-[#ee4d2d]"
                  : "border-[#e5e5e5] text-[#666] hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
              }`}
            >
              Tất cả
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={{
                  pathname: "/main/product",
                  query: {
                    category: category.id,
                    ...filterQuery,
                    ...sortingQuery,
                  },
                }}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
                  selectedCategory === category.id
                    ? "border-[#ee4d2d] bg-[#fff1ed] text-[#ee4d2d]"
                    : "border-[#e5e5e5] text-[#666] hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-[240px_1fr] lg:items-start">
          <aside className="overflow-hidden rounded-md bg-white shadow-shoppe lg:sticky lg:top-24">
            <MobileFilterToggle>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#333]">Danh mục con</h2>

            {!selectedCategory ? (
              <p className="mt-3 text-sm text-[#666]">Chọn một danh mục để xem các nhóm con theo cột dọc.</p>
            ) : availableSubcategories.length === 0 ? (
              <p className="mt-3 text-sm text-[#666]">Danh mục này chưa có nhóm con.</p>
            ) : (
              <div className="mt-3 space-y-1.5">
                <Link
                  href={{
                    pathname: "/main/product",
                    query: {
                      category: selectedCategory,
                      ...filterQuery,
                      ...sortingQuery,
                    },
                  }}
                  className={`block rounded-sm px-2.5 py-2 text-sm transition ${
                    !selectedSubcategory
                      ? "bg-[#fff1ed] font-medium text-[#ee4d2d]"
                      : "text-[#444] hover:bg-[#fff7f4] hover:text-[#ee4d2d]"
                  }`}
                >
                  Tất cả trong {selectedCategoryName}
                </Link>

                {availableSubcategories.map((subcat) => {
                  const active =
                    !!selectedSubcategory && normalizeText(subcat) === normalizeText(selectedSubcategory);

                  return (
                    <Link
                      key={subcat}
                      href={{
                        pathname: "/main/product",
                        query: {
                          category: selectedCategory,
                          subcategory: subcat,
                          ...filterQuery,
                          ...sortingQuery,
                        },
                      }}
                      className={`block rounded-sm px-2.5 py-2 text-sm transition ${
                        active
                          ? "bg-[#fff1ed] font-medium text-[#ee4d2d]"
                          : "text-[#444] hover:bg-[#fff7f4] hover:text-[#ee4d2d]"
                      }`}
                    >
                      {subcat}
                    </Link>
                  );
                })}
              </div>
            )}

            <form action="/main/product" method="get" className="mt-4 space-y-3 border-t border-[#f0f0f0] pt-4">
              {selectedCategory ? <input type="hidden" name="category" value={selectedCategory} /> : null}
              {selectedSubcategory ? <input type="hidden" name="subcategory" value={selectedSubcategory} /> : null}
              {selectedSort !== "popular" ? <input type="hidden" name="sort" value={selectedSort} /> : null}

              <div className="border-b border-[#f0f0f0] pb-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#555]">
                  <span>⌕</span>
                  <span>Bộ lọc tìm kiếm</span>
                </h3>
              </div>

              <div>
                <h3 className="text-base font-medium text-[#333]">Nơi Bán</h3>
                <div className="mt-2 space-y-1.5">
                  {locationOptions.map((location) => (
                    <label key={location} className="flex items-center gap-2 text-sm text-[#444]">
                      <input
                        type="checkbox"
                        name="location"
                        value={location}
                        defaultChecked={selectedLocations.includes(location)}
                        className="accent-[#ee4d2d]"
                      />
                      {location}
                    </label>
                  ))}
                  <p className="pt-1 text-sm text-[#666]">Thêm</p>
                </div>
              </div>

              <div className="border-t border-[#f0f0f0] pt-3">
                <h3 className="text-base font-medium text-[#333]">Đơn Vị Vận Chuyển</h3>
                <div className="mt-2 space-y-1.5">
                  {shippingUnitOptions.map((shippingUnit) => (
                    <label key={shippingUnit} className="flex items-center gap-2 text-sm text-[#444]">
                      <input
                        type="checkbox"
                        name="shippingUnit"
                        value={shippingUnit}
                        defaultChecked={selectedShippingUnits.includes(shippingUnit)}
                        className="accent-[#ee4d2d]"
                      />
                      {shippingUnit}
                    </label>
                  ))}
                  <p className="pt-1 text-sm text-[#666]">Thêm</p>
                </div>
              </div>

              <div className="border-t border-[#f0f0f0] pt-3">
                <h3 className="text-base font-medium text-[#333]">Thương Hiệu</h3>
                <div className="mt-2 space-y-1.5">
                  {brandOptions.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-sm text-[#444]">
                      <input
                        type="checkbox"
                        name="brand"
                        value={brand}
                        defaultChecked={selectedBrands.includes(brand)}
                        className="accent-[#ee4d2d]"
                      />
                      {brand}
                    </label>
                  ))}
                  <p className="pt-1 text-sm text-[#666]">Thêm</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#555]">Khoảng giá</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min={0}
                    name="minPrice"
                    defaultValue={Number.isFinite(selectedMinPrice) && selectedMinPrice > 0 ? selectedMinPrice : ""}
                    placeholder="Từ"
                    className="h-9 rounded-sm border border-[#d9d9d9] px-2 text-sm outline-none focus:border-[#ee4d2d]"
                  />
                  <input
                    type="number"
                    min={0}
                    name="maxPrice"
                    defaultValue={Number.isFinite(selectedMaxPrice) && selectedMaxPrice > 0 ? selectedMaxPrice : ""}
                    placeholder="Đến"
                    className="h-9 rounded-sm border border-[#d9d9d9] px-2 text-sm outline-none focus:border-[#ee4d2d]"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#555]">Đánh giá</h3>
                <select
                  name="minRating"
                  defaultValue={Number.isFinite(selectedMinRating) && selectedMinRating > 0 ? String(selectedMinRating) : ""}
                  className="mt-2 h-9 w-full rounded-sm border border-[#d9d9d9] px-2 text-sm outline-none focus:border-[#ee4d2d]"
                >
                  <option value="">Tất cả</option>
                  <option value="4">Từ 4 sao</option>
                  <option value="4.5">Từ 4.5 sao</option>
                  <option value="4.8">Từ 4.8 sao</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-[#444]">
                  <input type="checkbox" name="onlyPromo" value="1" defaultChecked={onlyPromo} className="accent-[#ee4d2d]" />
                  Chỉ hiển thị sản phẩm có chương trình
                </label>
                <label className="flex items-center gap-2 text-sm text-[#444]">
                  <input type="checkbox" name="onlyLiked" value="1" defaultChecked={onlyLiked} className="accent-[#ee4d2d]" />
                  Chỉ hiển thị sản phẩm yêu thích
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="h-9 rounded-sm bg-[#ee4d2d] text-sm font-medium text-white transition hover:bg-[#d94426]"
                >
                  Áp dụng
                </button>
                <Link
                  href={{
                    pathname: "/main/product",
                    query: {
                      ...(selectedCategory ? { category: selectedCategory } : {}),
                      ...(selectedSubcategory ? { subcategory: selectedSubcategory } : {}),
                      ...sortingQuery,
                    },
                  }}
                  className="grid h-9 place-items-center rounded-sm border border-[#d9d9d9] text-sm text-[#555] transition hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
                >
                  Xóa lọc
                </Link>
              </div>
            </form>
            </MobileFilterToggle>
          </aside>

          <div>
          {filteredProducts.length === 0 ? (
            <div className="rounded-md bg-white p-10 text-center shadow-shoppe">
              <p className="text-base font-medium text-[#333]">
                Không có sản phẩm phù hợp với bộ lọc hiện tại.
              </p>
              <Link
                href="/main/category"
                className="mt-3 inline-block text-sm font-medium text-[#ee4d2d] hover:underline"
              >
                Quay lại trang danh mục
              </Link>
            </div>
          ) : (
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2 rounded-md bg-[#ededed] px-3 py-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="hidden text-sm text-[#555] sm:inline">Sắp xếp theo</span>
                  {sortOptions.map((option) => {
                    const active = selectedSort === option.id;

                    return (
                      <Link
                        key={option.id}
                        href={{
                          pathname: "/main/product",
                          query: {
                            ...(selectedCategory ? { category: selectedCategory } : {}),
                            ...(selectedSubcategory ? { subcategory: selectedSubcategory } : {}),
                            ...filterQuery,
                            ...(option.id !== "popular" ? { sort: option.id } : {}),
                          },
                        }}
                        className={`rounded-sm px-3 py-1.5 text-sm transition ${
                          active
                            ? "bg-[#ee4d2d] text-white"
                            : "bg-white text-[#555] hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
                        }`}
                      >
                        {option.label}
                      </Link>
                    );
                  })}

                  <PriceSortDropdown selectedSort={selectedSort} />
                </div>

                <div className="flex items-center gap-2 sm:ml-auto">
                  <span className="text-sm text-[#555]">
                    <span className="font-medium text-[#ee4d2d]">{safeCurrentPage}</span>/{totalPages}
                  </span>

                  {hasPrevPage ? (
                    <Link
                      href={{
                        pathname: "/main/product",
                        query: {
                          ...(selectedCategory ? { category: selectedCategory } : {}),
                          ...(selectedSubcategory ? { subcategory: selectedSubcategory } : {}),
                          ...filterQuery,
                          ...sortingQuery,
                          page: String(safeCurrentPage - 1),
                        },
                      }}
                      aria-label="Trang trước"
                      className="grid h-8 w-8 place-items-center rounded-sm bg-white text-[#555] transition hover:text-[#ee4d2d]"
                    >
                      <span>{"<"}</span>
                    </Link>
                  ) : (
                    <span className="grid h-8 w-8 place-items-center rounded-sm bg-white text-[#bbb]">{"<"}</span>
                  )}

                  {hasNextPage ? (
                    <Link
                      href={{
                        pathname: "/main/product",
                        query: {
                          ...(selectedCategory ? { category: selectedCategory } : {}),
                          ...(selectedSubcategory ? { subcategory: selectedSubcategory } : {}),
                          ...filterQuery,
                          ...sortingQuery,
                          page: String(safeCurrentPage + 1),
                        },
                      }}
                      aria-label="Trang sau"
                      className="grid h-8 w-8 place-items-center rounded-sm bg-white text-[#555] transition hover:text-[#ee4d2d]"
                    >
                      <span>{">"}</span>
                    </Link>
                  ) : (
                    <span className="grid h-8 w-8 place-items-center rounded-sm bg-white text-[#bbb]">{">"}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {visibleProducts.map((product) => (
                  <article key={product.id} className="overflow-hidden rounded-md bg-white shadow-shoppe">
                    <div className="relative aspect-square bg-[#fafafa]">
                      <Link href={`/main/product/${product.id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className="object-cover"
                        />
                      </Link>

                      {promoProgramProductIds.has(product.id) ? (
                        <div className="absolute left-2 top-2 rounded-sm bg-white/95 p-1 shadow">
                          <div className="relative h-5 w-9 overflow-hidden">
                            <Image
                              src="/assets/product/anh11.png"
                              alt="Nhãn chương trình"
                              fill
                              sizes="36px"
                              className="object-contain"
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="space-y-1.5 p-2.5">
                      <Link href={`/main/product/${product.id}`}>
                        <h2 className="line-clamp-2 text-[13px] leading-5 text-[#222] hover:text-[#ee4d2d]">
                          {likedProductIds.has(product.id) ? (
                            <span
                              className="mr-1 inline-block rounded-sm bg-[#ee4d2d] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white align-middle"
                              aria-label="Sản phẩm yêu thích"
                            >
                              Yêu thích
                            </span>
                          ) : null}
                          <span className="align-middle">{product.name}</span>
                        </h2>
                      </Link>
                      <p className="text-base font-semibold text-[#ee4d2d]">{moneyFormatter.format(product.price)}đ</p>
                      <div className="flex items-center justify-between text-[11px] text-[#666]">
                        <span>{product.rating.toFixed(1)}/5</span>
                        <span>Đã bán {moneyFormatter.format(product.sold)}</span>
                      </div>
                      {product.subcategory ? (
                        <p className="line-clamp-1 text-[11px] text-[#888]">Nhóm: {product.subcategory}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
          </div>
        </section>
      </main>
      <Footer variant="full" />
    </div>
  );
}
