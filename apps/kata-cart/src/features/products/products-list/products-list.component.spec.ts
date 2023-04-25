import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ProductsListComponent } from './products-list.component';
import { ProductsService } from '@kata-cart/data-access/products';
import { of } from 'rxjs';

describe('ProductsListComponent', () => {
  let spectator: Spectator<ProductsListComponent>;

  const createComponent = createComponentFactory({
    component: ProductsListComponent,
    providers: [
      { provide: ProductsService, useValue: { products$: of(MOCK_PRODUCTS) } },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should list the products', () => {
    const productCards = spectator.queryAll('[data-test=product-card]');
    expect(productCards.length).toEqual(18);
  });
});
