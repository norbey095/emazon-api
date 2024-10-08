import { Component,ViewEncapsulation } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-collapse',
  templateUrl: './category-collapse.component.html',
  styleUrls: ['./category-collapse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryCollapseComponent {
  isOpen = false;
  categories: { id: number; name: string ; description: string }[] = [];

  constructor(private categoryService: CategoryService) {}

  

  toggleCategories() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.loadCategories(1, 4, true);
    } else {
      this.categories = []; 
    }
  }

  loadCategories(page: number, size: number, descending: boolean): void {
    this.categoryService.getAllCategories(page, size, descending).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      },
    });
  }
}
