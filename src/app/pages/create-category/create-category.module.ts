import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/components/core.module';
import { DesignSystemModule } from 'src/app/design-system/design-system.module'; 
import { CreateCategoryComponent } from './create-category.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CreateCategoryComponent,
  },
];

@NgModule({
    declarations: [ 
    CreateCategoryComponent
   ],
  imports: [
    CoreModule,
    CommonModule,
    DesignSystemModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CreateCategoryModule {}
