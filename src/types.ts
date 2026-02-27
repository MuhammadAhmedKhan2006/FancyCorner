export interface Category {
  _id?: string;
  name: string;
  slug: string;
  imageUrl: string;
  tag: string;
}

export interface Product {
  _id?: string;
  name: string;
  category: string; // slug of the category
  price: number;
  salePrice?: number;
  imageUrl: string;
  discountTag?: string | null;
  isNewItem?: boolean;
}

export type Screen = 'splash' | 'home' | 'products' | 'admin-login' | 'admin-dashboard';
