import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { ArticleService } from 'src/app/shared/services/stock/article/article.service';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { of, throwError } from 'rxjs';
import { PaginationDto } from 'src/app/shared/types/stop/paginationDto';
import { ArticleList } from 'src/app/shared/types/stop/article';
import { ModalSupplyComponent } from 'src/app/design-system/molecules/components/modal-supply/modal-supply.component';
import { AppConstants } from 'src/app/shared/constants/constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ResponseSuccess } from 'src/app/shared/types/stop/response-success';

describe('ArticleListComponent', () => {
    let component: ArticleListComponent;
    let fixture: ComponentFixture<ArticleListComponent>;
    let articleService: { getAllArticles: jest.Mock };
    let cartService: { addCart: jest.Mock };
    let modalSupply: ModalSupplyComponent;

    beforeEach(async () => {
        articleService = {
            getAllArticles: jest.fn().mockReturnValue(of({ contentList: [], totalElement: 0 })),
        };

        cartService = {
            addCart: jest.fn(),
        };

        await TestBed.configureTestingModule({
            declarations: [ArticleListComponent, ModalSupplyComponent],
            imports: [NgxPaginationModule, HttpClientTestingModule],
            providers: [
                { provide: ArticleService, useValue: articleService },
                { provide: CartService, useValue: cartService }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ArticleListComponent);
        component = fixture.componentInstance;
        modalSupply = fixture.debugElement.query(By.directive(ModalSupplyComponent)).componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch articles on init', () => {
        expect(articleService.getAllArticles).toHaveBeenCalledWith(0, 8, false, 'article');
    });

    it('should update articles and totalItems when fetchArticles is called', () => {
        const mockResponse: PaginationDto<ArticleList> = {
            contentList: [ 
                { id: 1, name: 'Article A', description: 'Description A', quantity: 10, price: 100, brand: {id:1,name:"",description: ""}, categories: [] }
            ],
            totalElement: 1
        };

        articleService.getAllArticles.mockReturnValue(of(mockResponse));
        
        component.fetchArticles();

        expect(component.articles).toEqual(mockResponse.contentList);
        expect(component.totalItems).toBe(mockResponse.totalElement);
    });

    it('should handle error when fetchArticles fails', () => {
        jest.spyOn(console, 'error').mockImplementation();

        articleService.getAllArticles.mockReturnValue(throwError(() => new Error('Error fetching articles')));
        
        component.fetchArticles();

        expect(console.error).toHaveBeenCalledWith('Error al cargar los articulos', expect.any(Error));
    });

    it('should update state and fetch articles on controls change', () => {
        const event = { itemsPerPage: 10, descending: true, page: 2, filterBy: 'newFilter' };
        
        component.onControlsChange(event);

        expect(component.itemsPerPage).toBe(event.itemsPerPage);
        expect(component.descending).toBe(event.descending);
        expect(component.page).toBe(event.page);
        expect(component.filterBy).toBe(event.filterBy);
        expect(articleService.getAllArticles).toHaveBeenCalledWith(1, 10, true, 'newFilter');
    });

    it('should open the supply modal when openSupplyModal is called', () => {
        const openModalSpy = jest.spyOn(modalSupply, 'openModal');
        
        component.openSupplyModal();

        expect(openModalSpy).toHaveBeenCalled();
    });

    it('should call addCart and handle success message on form submit', () => {
        const mockResponse: ResponseSuccess = { messages: 'Articulo agregado al carrito', status: '201' };
        const event = { idArticle: 1, quantity: 2 };

        cartService.addCart.mockReturnValue(of(mockResponse));
        
        component.onFormSubmit(event);

        expect(cartService.addCart).toHaveBeenCalledWith(event.idArticle, event.quantity);
        expect(component.message).toBe(mockResponse.messages);
        expect(component.status).toBe('success');
        expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_SUCCESS);
    });

    it('should handle error in onFormSubmit and show warning message', () => {
        const mockError = {
            status: 401,
            message: 'Invalid token'
        };
        const event = { idArticle: 1, quantity: 2 };

        cartService.addCart.mockReturnValue(throwError(() => mockError));
        
        component.onFormSubmit(event);

        expect(cartService.addCart).toHaveBeenCalledWith(event.idArticle, event.quantity);
        expect(component.isMessagess).toBe(true);
        expect(component.status).toBe('warning');
        expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_WARNING);
        expect(component.message).toBe('Se requiere inicio de sesión');
    });

    it('should handle error in onFormSubmit and show warning message and access denied', () => {
        const mockError = {
            status: 401,
            message: 'Acceso denegado'
        };
        const event = { idArticle: 1, quantity: 2 };

        cartService.addCart.mockReturnValue(throwError(() => mockError));
        
        component.onFormSubmit(event);

        expect(cartService.addCart).toHaveBeenCalledWith(event.idArticle, event.quantity);
        expect(component.isMessagess).toBe(true);
        expect(component.status).toBe('warning');
        expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_WARNING);
        expect(component.message).toBe('Solo los clientes pueden agregar al carrito');
    });

    it('should handle generic error message in onFormSubmit', () => {
        const mockError = {
            status: 401,
            message: 'Unknown error'
        };
        const event = { idArticle: 1, quantity: 2 };

        cartService.addCart.mockReturnValue(throwError(() => mockError));
        
        component.onFormSubmit(event);

        expect(cartService.addCart).toHaveBeenCalledWith(event.idArticle, event.quantity);
        expect(component.isMessagess).toBe(true);
        expect(component.status).toBe('warning');
        expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_WARNING);
        expect(component.message).toBe('Unknown error');
    });
});
