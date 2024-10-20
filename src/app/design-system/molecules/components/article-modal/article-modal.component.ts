import { Component, Input } from '@angular/core';
import { ArticleList } from 'src/app/shared/types/article';
import { Brand } from 'src/app/shared/types/brand';
import { Category } from 'src/app/shared/types/category';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent {
  id: number = 0;  
  title: string = '';
  price: number = 0;
  description: string = '';
  categories: Category[] = [];
  brand: Brand = {id: 0, name:"",description: ""};
  isVisible: boolean = false;

  openModal(article : ArticleList): void {
    this.title = article.name;
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
}
