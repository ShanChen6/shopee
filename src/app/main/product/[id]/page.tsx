import Footer from "../../../../components/shared/Footer";
import Header from "../../../../components/shared/Header";
import ProductImageZoomGallery from "../../../../components/shared/product/ProductImageZoomGallery";
import QuantitySelector from "../../../../components/shared/product/QuantitySelector";
import { categoryNameMap, products } from "../../../../data/catalog";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

const moneyFormatter = new Intl.NumberFormat("vi-VN");

const shippingFormatter = new Intl.NumberFormat("vi-VN", {
  notation: "compact",
  compactDisplay: "short",
});

const starFromRating = (rating: number) => {
  if (rating >= 4.8) return 5;
  if (rating >= 4.5) return 4;
  return 3;
};

const buildSpecRows = (categoryName: string, subcategory: string | undefined) => [
  { label: "Danh mục", value: categoryName },
  { label: "Nhóm ngành", value: subcategory ?? "Đang cập nhật" },
  { label: "Kho hàng", value: "56" },
  { label: "Gửi từ", value: "Hà Nội" },
  { label: "Bảo hành", value: "3 tháng" },
  { label: "Đơn vị", value: "Cái" },
];

const buildReviewRows = (productName: string) => [
  {
    user: "nguyenvana",
    score: 5,
    time: "2026-03-21 12:33",
    content: `Chất lượng tốt, đóng gói kỹ. ${productName} đúng mô tả và giao nhanh.`,
  },
  {
    user: "phamthib",
    score: 4,
    time: "2026-03-18 09:08",
    content: "Sản phẩm ổn trong tầm giá, sẽ ủng hộ thêm nếu có mã giảm giá.",
  },
  {
    user: "lequangc",
    score: 5,
    time: "2026-03-16 18:45",
    content: "Mua lần 2, shop tư vấn nhanh và hàng giống ảnh.",
  },
];

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const categoryName = categoryNameMap.get(product.category_id) ?? "Danh mục không xác định";
  const oldPrice = Math.round(product.price * 1.25);
  const discountPercent = Math.max(5, Math.min(45, Math.round(((oldPrice - product.price) / oldPrice) * 100)));
  const ratingCount = Math.max(12, Math.round(product.sold * 0.16));
  const availableStock = Math.max(10, (product.sold % 120) + 10);
  const specs = buildSpecRows(categoryName, product.subcategory);
  const reviews = buildReviewRows(product.name);

  const galleryItems = [
    product,
    ...products
      .filter((item) => item.id !== product.id && item.category_id === product.category_id)
      .slice(0, 4),
  ].slice(0, 5);

  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.category_id === product.category_id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header variant="product" />
      <main className="mx-auto max-w-[1200px] px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-3 flex flex-wrap items-center gap-1 text-sm text-[#666]">
          <Link href="/main" className="hover:text-[#ee4d2d] hover:underline">
            Shopee
          </Link>
          <span>/</span>
          <Link href="/main/category" className="hover:text-[#ee4d2d] hover:underline">
            Danh mục
          </Link>
          <span>/</span>
          <Link href={`/main/product?category=${product.category_id}`} className="hover:text-[#ee4d2d] hover:underline">
            {categoryName}
          </Link>
          {product.subcategory ? (
            <>
              <span>/</span>
              <Link
                href={{
                  pathname: "/main/product",
                  query: { category: product.category_id, subcategory: product.subcategory },
                }}
                className="hover:text-[#ee4d2d] hover:underline"
              >
                {product.subcategory}
              </Link>
            </>
          ) : null}
        </div>

        <section className="rounded-md bg-white p-4 shadow-shoppe sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[420px_1fr]">
            <div>
              <ProductImageZoomGallery items={galleryItems} />

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#555]">
                <span>Chia sẻ:</span>
                <div className="flex items-center gap-2 text-[#ee4d2d]">
                  <span className="rounded-full border border-[#f2c0b5] px-2 py-0.5">f</span>
                  <span className="rounded-full border border-[#f2c0b5] px-2 py-0.5">in</span>
                  <span className="rounded-full border border-[#f2c0b5] px-2 py-0.5">p</span>
                </div>
                <span className="text-[#ddd]">|</span>
                <span className="text-[#ee4d2d]">Đã thích (1,3k)</span>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-medium leading-8 text-[#222] sm:text-2xl">{product.name}</h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="border-b border-[#ee4d2d] font-semibold text-[#ee4d2d]">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[#ffce3d]">{"★".repeat(starFromRating(product.rating))}</span>
                </div>
                <div className="h-4 w-px bg-[#e3e3e3]" />
                <p>
                  <span className="font-semibold text-[#222]">{moneyFormatter.format(ratingCount)}</span>
                  <span className="ml-1 text-[#767676]">Đánh giá</span>
                </p>
                <div className="h-4 w-px bg-[#e3e3e3]" />
                <p>
                  <span className="font-semibold text-[#222]">{shippingFormatter.format(product.sold)}</span>
                  <span className="ml-1 text-[#767676]">Đã bán</span>
                </p>
              </div>

              <div className="mt-4 rounded-sm bg-[#fafafa] px-4 py-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-[#ee4d2d] px-2 py-0.5 text-xs font-semibold text-white">FLASH SALE</span>
                  <span className="text-xs text-[#ee4d2d]">KẾT THÚC TRONG 02:14:09</span>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-xl text-[#929292] line-through">₫{moneyFormatter.format(oldPrice)}</span>
                  <span className="text-3xl font-semibold text-[#ee4d2d]">₫{moneyFormatter.format(product.price)}</span>
                  <span className="rounded-sm bg-[#ffe8db] px-2 py-1 text-sm font-semibold text-[#ee4d2d]">
                    -{discountPercent}%
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                  <p className="text-[#757575]">Mã giảm giá</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded border border-[#f7c5ba] bg-[#fff6f4] px-2 py-1 text-xs text-[#ee4d2d]">
                      Giảm 10k
                    </span>
                    <span className="rounded border border-[#f7c5ba] bg-[#fff6f4] px-2 py-1 text-xs text-[#ee4d2d]">
                      Freeship Xtra
                    </span>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                  <p className="text-[#757575]">Vận chuyển</p>
                  <p className="text-[#333]">Nhận từ 2-4 ngày, miễn phí vận chuyển cho đơn từ 99.000đ</p>
                </div>

                <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
                  <p className="text-[#757575]">Số lượng</p>
                  <QuantitySelector maxStock={availableStock} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-sm border border-[#ee4d2d] bg-[#ffeee8] px-5 py-3 text-sm font-medium text-[#ee4d2d] transition hover:bg-[#ffe3d9]"
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  type="button"
                  className="rounded-sm bg-[#ee4d2d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#d84426]"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-md bg-white p-4 shadow-shoppe sm:p-5">
          <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffd7cc] text-lg font-semibold text-[#ee4d2d]">
                SH
              </div>
              <div>
                <p className="font-medium text-[#333]">Shopee Mall Official</p>
                <p className="text-sm text-[#888]">Online 15 phút trước</p>
              </div>
            </div>

            <div className="grid gap-2 text-sm text-[#666] sm:grid-cols-3">
              <p>
                Tỉ lệ phản hồi:
                <span className="ml-1 font-semibold text-[#ee4d2d]">98%</span>
              </p>
              <p>
                Tham gia:
                <span className="ml-1 font-semibold text-[#ee4d2d]">5 năm trước</span>
              </p>
              <p>
                Sản phẩm:
                <span className="ml-1 font-semibold text-[#ee4d2d]">{moneyFormatter.format(240)}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-md bg-white p-4 shadow-shoppe sm:p-5">
          <h2 className="rounded-sm bg-[#f5f5f5] px-3 py-2 text-base font-medium text-[#333]">CHI TIẾT SẢN PHẨM</h2>
          <div className="mt-4 grid gap-y-3 text-sm sm:grid-cols-[200px_1fr]">
            {specs.map((row) => (
              <Fragment key={row.label}>
                <p className="text-[#888]">{row.label}</p>
                <p className="text-[#444]">{row.value}</p>
              </Fragment>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-md bg-white p-4 shadow-shoppe sm:p-5">
          <h2 className="rounded-sm bg-[#f5f5f5] px-3 py-2 text-base font-medium text-[#333]">MÔ TẢ SẢN PHẨM</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-[#555]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
            <p>
              Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
              elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-md bg-white p-4 shadow-shoppe sm:p-5">
          <h2 className="rounded-sm bg-[#f5f5f5] px-3 py-2 text-base font-medium text-[#333]">ĐÁNH GIÁ SẢN PHẨM</h2>

          <div className="mt-4 rounded border border-[#f0e9de] bg-[#fffbf8] p-4">
            <p className="text-3xl font-semibold text-[#ee4d2d]">{product.rating.toFixed(1)} trên 5</p>
            <p className="mt-1 text-sm text-[#777]">{moneyFormatter.format(ratingCount)} đánh giá</p>
          </div>

          <div className="mt-4 space-y-4">
            {reviews.map((review) => (
              <article key={`${review.user}-${review.time}`} className="border-b border-[#f2f2f2] pb-4 last:border-b-0">
                <p className="font-medium text-[#333]">{review.user}</p>
                <p className="mt-1 text-[#ffce3d]">{"★".repeat(review.score)}</p>
                <p className="mt-1 text-xs text-[#999]">{review.time}</p>
                <p className="mt-2 text-sm leading-6 text-[#555]">{review.content}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-md bg-white p-4 shadow-shoppe sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-base font-medium text-[#333]">SẢN PHẨM CÙNG DANH MỤC</h2>
            <Link href={`/main/product?category=${product.category_id}`} className="text-sm text-[#ee4d2d] hover:underline">
              Xem tất cả
            </Link>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/main/product/${item.id}`}
                  className="group rounded border border-[#f2f2f2] p-2 transition hover:-translate-y-0.5 hover:border-[#f0b6a8]"
                >
                  <div className="relative aspect-square overflow-hidden rounded bg-[#fafafa]">
                    <Image src={item.image} alt={item.name} fill sizes="200px" className="object-cover" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-[#333] group-hover:text-[#ee4d2d]">{item.name}</p>
                  <p className="mt-1 text-sm font-semibold text-[#ee4d2d]">₫{moneyFormatter.format(item.price)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#888]">Hiện chưa có thêm sản phẩm cùng danh mục.</p>
          )}
        </section>
      </main>
      <Footer variant="full" />
    </div>
  );
}
