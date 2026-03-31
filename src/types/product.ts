export interface FlashSale {
  /** Số giây đếm ngược cho đến khi kết thúc */
  endsInSeconds: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  sold: number;
  category_id: string;
  subcategory?: string;
  flashSale?: FlashSale;
}