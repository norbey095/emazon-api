import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiAuthUrl;

    constructor(private http: HttpClient,private tokenService:TokenService) {}

    login(email: string, password: string): Observable<any> {
        const login = { email: email, password: password};
        const registryUrl = `${this.apiUrl}login`;

        return this.http.post<any>(registryUrl, login)
            .pipe(tap(response => {
            if (response.token) {
                localStorage.setItem('token', response.token);
                const role = this.tokenService.getRoleToken() || "";
                localStorage.setItem('ROLE', role);
                this.tokenService.setRole(role);
            }
        }));
        
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
