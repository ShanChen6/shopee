import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

const categoryCards = [
	"Túi Ví Nam",
	"Balo Laptop",
	"Ví Cầm Tay",
	"Túi Đeo Chéo",
	"Dây Lưng Nam",
	"Phụ Kiện Công Sở",
];

export default function CategoryPage() {
	return (
		<div className="min-h-screen bg-[#f5f5f5]">
			<Header variant="category" />
			<main className="mx-auto max-w-[1200px] px-4 py-6">
				<section className="rounded-md bg-white p-5 shadow-shoppe sm:p-6">
					<h1 className="text-xl font-semibold text-[#222] sm:text-2xl">Danh mục Balo & Ví Nam</h1>
					<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
						{categoryCards.map((item) => (
							<article
								key={item}
								className="rounded-md border border-black/10 bg-white p-4 text-center text-sm font-medium text-[#333]"
							>
								{item}
							</article>
						))}
					</div>
				</section>
			</main>
			<Footer variant="full" />
		</div>
	);
}
