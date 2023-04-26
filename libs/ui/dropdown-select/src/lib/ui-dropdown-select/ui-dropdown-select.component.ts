import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kc-ui-dropdown-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-dropdown-select.component.html',
  styleUrls: ['./ui-dropdown-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdownSelectComponent {
  @Input() options: string[] = [];
  @Input() selectedOption = '';
  @Output() optionSelected = new EventEmitter<string>();

  opened = false;

  @HostListener('document:mousedown', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.opened = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(this.selectedOption);
    this.opened = false;
  }

  togglePanel() {
    this.opened = !this.opened;
  }
}
