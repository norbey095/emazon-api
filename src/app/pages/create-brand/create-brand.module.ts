import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBrandRoutingModule } from './create-brand-routing.module'; 
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { CreateBrandComponent } from './create-brand.component';

@NgModule({
  declarations: [CreateBrandComponent],
  imports: [CommonModule,
    CreateBrandRoutingModule,
    DesignSystemModule],
})
export class CreateBrandModule {}
