import { Component, Input } from '@angular/core';
import { ArticleList } from 'src/app/shared/types/stop/article';
import { Brand } from 'src/app/shared/types/stop/brand';
import { Category } from 'src/app/shared/types/stop/category';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent {
  id: number = 0;  
  name: string = '';
  price: number = 0;
  description: string = '';
  categories: Category[] = [];
  brand: Brand = {id: 0, name:"",description: ""};
  isVisible: boolean = false;

  openModal(article : ArticleList): void {
    this.name = article.name;
    this.price = article.price;
    this.description = article.description;
    this.categories = article.categories;
    this.brand = article.brand;
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  getCategoryNames(): string {
    return this.categories.map(category => category.name).join(', ');
  }

  formatPrice(price: number): string {
    const formattedNumber = price.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `$${formattedNumber}`;
  }
}
