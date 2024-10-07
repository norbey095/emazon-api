import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSystemModule } from 'src/app/design-system/design-system.module'; 
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,FormsModule
  ],
  providers: [
    DesignSystemModule
  ],
  exports: [
  ],
})
export class CoreModule { }
