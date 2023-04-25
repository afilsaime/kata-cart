import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@kata-cart/models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private endpoint = '/server/api/products';

  products$ = this.http.get<Product[]>(this.endpoint);

  constructor(private http: HttpClient) {}
}
