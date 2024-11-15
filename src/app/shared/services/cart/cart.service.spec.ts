import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';
import { ResponseSuccess } from '../../types/stop/response-success';
import { CartDetailResponse } from '../../types/cart/cart';

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

  it('should fetch cart details and return CartDetailResponse', () => {
    const mockCartResponse: CartDetailResponse = {
      cartDetail: [],
      totalPrice: 0,
      totalItems: 0,
    };

    const page = 1;
    const size = 10;
    const descending = true;
    const categoryName = 'electronics';
    const brandName = 'BrandX';

    const expectedParams = {
      page: page.toString(),
      size: size.toString(),
      descending: descending.toString(),
      categoryName,
      brandName
    };

    service.getCart(page, size, descending, categoryName, brandName).subscribe(response => {
      expect(response).toEqual(mockCartResponse);
    });

    const req = httpMock.expectOne((request) => {
      return request.url === `${environment.apiCartUrl}` &&
        request.method === 'GET' &&
        request.params.get('page') === expectedParams.page &&
        request.params.get('size') === expectedParams.size &&
        request.params.get('descending') === expectedParams.descending &&
        request.params.get('categoryName') === expectedParams.categoryName &&
        request.params.get('brandName') === expectedParams.brandName;
    });

    req.flush(mockCartResponse);
  });

});
