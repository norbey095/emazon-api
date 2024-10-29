import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { environment } from 'src/environments/environment';
import { PaginationDto } from '../../../types/stop/paginationDto';
import { Category } from '../../../types/stop/category';
import { ResponseSuccess } from '../../../types/stop/response-success';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllCategories', () => {
    it('should return an Observable<PaginationDto<Category>>', () => {
      const mockResponse: PaginationDto<Category> = {
        contentList: [],
        totalElement: 0
      };

      service.getAllCategories(1, 10, false).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiCrearCategoryUrl}?page=1&size=10&descending=false`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('createCategories', () => {
    it('should create a category and return a ResponseSuccess', () => {
      const mockSuccessResponse: ResponseSuccess = { status: '201', messages: 'Category created' };
      const name = 'Test Category';
      const description = 'Test Description';

      service.createCategories(name, description).subscribe(response => {
        expect(response).toEqual(mockSuccessResponse);
      });

      const req = httpMock.expectOne(`${environment.apiCrearCategoryUrl}registry`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ id: null, name, description });
      req.flush(mockSuccessResponse);
    });
  });
});
