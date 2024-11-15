import { NgModule } from '@angular/core';
import { AtomsModule } from './atoms/atoms.module'; 
import { MoleculeModule } from './molecules/molecule.module';
import { OrganismsModule } from './organisms/organisms.module';

@NgModule({
  imports: [
    AtomsModule,
    MoleculeModule,
    OrganismsModule,
  ],
  exports: [
    AtomsModule,
    MoleculeModule,
    OrganismsModule,
  ],
})
export class DesignSystemModule { }
