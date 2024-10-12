import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/navbar/header.component'; 
import { AtomsModule } from '../atoms/atoms.module'; 
import { FormComponent } from './components/form/form.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { TableComponent } from './components/table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterTableComponent } from './components/filter-table/filter-table.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FormComponent,
    FooterComponent,
    AlertComponent,
    TableComponent,
    FilterTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AtomsModule,
    NgxPaginationModule
  ],
  exports: [
    HeaderComponent,
    FormComponent,
    FooterComponent,
    AlertComponent,
    TableComponent,
    FilterTableComponent
  ],
})
export class MoleculeModule {}
