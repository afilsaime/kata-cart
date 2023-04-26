import { Injectable } from '@angular/core';
import { Action, CartItem, Product } from '@kata-cart/models';
import { modifyCart } from '@kata-cart/utils/cart';
import { Subject, combineLatest, map, scan, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartActions = new Subject<Action<CartItem>>();
  cartActions$ = this.cartActions.asObservable();

  cart$ = this.cartActions$.pipe(
    scan((cart, cartAction) => modifyCart(cart, cartAction), [] as CartItem[]),
    shareReplay(1)
  );

  cartItemsCount$ = this.cart$.pipe(
    map((cart) =>
      cart.reduce((accQuantity, cartItem) => {
        return accQuantity + cartItem.quantity;
      }, 0)
    )
  );

  taxExcludedTotal$ = this.cart$.pipe(
    map((cart) => {
      return cart.reduce((accTotal, { quantity, product }) => {
        return accTotal + quantity * product.price;
      }, 0);
    })
  );

  taxIncludedTotal$ = this.cart$.pipe(
    map((cart) => {
      return cart.reduce((accTotal, { quantity, product }) => {
        if (!product.taxIncludedPrice) return 0;
        return accTotal + quantity * product.taxIncludedPrice;
      }, 0);
    })
  );

  totalTaxes$ = combineLatest([
    this.taxIncludedTotal$,
    this.taxExcludedTotal$,
  ]).pipe(
    map(
      ([taxIncludedTotal, taxExcludedTotal]) =>
        taxIncludedTotal - taxExcludedTotal
    )
  );

  addToCart(product: Product, quantity: number) {
    this.cartActions.next({
      item: { product, quantity },
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
