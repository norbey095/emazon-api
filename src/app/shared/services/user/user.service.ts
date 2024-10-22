import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    const registryUrl = `${this.apiUrl}registryAux`;

    return this.http.post<ResponseSuccess>(registryUrl, user);
  }
}
