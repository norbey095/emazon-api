import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AtomsModule } from '../atoms/atoms.module';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    FormComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    FormComponent,
    FooterComponent,
    AlertComponent
  ],
})
export class MoleculeModule {}
