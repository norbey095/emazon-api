import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { DecodedToken } from 'src/app/shared/types/login';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roleSource = new BehaviorSubject<string | null>(null);
  currentRole = this.roleSource.asObservable();
    
  getRoleToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.authorities || null;
    }
    return null;
  }

  getUserNameToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.sub || null;
    }
    return null;
  }  


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  setRole(role: string | null): void {
    this.roleSource.next(role);
  }
}
