import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportBuyDto } from '../../types/report/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = environment.apiReportUrl;

  constructor(private http: HttpClient) {}

  getBuy(userName: string): Observable<ReportBuyDto[]> {
    const params = new HttpParams()
      .set('userName', userName);

    const registryUrl = `${this.apiUrl}`;

    return this.http.get<ReportBuyDto[]>(registryUrl, { params });
  }  
}