import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '@kata-cart/models';

@Component({
  selector: 'kc-ui-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-cart-item.component.html',
  styleUrls: ['./ui-cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCartItemComponent {
  @Input() cartItem!: CartItem;
  @Output() deleteFromCart = new EventEmitter<void>();
}
