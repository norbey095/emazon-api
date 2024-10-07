import { NgModule } from '@angular/core';
import { AtomsModule } from './atoms/atoms.module'; 
import { MoleculeModule } from './molecules/molecule.module';

@NgModule({
  imports: [
    AtomsModule,
    MoleculeModule,
  ],
  exports: [
    AtomsModule,
    MoleculeModule,
  ],
})
export class DesignSystemModule { }
