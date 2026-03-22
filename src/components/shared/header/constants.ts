import { HeaderVariant, HeaderVariantConfig } from "./types";

export const topLeftLinks = [
  "Kênh Người Bán",
  "Trở thành Người bán Shopee",
  "Tải ứng dụng",
];

export const topRightLinks = ["Thông báo", "Hỗ trợ", "Đăng ký", "Đăng nhập"];

const mainQuickLinks = [
  "Áo khoác",
  "Ví nam",
  "Tai nghe",
  "Balo",
  "Váy",
  "Quần jeans",
  "Ốp lưng",
  "Giày thể thao",
];

const categoryQuickLinks = [
  "Túi ví nam",
  "Balo laptop",
  "Ví da thật",
  "Phụ kiện nam",
  "Cặp công sở",
  "Túi đeo chéo",
];

export const headerVariantConfig: Record<HeaderVariant, HeaderVariantConfig> = {
  main: {
    showTopBar: true,
    showQuickLinks: true,
    quickLinks: mainQuickLinks,
    searchPlaceholder: "Shopee bao ship 0Đ - Đăng ký ngay!",
  },
  category: {
    showTopBar: true,
    showQuickLinks: true,
    quickLinks: categoryQuickLinks,
    searchPlaceholder: "Tìm trong danh mục: Balo & Ví Nam",
  },
  product: {
    showTopBar: false,
    showQuickLinks: false,
    quickLinks: [],
    searchPlaceholder: "Tìm sản phẩm tương tự",
  },
};
