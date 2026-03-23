import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Image from "next/image";
import Link from "next/link";

const allCategories = [
	{
		id: "cat-23",
		name: "Bách Hóa Online",
		image: "/assets/categories/23-bachhoaonline.png",
		highlight: "Đồ khô, đồ uống, nhu yếu phẩm",
		subcategories: ["Đồ khô chua mặn", "Nước uống & trà", "Mì & cơm lạp xưởng", "Dầu ăn & nước mắm"],
	},
	{
		id: "cat-11",
		name: "Balo & Ví Nam",
		image: "/assets/categories/11-balo-vi-nam.webp",
		highlight: "Balo laptop, ví da, cặp công sở",
		subcategories: ["Balo Laptop", "Ví Da Nam", "Ví Cầm Tay", "Túi Đeo Chéo", "Cặp Công Sở"],
	},
	{
		id: "cat-13",
		name: "Chăm Sóc Thú Cưng",
		image: "/assets/categories/13-chamsoc-thucung.webp",
		highlight: "Thức ăn, phụ kiện cho thú cưng",
		subcategories: ["Thức ăn & nước", "Lồng & nhà", "Đồ chơi & dụng cụ", "Khẩu trang thú cưng"],
	},
	{
		id: "cat-2",
		name: "Điện Thoại & Phụ Kiện",
		image: "/assets/categories/2-dien-thoai-va-phu-kien.webp",
		highlight: "Ốp lưng, sạc nhanh, tai nghe",
		subcategories: ["Ốp Lưng & Bao", "Sạc & Cáp", "Tai Nghe", "Kính Cường Lực", "Giá Điện Thoại"],
	},
	{
		id: "cat-12",
		name: "Đồ Chơi",
		image: "/assets/categories/12-dochoi.webp",
		highlight: "Mô hình, đồ chơi giáo dục",
		subcategories: ["Mô Hình & Figure", "Lego & Xếp Hình", "Đồ Chơi Giáo Dục", "Xe & Mô Hình Xe"],
	},
	{
		id: "cat-6",
		name: "Đồng Hồ",
		image: "/assets/categories/6-dongho.webp",
		highlight: "Đồng hồ thời trang, smartwatch",
		subcategories: ["Đồng Hồ Nam", "Đồng Hồ Nữ", "Smartwatch", "Dây Đồng Hồ"],
	},
	{
		id: "cat-26",
		name: "Giặt Giũ & Chăm Sóc Nhà Cửa",
		image: "/assets/categories/26-giatgiu&chamsocnhacua.png",
		highlight: "Nước giặt, vệ sinh nhà bếp",
		subcategories: ["Nước Giặt & Xả", "Bột Giặt", "Chất Tẩy Rửa", "Chăm Sóc Nhà Bếp"],
	},
	{
		id: "cat-7",
		name: "Giày Dép Nam",
		image: "/assets/categories/7-giaydepnam.webp",
		highlight: "Sneaker, sandal, giày da",
		subcategories: ["Sneaker & Giày Thể Thao", "Giày Tây & Giày Da", "Sandal & Dép", "Giày Công Sở"],
	},
	{
		id: "cat-20",
		name: "Giày Dép Nữ",
		image: "/assets/categories/20-giaydepnu.webp",
		highlight: "Giày cao gót, sneaker nữ",
		subcategories: ["Giày Cao Gót", "Sneaker & Giày Thể Thao", "Sandal & Dép", "Giày Bệt & Loafer"],
	},
	{
		id: "cat-4",
		name: "Máy Tính & Laptop",
		image: "/assets/categories/4-may-tinh-va-laptop.webp",
		highlight: "Laptop văn phòng, phụ kiện PC",
		subcategories: ["Laptop", "Desktop & PC", "Phụ Kiện Máy Tính", "Màn Hình Máy Tính"],
	},
	{
		id: "cat-5",
		name: "Máy Ảnh & Máy Quay",
		image: "/assets/categories/5-mayanh-mayquayphim.webp",
		highlight: "Camera hành trình, tripod",
		subcategories: ["Máy Ảnh DSLR", "Máy Hành Trình", "Phụ Kiện Ảnh", "Tripod & Gimbal"],
	},
	{
		id: "cat-16",
		name: "Mẹ & Bé",
		image: "/assets/categories/16-me&be.webp",
		highlight: "Bỉm, sữa, đồ sơ sinh",
		subcategories: ["Bỉm & Tã", "Sữa & Thức Ăn", "Đồ Sơ Sinh", "Xe Đẩy & Nôi"],
	},
	{
		id: "cat-17",
		name: "Nhà Cửa & Đời Sống",
		image: "/assets/categories/17-nhacua-doisong.webp",
		highlight: "Đồ bếp, trang trí nội thất",
		subcategories: ["Dụng Cụ Nhà Bếp", "Bàn & Ghế", "Trang Trí & Gương", "Đèn & Các Đồ Khác"],
	},
	{
		id: "cat-24",
		name: "Nhà Sách Online",
		image: "/assets/categories/24-nhasachonline.png",
		highlight: "Sách, văn phòng phẩm, quà tặng",
		subcategories: ["Sách Học & Kiến Thức", "Sách Văn Học", "Sổ & Văn Phòng Phẩm", "Quà Tặng & Đồ Decor"],
	},
	{
		id: "cat-10",
		name: "Ô Tô & Xe Máy",
		image: "/assets/categories/10-oto-xemay.webp",
		highlight: "Phụ kiện xe, camera lùi",
		subcategories: ["Phụ Kiện Xe", "Camera Lùi & Gương", "Mũ Bảo Hiểm", "Nước & Dầu Bôi Trơn"],
	},
	{
		id: "cat-22",
		name: "Phụ Kiện & Trang Sức",
		image: "/assets/categories/22-phukien-trangsuc.webp",
		highlight: "Kẹp tóc, vòng tay, nhẫn",
		subcategories: ["Vòng Tay & Vòng Đeo", "Nhẫn & Hơn", "Kẹp Tóc & Cài Tóc", "Dây Chuyền & Túi Cài"],
	},
	{
		id: "cat-18",
		name: "Sắc Đẹp",
		image: "/assets/categories/18-sacdep.webp",
		highlight: "Skincare, makeup, chăm sóc tóc",
		subcategories: ["Skincare & Mặt Nạ", "Makeup & Son Môi", "Chăm Sóc Tóc", "Chăm Sóc Cơ Thể"],
	},
	{
		id: "cat-19",
		name: "Sức Khỏe",
		image: "/assets/categories/19-suckhoe.webp",
		highlight: "Vitamin, thiết bị theo dõi sức khỏe",
		subcategories: ["Vitamin & Đông Dược", "Thiết Bị Y Tế", "Kem & Dầu Xoa", "Nước Rửa Miệng & Kem Đánh Răng"],
	},
	{
		id: "cat-9",
		name: "Thể Thao & Du Lịch",
		image: "/assets/categories/9-thethao-dulich.webp",
		highlight: "Balo du lịch, đồ tập gym",
		subcategories: ["Balo Du Lịch", "Đồ Tập Gym", "Vợt & Dùng Cụ Thể Thao", "Thang & Dụng Cụ Yoga"],
	},
	{
		id: "cat-8",
		name: "Thiết Bị Điện Gia Dụng",
		image: "/assets/categories/8-thietbidiengiadung.webp",
		highlight: "Nồi chiên, máy hút bụi mini",
		subcategories: ["Nồi Chiên & Nấu", "Máy Hút Bụi", "Bàn Là & Máy Sấy", "Máy Xay & Xát Nước"],
	},
	{
		id: "cat-3",
		name: "Thiết Bị Điện Tử",
		image: "/assets/categories/3-thiet-bi-dien-tu.webp",
		highlight: "Loa Bluetooth, đồng hồ thông minh",
		subcategories: ["Loa Bluetooth", "Tai Nghe Không Dây", "Sạc Dự Phòng", "Đồng Hồ Thông Minh"],
	},
	{
		id: "cat-1",
		name: "Thời Trang Nam",
		image: "/assets/categories/1-thoi-trang-nam.webp",
		highlight: "Áo khoác, quần jeans, áo polo",
		subcategories: ["Áo Khoác & Áo Ngoài", "Áo Thun & Áo Polo", "Quần Jeans", "Quần Short & Quần Tây"],
	},
	{
		id: "cat-15",
		name: "Thời Trang Nữ",
		image: "/assets/categories/15-thoi-trang-nu.webp",
		highlight: "Váy, áo kiểu, set đồ nữ",
		subcategories: ["Áo Thun & Áo Kiểu", "Váy & Chân Váy", "Quần Jeans & Quần", "Áo Ngoài & Cardigan"],
	},
	{
		id: "cat-25",
		name: "Thời Trang Trẻ Em",
		image: "/assets/categories/25-thoitrangtreem.png",
		highlight: "Quần áo bé trai, bé gái",
		subcategories: ["Quần Áo Bé Trai", "Quần Áo Bé Gái", "Đồ Suite & Trang Phục", "Phụ Kiện Thời Trang"],
	},
	{
		id: "cat-14",
		name: "Tiện Ích",
		image: "/assets/categories/14-tienich.webp",
		highlight: "Đèn ngủ, đồ tiện ích gia đình",
		subcategories: ["Đèn Ngủ & Đèn Nền", "Quạt & Máy Sưởi", "Dây Quấn & Tổ Chức", "Các Đồ Tiện Ích Khác"],
	},
	{
		id: "cat-21",
		name: "Túi Ví Nữ",
		image: "/assets/categories/21-tuivinu.webp",
		highlight: "Túi xách, clutch, ví dài",
		subcategories: ["Túi Xách Tay", "Clutch & Ví Cầm", "Ví Dài & Ví Ngắn", "Túi Sling & Túi Đeo"],
	},
	{
		id: "cat-27",
		name: "Voucher & Dịch Vụ",
		image: "/assets/categories/27-voucher&dichvu.png",
		highlight: "Mã giảm giá, tiện ích số",
		subcategories: ["Voucher & Mã Giảm", "Thẻ Quà Tặng", "Dịch Vụ Kỹ Thuật Số", "Vé & Sự Kiện"],
	},
];

const categoryGroups = [
	{ title: "B", ids: ["cat-23", "cat-11"] },
	{ title: "C", ids: ["cat-13"] },
	{ title: "D", ids: ["cat-2", "cat-12", "cat-6"] },
	{ title: "G", ids: ["cat-26", "cat-7", "cat-20"] },
	{ title: "M", ids: ["cat-4", "cat-5", "cat-16"] },
	{ title: "N", ids: ["cat-17", "cat-24"] },
	{ title: "O", ids: ["cat-10"] },
	{ title: "P", ids: ["cat-22"] },
	{ title: "S", ids: ["cat-18", "cat-19"] },
	{ title: "T", ids: ["cat-9", "cat-8", "cat-3", "cat-1", "cat-15", "cat-25", "cat-14", "cat-21"] },
	{ title: "V", ids: ["cat-27"] },
];

const categoryMap = new Map(allCategories.map((category) => [category.id, category]));

export default function CategoryPage() {
	return (
		<div className="min-h-screen bg-[#f5f5f5]">
			<Header variant="category" />

			<main className="mx-auto max-w-[1200px] px-4 py-4 sm:py-6">
				<section className="rounded-md bg-white p-5 shadow-shoppe sm:p-6">
					<h1 className="text-xl font-semibold uppercase tracking-wide text-[#222] sm:text-2xl">
						Tất cả danh mục
					</h1>
					<p className="mt-2 text-sm text-[#666] sm:text-[15px]">
						Khám phá toàn bộ danh mục đang có trên Shopee. Chọn nhanh nhóm phù hợp để vào trang sản phẩm chi tiết.
					</p>

					<div className="mt-4 grid grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-6">
						{allCategories.map((category) => (
							<Link
								key={category.id}
								href="/main/product"
								className="group rounded-md p-3 transition hover:-translate-y-0.5 hover:shadow-shoppe"
							>
								<div className="mx-auto flex w-fit items-center justify-center rounded-full bg-[#fff6f3] p-2.5">
									<div className="relative h-12 w-12 overflow-hidden">
										<Image src={category.image} alt={category.name} fill sizes="48px" className="object-contain" />
									</div>
								</div>
								<h2 className="mt-2.5 line-clamp-2 min-h-10 text-center text-[13px] font-medium leading-5 text-[#333] transition group-hover:text-[#ee4d2d]">
									{category.name}
								</h2>
							</Link>
						))}
					</div>
				</section>

				<section className="mt-3 space-y-0">
					{categoryGroups.map((group) => (
						<article key={group.title} className="rounded-md bg-white p-4 shadow-shoppe sm:p-5">
<div className="mb-3 flex items-center justify-between gap-3 pb-2.5">
								<h2 className="text-base font-bold text-[#222] sm:text-lg">{group.title}</h2>
							</div>

							<div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
								{group.ids.map((categoryId) => {
									const category = categoryMap.get(categoryId);
									if (!category) return null;

									return (
										<div key={category.id} className="p-3">
											<Link
												href="/main/product"
												className="group block transition hover:text-[#ee4d2d]"
											>
												<h3 className="text-sm font-semibold text-[#333] transition group-hover:text-[#ee4d2d]">
													{category.name}
												</h3>
												<p className="mt-1 line-clamp-2 text-xs text-[#777]">{category.highlight}</p>
											</Link>

											{category.subcategories && category.subcategories.length > 0 && (
												<div className="mt-2 space-y-1 border-t border-[#f3f3f3] pt-2">
													{category.subcategories.map((subcat) => (
														<Link
															key={subcat}
															href="/main/product"
															className="block text-xs text-[#666] transition hover:text-[#ee4d2d]"
														>
															{subcat}
														</Link>
													))}
												</div>
											)}
										</div>
									);
								})}
							</div>
						</article>
					))}
				</section>
			</main>

			<Footer variant="full" />
		</div>
	);
}
