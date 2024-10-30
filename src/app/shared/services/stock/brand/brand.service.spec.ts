import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { environment } from 'src/environments/environment';
import { PaginationDto } from '../../../types/stop/paginationDto';
import { Brand } from '../../../types/stop/brand';
import { ResponseSuccess } from '../../../types/stop/response-success';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService],
    });

    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllBrand', () => {
    it('should return an Observable<PaginationDto<Brand>>', () => {
      const mockResponse: PaginationDto<Brand> = {
        contentList: [],
        totalElement: 0
      };

      service.getAllBrand(1, 10, false).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiCrearBrandUrl}?page=1&size=10&descending=false`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('createBrand', () => {
    it('should create a brand and return a ResponseSuccess', () => {
      const mockSuccessResponse: ResponseSuccess = { status: '201', messages: 'Brand created' };
      const name = 'Test Brand';
      const description = 'Test Description';

      service.createBrand(name, description).subscribe(response => {
        expect(response).toEqual(mockSuccessResponse);
      });

      const req = httpMock.expectOne(`${environment.apiCrearBrandUrl}registry`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ id: null, name, description });
      req.flush(mockSuccessResponse);
    });
  });
});
