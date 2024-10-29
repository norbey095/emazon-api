import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component'; 
import { AtomsModule } from '../atoms/atoms.module'; 
import { FormBasicComponent } from './components/form-basic/form-basic.component'; 
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { TableComponent } from './components/table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { ExtendFormComponent } from './components/form-extend/extend-form.component';
import { SelectorComponent } from './components/selector/selector.component';
import { MultiComboBoxComponent } from './components/multi-combo-box/multi-combo-box.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleModalComponent } from './components/article-modal/article-modal.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { ModalSupplyComponent } from './components/modal-supply/modal-supply.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FormBasicComponent,
    FooterComponent,
    AlertComponent,
    TableComponent,
    FilterTableComponent,
    ExtendFormComponent,
    SelectorComponent,
    MultiComboBoxComponent,
    ArticleCardComponent,
    ArticleModalComponent,
    FormUserComponent,
    ModalLoginComponent,
    ModalSupplyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AtomsModule,
    NgxPaginationModule
  ],
  exports: [
    HeaderComponent,
    FormBasicComponent,
    FooterComponent,
    AlertComponent,
    TableComponent,
    FilterTableComponent,
    ExtendFormComponent,
    SelectorComponent,
    MultiComboBoxComponent,
    ArticleCardComponent,
    ArticleModalComponent,
    FormUserComponent,
    ModalLoginComponent,
    ModalSupplyComponent
  ],
})
export class MoleculeModule {}
