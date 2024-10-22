import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { CreateAssistantComponent } from './create-assistant.component';
import { CreateAssistantRoutingModule } from './create-assistant-routing.module';

@NgModule({
  declarations: [CreateAssistantComponent],
  imports: [CommonModule,
    CreateAssistantRoutingModule,
    DesignSystemModule],
})
export class CreateAssistantModule {}
