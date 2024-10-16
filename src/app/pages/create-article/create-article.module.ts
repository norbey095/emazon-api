import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleRoutingModule } from './create-article-routing.module'; 
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { CreateArticleComponent } from './create-article.component';

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [CommonModule,
    CreateArticleRoutingModule,
    DesignSystemModule],
})
export class CreateArticleModule {}
