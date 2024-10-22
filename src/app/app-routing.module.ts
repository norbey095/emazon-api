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
  },
  {
    path: 'create-article',
    loadChildren: () => import('./pages/create-article/create-article.module').then(m => m.CreateArticleModule),
  },
  {
    path: 'articles',
    loadChildren: () => import('./pages/article-list/article-list.module').then(m => m.ArticleListModule),
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages/create-assistant/create-assistant.module').then(m => m.CreateAssistantModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
