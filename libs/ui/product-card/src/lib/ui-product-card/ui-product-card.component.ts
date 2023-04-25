import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kc-ui-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-product-card.component.html',
  styleUrls: ['./ui-product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProductCardComponent {
  @Input() name!: string;
  @Input() category!: string;
  @Input() taxIncludedPrice!: number;
}
