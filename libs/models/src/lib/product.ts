export interface Product {
  id: number;
  productName: string;
  price: number;
  taxIncludedPrice?: number;
  quantity: number;
  isImported: boolean;
  category: string;
}

export const FIRST_NECESSITIES = ['Food', 'Medecine'];
export const BOOK_CATEGORY = 'Books';
