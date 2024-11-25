import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { TokenService } from 'src/app/shared/services/user/authentication/token.service';
import { ArticleDetailsDto, ReportBuyDto } from 'src/app/shared/types/report/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  userName = "";
  buys: ReportBuyDto[] = [];

  constructor(private reportService: ReportService,private tokenService: TokenService) { }

  ngOnInit(): void {
    this.fetchBuy();
  }


  fetchBuy() {
    this.userName = this.tokenService.getUserNameToken() || "";
    this.reportService.getBuy(this.userName).subscribe({
        next: (response: ReportBuyDto[]) => {
            this.buys = response;
        },
        error: (error) => {
            console.error('Error al cargar las Marcas', error);
        }
    });
}

  formatProducts(articles: ArticleDetailsDto[]): string {
    return articles.map(article => `${article.name} (${article.quantity})`).join(', ');
  }
}
