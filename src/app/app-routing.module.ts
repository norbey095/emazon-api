import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-category',
    loadChildren: () => import('./pages/create-category/create-category.module').then(m => m.CreateCategoryModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/category-list/category-list.module').then(m => m.CategoryListModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
