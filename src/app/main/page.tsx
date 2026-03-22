"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const dynamicBanners = [
  "/assets/banner/banner3.webp",
  "/assets/banner/banner4.webp",
  "/assets/banner/banner5.webp",
];

const staticBanners = [
  "/assets/banner/banner.webp",
  "/assets/banner/banner2.webp",
];

const categories = [
  { id: "cat-1", name: "Thời trang nam", image: "/assets/categories/1-thoi-trang-nam.webp" },
  { id: "cat-2", name: "Điện thoại & phụ kiện", image: "/assets/categories/2-dien-thoai-va-phu-kien.webp" },
  { id: "cat-3", name: "Thiết bị điện tử", image: "/assets/categories/3-thiet-bi-dien-tu.webp" },
  { id: "cat-4", name: "Máy tính & Laptop", image: "/assets/categories/4-may-tinh-va-laptop.webp" },
  { id: "cat-5", name: "Máy ảnh & Máy quay", image: "/assets/categories/5-mayanh-mayquayphim.webp" },
  { id: "cat-6", name: "Đồng hồ", image: "/assets/categories/6-dongho.webp" },
  { id: "cat-7", name: "Giày dép nam", image: "/assets/categories/7-giaydepnam.webp" },
  { id: "cat-8", name: "Thiết bị điện gia dụng", image: "/assets/categories/8-thietbidiengiadung.webp" },
  { id: "cat-9", name: "Thể thao & Du lịch", image: "/assets/categories/9-thethao-dulich.webp" },
  { id: "cat-10", name: "Ô Tô & Xe áy", image: "/assets/categories/10-oto-xemay.webp" },
  { id: "cat-11", name: "Balo & Ví Nam", image: "/assets/categories/11-balo-vi-nam.webp" },
  { id: "cat-12", name: "Đồ Chơi", image: "/assets/categories/12-dochoi.webp" },
  { id: "cat-13", name: "Chăm Sóc Thú Cưng", image: "/assets/categories/13-chamsoc-thucung.webp" },
  { id: "cat-14", name: "Tiện Ích", image: "/assets/categories/14-tienich.webp" },
  { id: "cat-15", name: "Thời Trang Nữ", image: "/assets/categories/15-thoi-trang-nu.webp" },
  { id: "cat-16", name: "Mẹ & Bé", image: "/assets/categories/16-me&be.webp" },
  { id: "cat-17", name: "Nhà Cửa & Đời Sống", image: "/assets/categories/17-nhacua-doisong.webp" },
  { id: "cat-18", name: "Sắc Đẹp", image: "/assets/categories/18-sacdep.webp" },
  { id: "cat-19", name: "Sức Khỏe", image: "/assets/categories/19-suckhoe.webp" },
  { id: "cat-20", name: "Giày Dép Nữ", image: "/assets/categories/20-giaydepnu.webp" },
  { id: "cat-21", name: "Túi Ví Nữ", image: "/assets/categories/21-tuivinu.webp" },
  { id: "cat-22", name: "Phụ Kiện & Trang Sức", image: "/assets/categories/22-phukien-trangsuc.webp" },
  { id: "cat-23", name: "Bách Hóa Online", image: "/assets/categories/23-bachhoaonline.png" },
  { id: "cat-24", name: "Nhà Sách Online", image: "/assets/categories/24-nhasachonline.png" },
  { id: "cat-25", name: "Thời Trang Trẻ Em", image: "/assets/categories/25-thoitrangtreem.png" },
  { id: "cat-26", name: "Giặt Giũ & Nhà Cửa", image: "/assets/categories/26-giatgiu&chamsocnhacua.png" },
  { id: "cat-27", name: "Voucher & ịch Vụ", image: "/assets/categories/27-voucher&dichvu.png" },
];

const featuredProducts: Product[] = [
  {
    id: "sp-1",
    name: "Balo laptop chong nuoc 15.6 inch, ngan chong soc",
    price: 259000,
    image: "",
    rating: 4.8,
    sold: 1230,
    category_id: "cat-3",
  },
  {
    id: "sp-2",
    name: "Vi da nam dang ngang, du ngan the va ngan keo khoa",
    price: 149000,
    image: "",
    rating: 4.7,
    sold: 870,
    category_id: "cat-3",
  },
  {
    id: "sp-3",
    name: "Ao polo nam vai ca sau co gian, mac di lam di choi",
    price: 189000,
    image: "",
    rating: 4.9,
    sold: 2150,
    category_id: "cat-1",
  },
  {
    id: "sp-4",
    name: "Giay sneaker trang de mem, phoi do the thao",
    price: 329000,
    image: "",
    rating: 4.6,
    sold: 640,
    category_id: "cat-2",
  },
  {
    id: "sp-5",
    name: "Noi chien khong dau 26cm, dung cho bep tu",
    price: 219000,
    image: "",
    rating: 4.8,
    sold: 920,
    category_id: "cat-5",
  },
  {
    id: "sp-6",
    name: "Tai nghe Bluetooth pin 30 gio, co khan tieng on",
    price: 399000,
    image: "",
    rating: 4.7,
    sold: 1510,
    category_id: "cat-6",
  },
  {
    id: "sp-7",
    name: "Dong ho the thao chong nuoc 5ATM day silicon",
    price: 279000,
    image: "",
    rating: 4.5,
    sold: 530,
    category_id: "cat-7",
  },
  {
    id: "sp-8",
    name: "Bo son moi li lau troi, 6 mau hot trend",
    price: 199000,
    image: "",
    rating: 4.8,
    sold: 760,
    category_id: "cat-8",
  },
  {
    id: "sp-9",
    name: "Binh giu nhiet inox 1L, nap kin chong ro ri",
    price: 169000,
    image: "",
    rating: 4.9,
    sold: 1880,
    category_id: "cat-5",
  },
  {
    id: "sp-10",
    name: "Tham tap yoga TPE 8mm, bam san chong truot",
    price: 245000,
    image: "",
    rating: 4.7,
    sold: 450,
    category_id: "cat-9",
  },
];

const moneyFormatter = new Intl.NumberFormat("vi-VN");

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const categoryScrollerRef = useRef<HTMLDivElement>(null);
  const [showCategoryArrows, setShowCategoryArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const topRowCategories = categories.slice(0, 14);
  const bottomRowCategories = categories.slice(14);

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + dynamicBanners.length) % dynamicBanners.length);
  };

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % dynamicBanners.length);
  };

  const updateCategoryScrollState = () => {
    const container = categoryScrollerRef.current;
    if (!container) return;

    const hasOverflow = container.scrollWidth > container.clientWidth + 1;
    setShowCategoryArrows(hasOverflow);
    setCanScrollLeft(container.scrollLeft > 4);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 4);
  };

  const scrollCategories = (direction: "left" | "right") => {
    const container = categoryScrollerRef.current;
    if (!container) return;

    const scrollAmount = Math.max(container.clientWidth - 72, 240);

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % dynamicBanners.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    updateCategoryScrollState();

    const container = categoryScrollerRef.current;
    if (!container) return;

    const onScroll = () => updateCategoryScrollState();
    const onResize = () => updateCategoryScrollState();

    container.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header variant="main" />
      <main className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-3">
        <section className="grid gap-1.5 lg:grid-cols-[2fr_1fr]">
          <article className="overflow-hidden rounded-2xl bg-white shadow-shoppe">
            <Link href="/main/product" className="block">
              <div className="relative h-[165px] w-full overflow-hidden bg-white sm:h-[200px] lg:h-[220px]">
                <div
                  className="flex h-full w-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                  {dynamicBanners.map((banner, index) => (
                    <div key={banner} className="relative h-full min-w-full">
                      <Image
                        src={banner}
                        alt={`Banner dong ${index + 1}`}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Banner truoc"
                  onClick={(event) => {
                    event.preventDefault();
                    handlePrevBanner();
                  }}
                  className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg text-white transition hover:bg-black/60"
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  aria-label="Banner sau"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNextBanner();
                  }}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg text-white transition hover:bg-black/60"
                >
                  {">"}
                </button>

                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/30 px-2 py-1">
                  {dynamicBanners.map((banner, index) => (
                    <button
                      key={banner}
                      type="button"
                      aria-label={`Chuyen sang banner ${index + 1}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentBanner(index);
                      }}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        currentBanner === index ? "bg-white" : "bg-white/55 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </article>

          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {staticBanners.map((banner, index) => (
              <Link
                key={banner}
                href="/main/category"
                className="block overflow-hidden rounded-2xl bg-white shadow-shoppe"
              >
                <div className="relative h-[76px] bg-white sm:h-[95px] lg:h-[104px]">
                  <Image
                    src={banner}
                    alt={`Banner tinh ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 380px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white p-4 shadow-shoppe sm:p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#222] sm:text-lg">DANH MỤC</h2>
            <div className="flex items-center gap-2">
              {showCategoryArrows && (
                <>
                  <button
                    type="button"
                    aria-label="Cuon danh muc sang trai"
                    onClick={() => scrollCategories("left")}
                    disabled={!canScrollLeft}
                    className="flex h-7 w-7 items-center justify-center bg-white text-sm text-[#555] shadow-shoppe transition enabled:hover:text-[#ee4d2d] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {"<"}
                  </button>
                  <button
                    type="button"
                    aria-label="Cuon danh muc sang phai"
                    onClick={() => scrollCategories("right")}
                    disabled={!canScrollRight}
                    className="flex h-7 w-7 items-center justify-center bg-white text-sm text-[#555] shadow-shoppe transition enabled:hover:text-[#ee4d2d] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {">"}
                  </button>
                </>
              )}
              <Link href="/main/category" className="text-xs font-medium text-[#ee4d2d] hover:underline sm:text-sm">
                Xem tất cả
              </Link>
            </div>
          </div>
          <div className="mt-2.5 overflow-hidden">
            <div
              ref={categoryScrollerRef}
              className="snap-x snap-mandatory overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="w-max space-y-2">
                <div className="flex gap-2">
                  {topRowCategories.map((category) => (
                    <Link
                      key={category.id}
                      href="/main/category"
                      className="group w-[124px] snap-start bg-white p-2 transition hover:-translate-y-0.5 hover:shadow-shoppe"
                    >
                      <div className="mx-auto w-fit bg-white p-1.5">
                        <div className="relative h-12 w-12 overflow-hidden">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <p className="mt-1.5 text-center text-xs font-medium leading-4 text-[#333] transition group-hover:text-[#ee4d2d]">
                        {category.name}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="flex gap-2">
                  {bottomRowCategories.map((category) => (
                    <Link
                      key={category.id}
                      href="/main/category"
                      className="group w-[124px] snap-start bg-white p-2 transition hover:-translate-y-0.5 hover:shadow-shoppe"
                    >
                      <div className="mx-auto w-fit bg-white p-1.5">
                        <div className="relative h-12 w-12 overflow-hidden">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <p className="mt-1.5 text-center text-xs font-medium leading-4 text-[#333] transition group-hover:text-[#ee4d2d]">
                        {category.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-4 shadow-shoppe sm:p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#222] sm:text-lg">Danh sach san pham</h2>
            <Link href="/main/product" className="text-xs font-medium text-[#ee4d2d] hover:underline sm:text-sm">
              Xem chi tiet
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href="/main/product"
                className="group overflow-hidden rounded-xl bg-white transition hover:-translate-y-0.5 hover:shadow-shoppe"
              >
                <div className="relative aspect-square bg-gradient-to-br from-[#fff2ee] to-[#ffd9ce] p-3">
                  <span className="absolute left-2 top-2 rounded bg-[#ee4d2d] px-2 py-0.5 text-[11px] font-semibold text-white">
                    Giam 20%
                  </span>
                  <div className="flex h-full items-end justify-end">
                    <span className="rounded bg-white/80 px-2 py-0.5 text-[11px] font-medium text-[#ee4d2d]">
                      Mall
                    </span>
                  </div>
                </div>
                <div className="space-y-1 p-2.5">
                  <h3 className="line-clamp-2 min-h-9 text-[13px] text-[#222] transition group-hover:text-[#ee4d2d]">
                    {product.name}
                  </h3>
                  <p className="text-base font-bold leading-none text-[#ee4d2d]">
                    {moneyFormatter.format(product.price)}d
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>{product.rating.toFixed(1)}/5</span>
                    <span>Da ban {moneyFormatter.format(product.sold)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer variant="full" />
    </div>
  );
}
