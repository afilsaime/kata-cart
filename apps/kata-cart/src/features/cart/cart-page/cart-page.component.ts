import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@kata-cart/data-access/cart';
import { UiCartItemComponent } from '@kata-cart/ui/cart-item';
import { CartItem } from '@kata-cart/models';

@Component({
  selector: 'kc-cart-page',
  standalone: true,
  imports: [CommonModule, UiCartItemComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {
  cart$ = this.cartService.cart$;
  cartItemsCount$ = this.cartService.cartItemsCount$;
  totalTaxes$ = this.cartService.totalTaxes$;
  taxIncludedTotal$ = this.cartService.taxIncludedTotal$;

  constructor(private cartService: CartService) {}

  onDeleteFromCart(cartItem: CartItem) {
    this.cartService.deleteFromCart(cartItem);
  }
}
