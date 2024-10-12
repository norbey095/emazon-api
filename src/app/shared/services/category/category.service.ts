import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../types/category';
import { ResponseSuccess } from '../../types/response-success';
import { PaginationDto } from '../../types/paginationDto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiCrearCategoryUrl;

  constructor(private http: HttpClient) {}

  getAllCategories(page: number, size: number, descending: boolean): Observable<PaginationDto<Category>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('descending', descending);

    return this.http.get<PaginationDto<Category>>(this.apiUrl, { params });
  }

  createCategories(name: string, description: string): Observable<ResponseSuccess> {
    const category = { id: null, name: name, description: description };
    const registryUrl = `${this.apiUrl}registry`;

    return this.http.post<ResponseSuccess>(registryUrl, category);
  }
}
