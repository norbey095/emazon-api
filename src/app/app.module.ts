import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { MenuItemComponent } from './components/atoms/menu-item/menu-item.component'; 
import { NavbarComponent } from './components/molescules/navbar/navbar.component';
import { NavbarContainerComponent } from './components/organisms/navbar/navbar-container.component';
import { LogoComponent } from './components/atoms/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemComponent,
    NavbarComponent,
    NavbarContainerComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
