import { CartService } from '@kata-cart/data-access/cart';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe],
  selector: 'kc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cartItemsCount$ = this.cartService.cartItemsCount$;

  constructor(private cartService: CartService) {}
}
