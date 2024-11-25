import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.component';
import { AppConstants } from './shared/constants/constants';


const routes: Routes = [
  {
    path: 'create-category',
    loadChildren: () => import('./pages/create-category/create-category.module').then(m => m.CreateCategoryModule),
    canActivate: [AuthGuard],
    data: { expectedRoles: [AppConstants.ROLE_ADMIN]}
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/category-list/category-list.module').then(m => m.CategoryListModule),
  },
  {
    path: 'create-brand',
    loadChildren: () => import('./pages/create-brand/create-brand.module').then(m => m.CreateBrandModule),
    canActivate: [AuthGuard],
    data: { expectedRoles: [AppConstants.ROLE_ADMIN]}
  },
  {
    path: 'brands',
    loadChildren: () => import('./pages/brand-list/brand-list.module').then(m => m.BrandListModule),
  },
  {
    path: 'create-article',
    loadChildren: () => import('./pages/create-article/create-article.module').then(m => m.CreateArticleModule),
    canActivate: [AuthGuard],
    data: { expectedRoles: [AppConstants.ROLE_ADMIN]}
  },
  {
    path: 'articles',
    loadChildren: () => import('./pages/article-list/article-list.module').then(m => m.ArticleListModule),
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages/create-assistant/create-assistant.module').then(m => m.CreateAssistantModule),
    canActivate: [AuthGuard],
    data: { expectedRoles: [AppConstants.ROLE_ADMIN]}
  },
  {
    path: 'create-client',
    loadChildren: () => import('./pages/create-client/create-client.module').then(m => m.CreateClientModule)
  },
  {
    path: 'my-buy',
    loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
