import { UiProductCardComponent } from '@kata-cart/ui/product-card';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@kata-cart/data-access/products';
import { UiDropdownSelectComponent } from '@kata-cart/ui/dropdown-select';

@Component({
  selector: 'kc-products-list',
  standalone: true,
  imports: [CommonModule, UiProductCardComponent, UiDropdownSelectComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  products$ = this.productsService.filteredProducts$;
  productsCategories$ = this.productsService.productsCategories$;
  selectedCategory$ = this.productsService.selectedCategory$;

  constructor(private productsService: ProductsService) {}

  onCategorySelected(category: string) {
    this.productsService.selectCategory(category);
  }
}
