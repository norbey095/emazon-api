import { Component } from '@angular/core';
import { Category } from 'src/app/shared/types/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { PaginationDto } from 'src/app/shared/types/paginationDto';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
    title: string = "Lista de Categorías";
    categories: any[] = [];
    totalItems: number = 0;
    itemsPerPage: number = 8;
    page: number = 1;
    descending = false;

    constructor(private categoryService: CategoryService) {}

    ngOnInit() {
        this.fetchCategories();
    }

    fetchCategories() {
        this.categoryService.getAllCategories(this.page - 1, this.itemsPerPage, this.descending).subscribe({
            next: (response: PaginationDto<Category>) => {
                this.categories = response.contentList;
                this.totalItems = response.totalElement;
            },
            error: (error) => {
                console.error('Error al cargar las categorías', error);
            }
        });
    }


    onControlsChange(event: { itemsPerPage: number; descending: boolean; page: number }) {
        this.itemsPerPage = event.itemsPerPage;
        this.descending = event.descending;
        this.page = event.page;
        this.fetchCategories();
    }
}