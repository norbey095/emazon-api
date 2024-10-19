import { Component } from '@angular/core';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { Article } from 'src/app/shared/types/article';
import { PaginationDto } from 'src/app/shared/types/paginationDto';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
    title: string = "Lista de Articulos";
    articles: any[] = [];

    totalItems: number = 0;
    itemsPerPage: number = 8;
    page: number = 1;
    descending = false;
    filterBy = "article";

    tittle: string = '';
    price: number = 0;
    id: number = 0;
    quantity: number = 0;

    constructor(private articleService: ArticleService) {}

    ngOnInit() {
        this.fetchArticles();
    }

    fetchArticles() {
        this.articleService.getAllArticles(this.page - 1, this.itemsPerPage, this.descending,this.filterBy).subscribe({
            next: (response: PaginationDto<Article>) => {
                this.articles = response.contentList;
                this.totalItems = response.totalElement;
            },
            error: (error) => {
                console.error('Error al cargar los articulos', error);
            }
        });
    }


    onControlsChange(event: { itemsPerPage: number; descending: boolean; page: number,filterBy: string }) {
        this.itemsPerPage = event.itemsPerPage;
        this.descending = event.descending;
        this.page = event.page;
        this.filterBy = event.filterBy;
        this.fetchArticles();
    }
}
