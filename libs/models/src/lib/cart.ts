import { Product } from './product';

export interface Cart {
  cartItems: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
