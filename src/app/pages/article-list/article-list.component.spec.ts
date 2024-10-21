import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { of, throwError } from 'rxjs';
import { PaginationDto } from 'src/app/shared/types/paginationDto';
import { ArticleList } from 'src/app/shared/types/article';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ArticleListComponent', () => {
    let component: ArticleListComponent;
    let fixture: ComponentFixture<ArticleListComponent>;
    let articleService: jest.Mocked<ArticleService>;

    beforeEach(async () => {
        articleService = {
            getAllArticles: jest.fn().mockReturnValue(of({ contentList: [], totalElement: 0 })),
        } as any;

        await TestBed.configureTestingModule({
            declarations: [ArticleListComponent],
            imports: [NgxPaginationModule],
            providers: [{ provide: ArticleService, useValue: articleService }],
        }).compileComponents();

        fixture = TestBed.createComponent(ArticleListComponent);
        component = fixture.componentInstance;
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
            contentList: [ { id: 1, name: 'Article A', description: 'Description A', quantity: 10, price: 100, brand: {id:1,name:"",description: ""}, categories: [] }],
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
});