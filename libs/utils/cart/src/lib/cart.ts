import { Action, CartItem, Product } from '@kata-cart/models';

export function modifyCart(
  cart: CartItem[],
  action: Action<CartItem>
): CartItem[] {
  switch (action.type) {
    case 'add':
      if (productAlreadyInCart(cart, action.item)) {
        return incrementProductQuantity(
          cart,
          action.item.product,
          action.item.quantity
        );
      } else {
        return [...cart, action.item];
      }
    case 'delete':
      return cart.filter(
        (cartItem) => cartItem.product.id !== action.item.product.id
      );
  }

  return [...cart];
}

function productAlreadyInCart(cart: CartItem[], searchItem: CartItem): boolean {
  return cart.some((cartItem) => cartItem.product.id === searchItem.product.id);
}

function incrementProductQuantity(
  cart: CartItem[],
  product: Product,
  quantity: number
): CartItem[] {
  return cart.map((cartItem) => {
    if (cartItem.product.id === product.id) {
      cartItem.quantity += quantity;
    }

    return cartItem;
  });
}
