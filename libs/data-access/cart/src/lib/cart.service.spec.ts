import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';

import { CartService } from './cart.service';
import { MOCK_PRODUCTS_WITH_TAXES } from '@kata-cart/mocks';
import { take } from 'rxjs';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;

  const createService = createServiceFactory({
    service: CartService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('cart should be empty', () => {
    spectator.service.cart$.subscribe((cart) => {
      expect(cart).toEqual([]);
    });
  });

  it('should add items to the cart', (done) => {
    spectator.service.cart$.subscribe();

    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[1]);
    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[1]);
    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[2]);

    spectator.service.cart$.subscribe((cart) => {
      expect(cart).toEqual([
        { product: MOCK_PRODUCTS_WITH_TAXES[1], quantity: 2 },
        { product: MOCK_PRODUCTS_WITH_TAXES[2], quantity: 1 },
      ]);
      done();
    });
  });

  it('should remove items from the cart', (done) => {
    spectator.service.cart$.subscribe();

    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[1]);

    spectator.service.deleteFromCart({
      product: MOCK_PRODUCTS_WITH_TAXES[1],
      quantity: 1,
    });
    spectator.service.cart$.pipe(take(1)).subscribe((cart) => {
      expect(cart).toEqual([]);
      done();
    });
  });

  it('should have the right items count', (done) => {
    spectator.service.cartItemsCount$.subscribe();

    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[1]);
    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[1]);
    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[2]);

    spectator.service.cartItemsCount$.subscribe((count) => {
      expect(count).toEqual(3);
      done();
    });
  });

  it('should calculate the tax excluded total', (done) => {
    spectator.service.taxExcludedTotal$.subscribe();

    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[1]);
    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[2]);

    spectator.service.taxExcludedTotal$.subscribe((total) => {
      expect(total).toEqual(8.21);
      done();
    });
  });

  it('should calculate the tax included total', (done) => {
    spectator.service.taxIncludedTotal$.subscribe();

    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[1]);
    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[2]);

    spectator.service.taxIncludedTotal$.subscribe((total) => {
      expect(total).toEqual(8.66);
      done();
    });
  });

  it('should calculate the total tax amount', (done) => {
    spectator.service.totalTaxes$.subscribe();

    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[3]);
    spectator.service.addToCart(MOCK_PRODUCTS_WITH_TAXES[3]);

    spectator.service.totalTaxes$.subscribe((total) => {
      expect(total).toEqual(1);
      done();
    });
  });
});
