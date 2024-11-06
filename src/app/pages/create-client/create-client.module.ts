import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { CreateClientComponent } from './create-client.component';
import { CreateClientRoutingModule } from './create-client-routing.module';

@NgModule({
  declarations: [CreateClientComponent],
  imports: [CommonModule,
    CreateClientRoutingModule,
    DesignSystemModule],
})
export class CreateClientModule {}
