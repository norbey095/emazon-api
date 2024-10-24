import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenService } from '../shared/services/user/authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.tokenService.getRole();
    const expectedRoles = route.data['expectedRoles'] as string[];

    if (this.tokenService.isAuthenticated() && userRole && expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/articles']);
      return false;
    }
  }
}
