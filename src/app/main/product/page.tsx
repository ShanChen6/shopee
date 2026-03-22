import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header variant="product" />
      <main className="mx-auto max-w-[1200px] px-4 py-6">
        <section className="grid gap-4 rounded-md bg-white p-4 shadow-shoppe sm:grid-cols-[1fr_1.4fr] sm:p-6">
          <div className="aspect-square rounded-md bg-[#f8f8f8]" />
          <div>
            <h1 className="text-xl font-semibold text-[#222] sm:text-2xl">
              Ví nam playboy da PU chống nước
            </h1>
            <p className="mt-2 text-2xl font-bold text-[#ee4d2d]">149.000đ</p>
            <p className="mt-3 text-sm text-gray-600">
              Biến thể header product đã được tối ưu theo bố cục gọn, ưu tiên tìm
              kiếm và giỏ hàng trên thiết bị nhỏ.
            </p>
          </div>
        </section>
      </main>
      <Footer variant="full" />
    </div>
  );
}
