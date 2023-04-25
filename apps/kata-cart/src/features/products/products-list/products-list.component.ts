import { UiProductCardComponent } from '@kata-cart/ui/product-card';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@kata-cart/data-access/products';

@Component({
  selector: 'kc-products-list',
  standalone: true,
  imports: [CommonModule, UiProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  products$ = this.productsService.products$;

  constructor(private productsService: ProductsService) {}
}
