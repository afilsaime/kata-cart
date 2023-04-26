import { UiProductCardComponent } from '@kata-cart/ui/product-card';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@kata-cart/data-access/products';
import { UiDropdownSelectComponent } from '@kata-cart/ui/dropdown-select';
import { Product } from '@kata-cart/models';
import { CartService } from '@kata-cart/data-access/cart';

@Component({
  selector: 'kc-products-list',
  standalone: true,
  imports: [CommonModule, UiProductCardComponent, UiDropdownSelectComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  products$ = this.productsService.filteredProducts$;
  productsCategories$ = this.productsService.productsCategories$;
  selectedCategory$ = this.productsService.selectedCategory$;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  onCategorySelected(category: string) {
    this.productsService.selectCategory(category);
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
