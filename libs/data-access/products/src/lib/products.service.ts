import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@kata-cart/models';
import { taxIncludedPrice } from '@kata-cart/utils/products';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private endpoint = '/server/api/products';

  products$ = this.http.get<Product[]>(this.endpoint).pipe(
    map((products) =>
      products.map((product) => {
        const { price, category, isImported } = product;
        return {
          ...product,
          taxIncludedPrice: taxIncludedPrice(price, category, isImported),
        };
      })
    ),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}
}
