import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header variant="main" />
      <main className="mx-auto max-w-[1200px] px-4 py-6">
        <section className="rounded-md bg-white p-8 shadow-shoppe">
          <h1 className="text-2xl font-semibold text-[#222]">Trang chủ Shopee</h1>
          <p className="mt-2 text-sm text-gray-500">
            Header đã được khởi tạo. Bước tiếp theo có thể dựng banner, danh mục
            và danh sách sản phẩm.
          </p>
        </section>
      </main>
      <Footer variant="full" />
    </div>
  );
}
