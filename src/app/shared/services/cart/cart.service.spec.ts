import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';
import { ResponseSuccess } from '../../types/stop/response-success';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addCart', () => {
    it('should add to cart and return a ResponseSuccess', () => {
      const mockSuccessResponse: ResponseSuccess = { status: '201', messages: 'Added successfully' };
      const request =  { idArticle: 1, quantity: 1 };

      service.addCart(1,1).subscribe(response => {
        expect(response).toEqual(mockSuccessResponse);
      });

      const req = httpMock.expectOne(`${environment.apiCartUrl}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(request);
      req.flush(mockSuccessResponse);
    });
  });
});
