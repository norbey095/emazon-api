import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() id: number = 1;  
  quantity: number = 1;
  @Input() title: string = 'Bolso negro';
  @Input() price: number = 20000;

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    alert(`Agregaste ${this.quantity} al carrito`);
  }
}
