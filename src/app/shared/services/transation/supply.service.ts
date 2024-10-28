import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseSuccess } from '../../types/stop/response-success';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  private apiUrl = environment.apiTransactionUrl;

  constructor(private http: HttpClient) {}

  addSupply(id: number,quantity: number): Observable<ResponseSuccess> {
    const token = localStorage.getItem("token");
    const request = { articleId: id, quantity: quantity};
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    
    const registryUrl = `${this.apiUrl}`;

    return this.http.post<ResponseSuccess>(registryUrl, request , { headers });
  }
}
