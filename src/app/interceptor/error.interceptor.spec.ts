import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle other types of errors', async () => {
    const mockError = { message: 'Custom error message' };

    const response = firstValueFrom(httpClient.get('/test').pipe());

    const req = httpMock.expectOne('/test');
    req.flush(mockError, { status: 500, statusText: 'Internal Server Error' });

    await expect(response).rejects.toMatchObject({
      status: 500,
      message: 'Custom error message'
    });
  });
});
