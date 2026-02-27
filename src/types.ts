export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  tag: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  price: number;
  old_price: number | null;
  image_url: string;
  discount_tag: string | null;
  is_new: boolean;
}

export type Screen = 'splash' | 'home' | 'products' | 'admin-login' | 'admin-dashboard';
