import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListRoutingModule } from './category-list-routing.module'; 
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { CategoryListComponent } from './category-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CategoryListComponent,
    ],
    imports: [
        CommonModule,
        CategoryListRoutingModule,
        DesignSystemModule,
        NgxPaginationModule,
        FormsModule
    ],
})
export class CategoryListModule {}