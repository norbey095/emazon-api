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



@NgModule({
  declarations: [
    CategoryItemComponent,
    LogoComponent,
    MenuItemComponent,
    HeroComponent,
    inputComponent,
    InputButtonComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CategoryItemComponent,
    LogoComponent,
    MenuItemComponent,
    HeroComponent,
    inputComponent,
    InputButtonComponent,
    ImageComponent
  ],
})
export class AtomsModule {}
