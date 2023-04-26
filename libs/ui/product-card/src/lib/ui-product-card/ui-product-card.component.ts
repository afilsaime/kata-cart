import { UiDropdownSelectComponent } from '@kata-cart/ui/dropdown-select';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kc-ui-product-card',
  standalone: true,
  imports: [CommonModule, UiDropdownSelectComponent],
  templateUrl: './ui-product-card.component.html',
  styleUrls: ['./ui-product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProductCardComponent {
  @Input() name!: string;
  @Input() category!: string;
  @Input() taxIncludedPrice!: number;
  @Input() set stock(value: number) {
    this.quantityOptions = Array.from({ length: value }, (_, i) => `${i + 1}`);
  }

  @Output() addToCart = new EventEmitter<number>();

  quantityOptions: string[] = [];
  selectedQuantity = '1';

  onQuantitySelected(quantity: string) {
    this.selectedQuantity = quantity;
  }

  onAddToCart() {
    this.addToCart.emit(Number(this.selectedQuantity));
  }
}
