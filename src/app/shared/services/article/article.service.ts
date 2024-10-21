import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article,ArticleList } from '../../types/article';
import { ResponseSuccess } from '../../types/response-success';
import { PaginationDto } from '../../types/paginationDto';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = environment.apiCrearArticleUrl;

  constructor(private http: HttpClient) {}

  getAllArticles(page: number, size: number, descending: boolean,filterBy: string): Observable<PaginationDto<ArticleList>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('descending', descending)
      .set('filterBy', filterBy);

    return this.http.get<PaginationDto<ArticleList>>(this.apiUrl, { params });
  }

  createArticle(article: Article): Observable<ResponseSuccess> {
    const registryUrl = `${this.apiUrl}registry`;

    return this.http.post<ResponseSuccess>(registryUrl, article);
  }
}
