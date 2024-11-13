import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalSupplyComponent } from 'src/app/design-system/molecules/components/modal-supply/modal-supply.component';
import { AppConstants } from 'src/app/shared/constants/constants';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { ArticleService } from 'src/app/shared/services/stock/article/article.service'; 
import { ArticleList } from 'src/app/shared/types/stop/article';
import { PaginationDto } from 'src/app/shared/types/stop/paginationDto';
import { ResponseSuccess } from 'src/app/shared/types/stop/response-success';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {

    @ViewChild('supplyModal') supplyModal!: ModalSupplyComponent;
    title: string = "Lista de Articulos";
    articles: ArticleList[] = [];

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

    message: string = "";
    isMessagess: boolean = false;
    status: string = "sucess";
    srcImage: string = "";

    constructor(private articleService: ArticleService,private cartService: CartService) {}

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

    openSupplyModal() {
        this.supplyModal.openModal();
    }

    onFormSubmit(event: { idArticle: number, quantity: number }) {
        this.cartService.addCart(event.idArticle, event.quantity).subscribe({
          next: (response: ResponseSuccess) => {        
            this.message =  response.messages; 
            this.isMessagess = true;  
            this.status = "success";
            this.srcImage = AppConstants.SRC_IMAGE_SUCCESS;
            
            setTimeout(() => {
              this.isMessagess = false; 
            }, 4000);
          },
          error: (error: HttpErrorResponse) => {
            this.isMessagess = true;
            this.status = "warning";
            this.srcImage = AppConstants.SRC_IMAGE_WARNING;
            const message = error.message;
            if(message.includes("Invalid token")){
              this.message = "Se requiere inicio de sesión";
            } else if(message.includes("Acceso denegado")){
              this.message = "Solo los clientes pueden agregar al carrito";
            } else {
              this.message = error.message;
            }           
            setTimeout(() => {
              this.isMessagess = false; 
            }, 4000);
          }
        });
    }
}
