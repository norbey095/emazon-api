import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseSuccess } from '../../types/stop/response-success';
import { User } from '../../types/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUserUrl;

  constructor(private http: HttpClient) {}

  createAssistant(user: User): Observable<ResponseSuccess> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const registryUrl = `${this.apiUrl}registryAux`;

    return this.http.post<ResponseSuccess>(registryUrl, user , { headers });
  }

  createClient(user: User): Observable<ResponseSuccess> {
    const registryUrl = `${this.apiUrl}registryClient`;

    return this.http.post<ResponseSuccess>(registryUrl, user );
  }
}
