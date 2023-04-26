import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPageComponent } from './cart-page.component';
import {
  Spectator,
  SpyObject,
  createComponentFactory,
} from '@ngneat/spectator/jest';
import { CartService } from '@kata-cart/data-access/cart';
import { MOCK_PRODUCTS_WITH_TAXES } from '@kata-cart/mocks';
import { of } from 'rxjs';

describe('CartPageComponent', () => {
  let spectator: Spectator<CartPageComponent>;
  let mockCartService: SpyObject<CartService>;

  const createComponent = createComponentFactory({
    component: CartPageComponent,
    providers: [
      {
        provide: CartService,
        useValue: {
          cart$: of([
            {
              product: MOCK_PRODUCTS_WITH_TAXES[1],
              quantity: 1,
            },
          ]),
          cartItemsCount$: of(1),
          deleteFromCart: jest.fn(),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    mockCartService = spectator.inject(CartService);
    mockCartService.deleteFromCart.mockClear();
  });

  it('should delete a product from the cart', () => {
    spectator.triggerEventHandler('kc-ui-cart-item', 'deleteFromCart', {
      product: MOCK_PRODUCTS_WITH_TAXES[1],
      quantity: 1,
    });

    expect(mockCartService.deleteFromCart).toHaveBeenCalledTimes(1);
    expect(mockCartService.deleteFromCart).toHaveBeenCalledWith({
      product: MOCK_PRODUCTS_WITH_TAXES[1],
      quantity: 1,
    });
  });
});
