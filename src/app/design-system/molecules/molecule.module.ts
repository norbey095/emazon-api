import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/navbar/header.component'; 
import { AtomsModule } from '../atoms/atoms.module'; 
import { BasicFormComponent } from './components/basic-form/basic-form.component'; 
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { TableComponent } from './components/table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { ExtendFormComponent } from './components/form-extend/extend-form.component';
import { BrandSelectorComponent } from './components/brand-selector/brand-selector.component';
import { MultiComboBoxComponent } from './components/multi-combo-box/multi-combo-box.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BasicFormComponent,
    FooterComponent,
    AlertComponent,
    TableComponent,
    FilterTableComponent,
    ExtendFormComponent,
    BrandSelectorComponent,
    MultiComboBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AtomsModule,
    NgxPaginationModule
  ],
  exports: [
    HeaderComponent,
    BasicFormComponent,
    FooterComponent,
    AlertComponent,
    TableComponent,
    FilterTableComponent,
    ExtendFormComponent,
    BrandSelectorComponent,
    MultiComboBoxComponent
  ],
})
export class MoleculeModule {}
