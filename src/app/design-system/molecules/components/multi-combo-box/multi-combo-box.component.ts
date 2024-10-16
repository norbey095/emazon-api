import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Category } from 'src/app/shared/types/category';
import { PaginationDto } from 'src/app/shared/types/paginationDto';

@Component({
  selector: 'app-multi-comboBox',
  templateUrl: './multi-combo-box.component.html',
  styleUrls: ['./multi-combo-box.component.scss']
})
export class MultiComboBoxComponent implements OnInit {
  categories: Category[] = [];
  selectedCategories: number[] = [];
  dropdownOpen: boolean = false;
  searchQuery: string = '';
  filteredCategories: Category[] = [];

  @Output() selectedCategoriesChange = new EventEmitter<number[]>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories(0, 10, false);  
  }

  getCategories(page: number, limit: number, descending: boolean) {
    this.categoryService.getAllCategories(page, limit, descending).subscribe({
      next: (response: PaginationDto<Category>) => {
        this.categories = response.contentList;
        this.filteredCategories = this.categories;
      },
      error: (error) => {
        console.error('Error al cargar las Categorías', error);
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleCategorySelection(categoryId: number) {
    if (this.isSelected(categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    } else {
      this.selectedCategories.push(categoryId);
    }
    this.selectedCategoriesChange.emit(this.selectedCategories);
  }

  isSelected(categoryId: number): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  getSelectedCategoryNames(): string {
    const selected = this.categories.filter(category => this.selectedCategories.includes(category.id));
    return selected.map(category => category.name).join(', ');
  }

  filterCategories() {
    if (!this.searchQuery.trim()) {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
