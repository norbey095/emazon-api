import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-table',
  templateUrl: 'filter-table.component.html',
  styleUrls: ['filter-table.component.scss']
})
export class FilterTableComponent {
    @Output() controlsChange = new EventEmitter<{
        itemsPerPage: number;
        descending: boolean;
        page: number;
        filterBy: string;
    }>();

    itemsPerPage: number = 8;
    descending: boolean = false;
    page: number = 1;
    orderBy = 'ASC';
    filterBy = 'Artículo';
    orderByOptions = ["ASC", "DES"];
    filterByOptions = ["Artículo", "Marca","Categoría"];
    itemsPerPageOptions = [8, 16, 24];
    filterByChanges = 'article'


    onControlsChange() {
        this.descending = this.orderBy === 'DES';
        this.page = 1;
        this.getFilterBy();
       
        this.controlsChange.emit({
            itemsPerPage: this.itemsPerPage,
            descending: this.descending,
            page: this.page,
            filterBy: this.filterByChanges
        });
    }

    getFilterBy(){
        if (this.filterBy === 'Marca'){
            this.filterByChanges = 'brand';
        } else if(this.filterBy === 'Categoría'){
            this.filterByChanges = 'category';
        } else{
            this.filterByChanges = 'article';
        }
    }
}
