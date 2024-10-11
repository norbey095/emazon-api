import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CategoryItemComponent } from './components/category/category-item.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { HeroComponent } from './components/hero/hero.component';
import { inputComponent } from './components/input/input.component';
import { InputButtonComponent } from './components/input-button/input-button.component';
import { ImageComponent } from './components/image/image.component';
import { TableComponent } from './components/table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    CategoryItemComponent,
    LogoComponent,
    MenuItemComponent,
    HeroComponent,
    inputComponent,
    InputButtonComponent,
    ImageComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    CategoryItemComponent,
    LogoComponent,
    MenuItemComponent,
    HeroComponent,
    inputComponent,
    InputButtonComponent,
    ImageComponent,
    TableComponent
  ],
})
export class AtomsModule {}
