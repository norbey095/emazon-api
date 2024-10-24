import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @ViewChild('loginModal') loginModal!: ModalLoginComponent;
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openLoginModal() {
    this.loginModal.openModal();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
