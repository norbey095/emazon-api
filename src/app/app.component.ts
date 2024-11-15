import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'emazon';
  showCart = false;
  showIcon = true;

  openCart(): void {
    this.showCart = true;
    this.showIcon = false;
  }

  closeCart(): void {
    this.showCart = false;
    this.showIcon = true;
  }
}
