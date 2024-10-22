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
    const mockError = { message: 'Error de comunicación, por favor intente mas tarde.' };

    const response = firstValueFrom(httpClient.get('/test').pipe());

    const req = httpMock.expectOne('/test');
    req.flush(mockError, { status: 500, statusText: 'Internal Server Error' });

    await expect(response).rejects.toMatchObject({
      status: 500,
      message: 'Error de comunicación, por favor intente mas tarde.'
    });
  });

  it('should handle ErrorEvent type errors', async () => {
    const mockErrorEvent = {
      message: 'A network error occurred',
      name: 'NetworkError',
    };
  
    const response = firstValueFrom(httpClient.get('/test').pipe());
  
    const req = httpMock.expectOne('/test');
    req.error(new ErrorEvent('NetworkError', { message: mockErrorEvent.message }));
  
    await expect(response).rejects.toMatchObject({
      status: 0,
      message: 'Error: A network error occurred',
    });
  });    
});
