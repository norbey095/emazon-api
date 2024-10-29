import { Component, ViewChild } from '@angular/core';
import { ModalSupplyComponent } from 'src/app/design-system/molecules/components/modal-supply/modal-supply.component';
import { AppConstants } from 'src/app/shared/constants/constants';
import { ArticleService } from 'src/app/shared/services/stock/article/article.service';
import { ArticleList } from 'src/app/shared/types/stop/article';
import { PaginationDto } from 'src/app/shared/types/stop/paginationDto';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {

    @ViewChild('supplyModal') supplyModal!: ModalSupplyComponent;
    title: string = "Lista de Articulos";
    articles: any[] = [];

    filterbys: boolean = true;
    totalItems: number = 0;
    itemsPerPage: number = 8;
    page: number = 1;
    descending = false;
    filterBy = "article";

    tittle: string = '';
    price: number = 0;
    id: number = 0;
    quantity: number = 0;
    isAdmin= false;
    isAux= false;

    constructor(private articleService: ArticleService) {}

    ngOnInit() {
        this.isAdmin = localStorage.getItem("ROLE") == AppConstants.ROLE_ADMIN? true: false;
        this.isAux = localStorage.getItem("ROLE") == AppConstants.ROLE_AUX? true: false;
        this.fetchArticles();
    }

    fetchArticles() {
        this.articleService.getAllArticles(this.page - 1, this.itemsPerPage, this.descending,this.filterBy).subscribe({
            next: (response: PaginationDto<ArticleList>) => {
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

    opensupplyModal() {
        this.supplyModal.openModal();
    }
}
