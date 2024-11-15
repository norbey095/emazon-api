import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MoleculeModule } from '../molecules/molecule.module';
import { AtomsModule } from '../atoms/atoms.module';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    MoleculeModule,
    AtomsModule
  ],
  exports: [
    CartComponent
  ],
})
export class OrganismsModule {}
