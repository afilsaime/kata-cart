import { MOCK_PRODUCTS_WITH_TAXES } from '@kata-cart/mocks';
import { modifyCart } from './cart';
import { CartItem } from '@kata-cart/models';

describe('modifyCart', () => {
  describe('add action type', () => {
    it('should add the item to the card if the item is not already in the cart', () => {
      const cart: CartItem[] = [];
      const cartItem = { product: MOCK_PRODUCTS_WITH_TAXES[1], quantity: 1 };

      expect(modifyCart(cart, { item: cartItem, type: 'add' })).toEqual([
        cartItem,
      ]);
    });

    it('should increment the product quantity if the product is already in the cart', () => {
      const cartItem = { product: MOCK_PRODUCTS_WITH_TAXES[1], quantity: 1 };
      const cartItemToAdd = {
        product: MOCK_PRODUCTS_WITH_TAXES[1],
        quantity: 3,
      };
      const cart = [cartItem];

      expect(modifyCart(cart, { item: cartItemToAdd, type: 'add' })).toEqual([
        { product: MOCK_PRODUCTS_WITH_TAXES[1], quantity: 4 },
      ]);
    });
  });

  describe('delete action', () => {
    it('should delete the item from the cart', () => {
      const cartItem = { product: MOCK_PRODUCTS_WITH_TAXES[1], quantity: 1 };
      const cart = [cartItem];

      expect(modifyCart(cart, { item: cartItem, type: 'delete' })).toEqual([]);
    });
  });

  describe('unknown action', () => {
    it('should return the cart without modification', () => {
      const cartItem = { product: MOCK_PRODUCTS_WITH_TAXES[1], quantity: 1 };
      const cart = [cartItem];

      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modifyCart(cart, { item: cartItem, type: 'unknown' as any })
      ).toEqual([cartItem]);
    });
  });
});
