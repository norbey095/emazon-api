import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/constants';
import { TokenService } from 'src/app/shared/services/user/authentication/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @ViewChild('loginModal') loginModal!: ModalLoginComponent;
  menuOpen = false;
  isAdmin= false;
  isClient= false;
  isAuthenticate = false;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    this.tokenService.currentRole.subscribe(() => {
      this.isAuthenticate = this.tokenService.isAuthenticated();
      this.isAdmin = localStorage.getItem("ROLE") == AppConstants.ROLE_ADMIN? true: false;
      this.isClient = localStorage.getItem("ROLE") == AppConstants.ROLE_CLIENT? true: false;    
    });
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openLoginModal() {
    this.loginModal.openModal();
  }

  logout() {
    this.isAuthenticate = false;
    localStorage.removeItem('token');
    localStorage.removeItem('ROLE');
    this.tokenService.setRole(null);
    this.router.navigate(['']);
  }
}
