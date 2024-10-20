import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Brand } from 'src/app/shared/types/brand';
import { Category } from 'src/app/shared/types/category';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() id: number = 0;  
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() categories: Category[] = [];
  @Input() brand: Brand = {id: 0, name:"",description: ""};
  @Output() openModal = new EventEmitter<any>();

  quantity: number = 1;

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

  handleCardClick(): void {
    this.openModal.emit({
      title: this.title,
      price: this.price,
      description: this.description,
      categories: this.categories,
      brand: this.brand
    });
  }

  formatPrice(price: number): string {
    return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
}
}
