import {
  MOCK_PRODUCTS_CATEGORIES,
  MOCK_PRODUCTS_WITH_TAXES,
} from '@kata-cart/mocks';
import {
  Spectator,
  SpyObject,
  createComponentFactory,
} from '@ngneat/spectator/jest';
import { ProductsListComponent } from './products-list.component';
import { ProductsService } from '@kata-cart/data-access/products';
import { of } from 'rxjs';
import { CartService } from '@kata-cart/data-access/cart';

describe('ProductsListComponent', () => {
  let spectator: Spectator<ProductsListComponent>;
  let mockProductsService: SpyObject<ProductsService>;

  const createComponent = createComponentFactory({
    component: ProductsListComponent,
    providers: [
      {
        provide: ProductsService,
        useValue: {
          filteredProducts$: of(MOCK_PRODUCTS_WITH_TAXES),
          productsCategories$: of(MOCK_PRODUCTS_CATEGORIES),
          selectedCategory$: of('Books'),
          selectCategory: jest.fn(),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    mockProductsService = spectator.inject(ProductsService);
    mockProductsService.selectCategory.mockClear();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should list the products', () => {
    console.log(spectator.element.innerHTML);
    const productCards = spectator.queryAll('[data-test=product-card]');
    expect(productCards.length).toEqual(18);
  });

  it('should set the selected category if an option is selected', () => {
    spectator.triggerEventHandler(
      'kc-ui-dropdown-select',
      'optionSelected',
      'category'
    );
    expect(mockProductsService.selectCategory).toHaveBeenCalledTimes(1);
    expect(mockProductsService.selectCategory).toHaveBeenCalledWith('category');
  });

  it('should reset the selected category if the clear filter button has been clicked', () => {
    spectator.click('[data-test=clear-filter-button]');
    expect(mockProductsService.selectCategory).toHaveBeenCalledTimes(1);
    expect(mockProductsService.selectCategory).toHaveBeenCalledWith('');
  });

  it('should add a product to the cart', () => {
    const cartService = spectator.inject(CartService);
    jest.spyOn(cartService, 'addToCart');

    spectator.triggerEventHandler('kc-ui-product-card', 'addToCart', 4);

    expect(cartService.addToCart).toHaveBeenCalledTimes(1);
    expect(cartService.addToCart).toHaveBeenCalledWith(
      MOCK_PRODUCTS_WITH_TAXES[1],
      4
    );
  });
});
