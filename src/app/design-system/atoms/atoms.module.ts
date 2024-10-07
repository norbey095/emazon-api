import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryItemComponent } from './components/category/category-item.component';
import { CollapseToggleComponent } from './components/collapse/collapse-toggle.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { HeroComponent } from './components/hero/hero.component';
import { inputComponent } from './components/input/input.component';
import { InputButtonComponent } from './components/input-button/input-button.component';

@NgModule({
  declarations: [
    CategoryItemComponent,
    CollapseToggleComponent,
    LogoComponent,
    MenuItemComponent,
    HeroComponent,
    inputComponent,
    InputButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CategoryItemComponent,
    CollapseToggleComponent,
    LogoComponent,
    MenuItemComponent,
    HeroComponent,
    inputComponent,
    InputButtonComponent
  ],
})
export class AtomsModule {}
