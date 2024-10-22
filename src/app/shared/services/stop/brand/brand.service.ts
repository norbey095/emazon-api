import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../../../types/stop/brand';
import { ResponseSuccess } from '../../../types/stop/response-success';
import { PaginationDto } from '../../../types/stop/paginationDto';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = environment.apiCrearBrandUrl;

  constructor(private http: HttpClient) {}

  getAllBrand(page: number, size: number, descending: boolean): Observable<PaginationDto<Brand>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('descending', descending);

    return this.http.get<PaginationDto<Brand>>(this.apiUrl, { params });
  }

  createBrand(name: string, description: string): Observable<ResponseSuccess> {
    const category = { id: null, name: name, description: description };
    const registryUrl = `${this.apiUrl}registry`;

    return this.http.post<ResponseSuccess>(registryUrl, category);
  }
}
