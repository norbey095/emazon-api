import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { Article, ArticleList } from '../../../types/article';
import { ResponseSuccess } from '../../../types/stop/response-success';
import { PaginationDto } from '../../../types/stop/paginationDto';
import { environment } from 'src/environments/environment';

describe('ArticleService', () => {
    let service: ArticleService;
    let httpMock: HttpTestingController;

    const mockApiUrl = environment.apiCrearArticleUrl;
    const mockArticles: ArticleList[] = [
        { id: 1, name: 'Article A', description: 'Description A', quantity: 10, price: 100, brand: {id:1,name:"",description: ""}, categories: [] },
        { id: 2, name: 'Article B', description: 'Description B', quantity: 20, price: 200, brand: {id:1,name:"",description: ""}, categories: [] },
    ];

    const mockPaginationResponse: PaginationDto<ArticleList> = {
        contentList: mockArticles,
        totalElement: 2,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ArticleService],
        });

        service = TestBed.inject(ArticleService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve all articles', (done) => {
        service.getAllArticles(0, 10, false,"article").subscribe((response) => {
            expect(response).toEqual(mockPaginationResponse);
            done();
        });
    
        const req = httpMock.expectOne(`${environment.apiCrearArticleUrl}?page=0&size=10&descending=false&filterBy=article`);
        expect(req.request.method).toBe('GET');
        req.flush(mockPaginationResponse);
    });      

    it('should create an article', (done) => {
        const newArticle: Article = {
            id: 0,
            name: 'New Article',
            description: 'New Description',
            quantity: 5,
            price: 50,
            idbrand: 1,
            categories: [],
        };
    
        const mockResponse: ResponseSuccess = { status: '201', messages: 'Article created' };
    
        service.createArticle(newArticle).subscribe((response) => {
            expect(response).toEqual(mockResponse);
            done();
        });
    
        const req = httpMock.expectOne(`${mockApiUrl}registry`); 
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newArticle);
        req.flush(mockResponse);
    });    
});
