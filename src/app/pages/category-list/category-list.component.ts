import { Component } from '@angular/core';
import { Category } from 'src/app/shared/types/category';
import { CategoryService } from 'src/app/shared/services/category.service';
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
    itemsPerPage: number = 5;
    page: number = 1;
    orderBy = 'ASC';
    descending = false;

    itemsPerPageOptions = [5, 10, 15];
    orderByOptions = ["ASC", "DES"];

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
    

    onControlsChange() {
        this.descending = this.orderBy === 'DES';
        this.page = 1;
        this.fetchCategories();
    }
}