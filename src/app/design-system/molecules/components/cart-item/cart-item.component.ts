import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() idArticle: number = 0;
  @Input() name: string = '';
  @Input() available: number = 0;
  @Input() quantity: number = 0;
  @Input() price: number = 0;
  @Input() message?: string;
  @Input() subPrice: number = 0;

  @Output() remove = new EventEmitter<number>();

  onRemove(): void {
    this.remove.emit(this.idArticle);
  }

  formatPrice(price: number): string {
    const formattedNumber = price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `$${formattedNumber}`;
  }
}
