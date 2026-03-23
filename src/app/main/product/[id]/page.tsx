import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { categoryNameMap, products } from "@/data/catalog";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

const moneyFormatter = new Intl.NumberFormat("vi-VN");

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const categoryName = categoryNameMap.get(product.category_id) ?? "Danh mục không xác định";

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header variant="product" />
      <main className="mx-auto max-w-[1200px] px-4 py-4 sm:py-6">
        <div className="mb-3 text-sm text-[#666]">
          <Link href="/main/category" className="hover:text-[#ee4d2d] hover:underline">
            Danh mục
          </Link>
          <span className="mx-1">/</span>
          <Link href={`/main/product?category=${product.category_id}`} className="hover:text-[#ee4d2d] hover:underline">
            {categoryName}
          </Link>
          {product.subcategory ? (
            <>
              <span className="mx-1">/</span>
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

        <section className="grid gap-4 rounded-md bg-white p-4 shadow-shoppe sm:grid-cols-[1.2fr_1fr] sm:p-6">
          <div className="relative aspect-square overflow-hidden rounded-md bg-[#fafafa]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-xl font-semibold leading-8 text-[#222]">{product.name}</h1>
            <p className="mt-2 text-3xl font-bold text-[#ee4d2d]">{moneyFormatter.format(product.price)}đ</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded bg-[#fafafa] p-3">
                <p className="text-[#888]">Đánh giá</p>
                <p className="mt-1 font-semibold text-[#333]">{product.rating.toFixed(1)} / 5</p>
              </div>
              <div className="rounded bg-[#fafafa] p-3">
                <p className="text-[#888]">Đã bán</p>
                <p className="mt-1 font-semibold text-[#333]">{moneyFormatter.format(product.sold)}</p>
              </div>
              <div className="rounded bg-[#fafafa] p-3">
                <p className="text-[#888]">Danh mục</p>
                <p className="mt-1 font-semibold text-[#333]">{categoryName}</p>
              </div>
              <div className="rounded bg-[#fafafa] p-3">
                <p className="text-[#888]">Nhóm con</p>
                <p className="mt-1 font-semibold text-[#333]">{product.subcategory ?? "Đang cập nhật"}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-[#555]">
              Đây là trang chi tiết sản phẩm riêng. Từ trang category con bạn có thể đi xuống đúng sản phẩm này để xem thông tin đầy đủ.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={{
                  pathname: "/main/product",
                  query: { category: product.category_id, subcategory: product.subcategory },
                }}
                className="rounded border border-[#ee4d2d] px-4 py-2 text-sm font-medium text-[#ee4d2d] transition hover:bg-[#fff1ed]"
              >
                Quay về danh sách nhóm con
              </Link>
              <Link
                href="/main/category"
                className="rounded border border-[#ddd] px-4 py-2 text-sm font-medium text-[#555] transition hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
              >
                Quay về tất cả danh mục
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="full" />
    </div>
  );
}
