import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { ResponseSuccess } from '../types/response-success';
import { environment } from 'src/environments/environment';

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

  it('should retrieve all categories', () => {
    const dummyCategories = [{ id: 1, name: 'Category 1', description: 'Description 1' }];

    service.getAllCategories(1, 10, true).subscribe(categories => {
      expect(categories.length).toBe(1);
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpMock.expectOne(`${environment.apiCrearCategoryUrl}?page=1&size=10&descending=true`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);
  });

  it('should create a category and return success response', () => {
    const dummyResponse: ResponseSuccess = { status: "success", messages: "Categoría creada correctamente" };
    const newCategory = { name: 'New Category', description: 'New Description' };

    service.createCategories(newCategory.name, newCategory.description).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiCrearCategoryUrl}registry`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ id: null, name: newCategory.name, description: newCategory.description });
    req.flush(dummyResponse);
  });
});
