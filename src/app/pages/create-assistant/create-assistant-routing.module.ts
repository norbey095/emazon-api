import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { CreateAssistantComponent } from './create-assistant.component'; 

const routes: Routes = [
  { path: '', component: CreateAssistantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAssistantRoutingModule { }