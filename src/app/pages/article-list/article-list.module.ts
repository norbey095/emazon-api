import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ArticleListComponent } from './article-list.component';
import { ArticleListRoutingModule } from './article-list-routing.module';

@NgModule({
    declarations: [
        ArticleListComponent,
    ],
    imports: [
        CommonModule,
        DesignSystemModule,
        ArticleListRoutingModule,
        NgxPaginationModule,
        FormsModule
    ],
})
export class ArticleListModule {}