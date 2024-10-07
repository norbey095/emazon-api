import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Category {
  id: number;
  name: string;
  description: string;
}
interface ResponseSuccess{
  messages: string;
  status: string;
}


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:9090/stock/category/';

  constructor(private http: HttpClient) {}

  getAllCategories(page: number, size: number, descending: boolean): Observable<Category[]> {
      const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('descending', true);
  
      return this.http.get<Category[]>(this.apiUrl, { params });
  }

  createCategories(name: string, description: string): Observable<ResponseSuccess[]> {
      const category = {id:null,name: name, description: description};
      const registryUrl = `${this.apiUrl}/registry`;
  
      return this.http.post<ResponseSuccess[]>(registryUrl, category);
  }


}
