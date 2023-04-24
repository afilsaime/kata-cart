import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import { Product } from '@kata-cart/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  products = MOCK_PRODUCTS;

  getProducts(): Product[] {
    return this.products;
  }
}
