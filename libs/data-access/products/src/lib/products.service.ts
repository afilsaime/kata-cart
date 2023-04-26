import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@kata-cart/models';
import { taxIncludedPrice } from '@kata-cart/utils/products';
import { BehaviorSubject, map, shareReplay, switchMap } from 'rxjs';

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
        } as Product;
      })
    ),
    shareReplay(1)
  );

  productsCategories$ = this.products$.pipe(
    map((products) =>
      Array.from(new Set(products.map(({ category }) => category)))
    )
  );

  private selectedCategoryAction = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategoryAction.asObservable();

  filteredProducts$ = this.selectedCategory$.pipe(
    switchMap((selectedCategory) => {
      return this.products$.pipe(
        map((products) => {
          return selectedCategory.length
            ? products.filter(({ category }) => category === selectedCategory)
            : products;
        })
      );
    })
  );

  constructor(private http: HttpClient) {}

  selectCategory(category: string) {
    this.selectedCategoryAction.next(category);
  }
}
