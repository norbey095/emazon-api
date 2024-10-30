import { Component,Input } from '@angular/core';
import { itemsTable } from 'src/app/shared/types/molecule';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent {
    @Input() totalItems!: number;
    @Input() itemsPerPage!: number;
    @Input() page!: number;
    @Input() items: itemsTable[] = [];

}