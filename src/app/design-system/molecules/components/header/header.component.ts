import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navActive: boolean = false;

  toggleNav() {
    this.navActive = !this.navActive;
  }
}
