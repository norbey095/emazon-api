import { Component } from '@angular/core';
import { Category } from 'src/app/shared/types/category';
import { CategoryService } from 'src/app/shared/services/category.service';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
    title: string = "Lista de Categorías";
    categories: Category[] = [];
    p: number = 1; // Página inicial
    itemsPerPage: number = 5; // Elementos por página
    itemsPerPageOptions: number[] = [5, 10, 20]; // Opciones para mostrar

    constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories(this.p, this.itemsPerPage);
  }

  loadCategories(page: number, size: number): void {
    this.categoryService.getAllCategories(page - 1, size,false).subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al cargar las categorías', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.p = page;
    this.loadCategories(this.p, this.itemsPerPage);
  }

  onItemsPerPageChange(): void {
    this.loadCategories(this.p, this.itemsPerPage);
  }
}