import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'create-category', component: CreateCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryListRoutingModule {}