import { Component, ViewEncapsulation } from '@angular/core';
import { Brand } from 'src/app/shared/types/brand';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { PaginationDto } from 'src/app/shared/types/paginationDto';


@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BrandListComponent {
    title: string = "Lista de Marcas";
    brands: any[] = [];
    totalItems: number = 0;
    itemsPerPage: number = 5;
    page: number = 1;
    descending = false;

    constructor(private brandService: BrandService) {}

    ngOnInit() {
        this.fetchBrands();
    }

    fetchBrands() {
        this.brandService.getAllBrand(this.page - 1, this.itemsPerPage, this.descending).subscribe({
            next: (response: PaginationDto<Brand>) => {
                this.brands = response.contentList;
                this.totalItems = response.totalElement;
            },
            error: (error) => {
                console.error('Error al cargar las Marcas', error);
            }
        });
    }


    onControlsChange(event: { itemsPerPage: number; descending: boolean; page: number }) {
        this.itemsPerPage = event.itemsPerPage;
        this.descending = event.descending;
        this.page = event.page;
        this.fetchBrands();
    }
}