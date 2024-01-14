export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  colorQuantity: any[];
  price: number;
  sold: number;
  images: any[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
}
