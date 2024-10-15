import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandListRoutingModule } from './brand-list-routing.module'; 
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { BrandListComponent } from './brand-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        BrandListComponent,
    ],
    imports: [
        CommonModule,
        BrandListRoutingModule,
        DesignSystemModule,
        NgxPaginationModule,
        FormsModule
    ],
})
export class BrandListModule {}