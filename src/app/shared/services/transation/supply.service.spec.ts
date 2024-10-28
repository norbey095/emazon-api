import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplyService } from './supply.service';
import { ResponseSuccess } from '../../types/stop/response-success';
import { environment } from 'src/environments/environment';

describe('SupplyService', () => {
  let service: SupplyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplyService],
    });
    service = TestBed.inject(SupplyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add supply and return response', () => {
    const id = 1;
    const quantity = 5;
    const mockResponse: ResponseSuccess = { messages: 'Supply added successfully',status: '200' };

    localStorage.setItem('token', 'fake-jwt-token');

    service.addSupply(id, quantity).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiTransactionUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-jwt-token');
    expect(req.request.body).toEqual({ articleId: id, quantity: quantity });

    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const id = 1;
    const quantity = 5;

    localStorage.setItem('token', 'fake-jwt-token');

    service.addSupply(id, quantity).subscribe({
      next: () => fail('should have failed with a 500 status'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`${environment.apiTransactionUrl}`);
    req.flush('Internal server error', { status: 500, statusText: 'Server Error' });
  });
});
