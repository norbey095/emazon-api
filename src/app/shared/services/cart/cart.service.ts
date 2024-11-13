import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseSuccess } from '../../types/stop/response-success';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiCartUrl;

  constructor(private http: HttpClient) {}

  addCart(idArticle: number,quantity: number): Observable<ResponseSuccess> {
    const cart = { idArticle: idArticle, quantity: quantity };
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const registryUrl = `${this.apiUrl}`;

    return this.http.post<ResponseSuccess>(registryUrl, cart , { headers });
  }
}
