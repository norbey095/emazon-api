import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryCollapseComponent } from './category/category-collapse.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AtomsModule } from '../atoms/atoms.module';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    CategoryCollapseComponent,
    NavbarComponent,
    HeaderComponent,
    FormComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AtomsModule
  ],
  exports: [
    CategoryCollapseComponent,
    NavbarComponent,
    HeaderComponent,
    FormComponent,
    FooterComponent
  ],
})
export class MoleculeModule {}
