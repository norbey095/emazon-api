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
  },
  {
    path: 'create-brand',
    loadChildren: () => import('./pages/create-brand/create-brand.module').then(m => m.CreateBrandModule),
  },
  {
    path: 'brands',
    loadChildren: () => import('./pages/brand-list/brand-list.module').then(m => m.BrandListModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
