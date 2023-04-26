import { Injectable } from '@angular/core';
import { Action, CartItem, Product } from '@kata-cart/models';
import { modifyCart } from '@kata-cart/utils/cart';
import { Subject, map, scan, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartActions = new Subject<Action<CartItem>>();
  cartActions$ = this.cartActions.asObservable();

  cart$ = this.cartActions$.pipe(
    scan((cart, cartAction) => modifyCart(cart, cartAction), [] as CartItem[]),
    tap((cart) => console.log(cart)),
    shareReplay(1)
  );

  cartItemsCount$ = this.cart$.pipe(
    map((cart) =>
      cart.reduce((accQuantity, cartItem) => {
        return accQuantity + cartItem.quantity;
      }, 0)
    )
  );

  addToCart(product: Product) {
    this.cartActions.next({
      item: { product, quantity: 1 },
      type: 'add',
    });
  }

  deleteFromCart(cartItem: CartItem) {
    this.cartActions.next({
      item: cartItem,
      type: 'delete',
    });
  }
}
