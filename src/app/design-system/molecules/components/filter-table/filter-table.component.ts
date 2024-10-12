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
    }>();

    itemsPerPage: number = 5;
    descending: boolean = false;
    page: number = 1;
    orderBy = 'ASC';
    orderByOptions = ["ASC", "DES"];
    itemsPerPageOptions = [5, 10, 15];


    onControlsChange() {
        this.descending = this.orderBy === 'DES';
        this.page = 1;
       
       this.controlsChange.emit({
            itemsPerPage: this.itemsPerPage,
            descending: this.descending,
            page: this.page
        });
    }

}
