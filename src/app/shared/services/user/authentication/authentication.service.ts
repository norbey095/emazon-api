import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiAuthUrl;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        const registryUrl = `${this.apiUrl}login`;
        return this.http.post<any>(`${registryUrl}`, { username, password })
            .pipe(tap(response => {
            localStorage.setItem('token', response.token); 
        }));
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }
}
