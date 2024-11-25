import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportService } from './report.service';
import { ReportBuyDto } from '../../types/report/report';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('ReportService', () => {
  let service: ReportService;
  let httpMock: HttpTestingController;
  const mockApiUrl = environment.apiReportUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportService]
    });

    service = TestBed.inject(ReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBuy', () => {
    it('should return report data when API call is successful', () => {
      const mockResponse: ReportBuyDto[] = [];

      const userName = 'testUser';

      service.getBuy(userName).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne((request) => 
        request.method === 'GET' && request.url === mockApiUrl
      );

      req.flush(mockResponse);
    });

    it('should handle error when API call fails', () => {
      const userName = 'testUser';
      const errorMessage = 'Error fetching report data';

      service.getBuy(userName).subscribe({
        next: () => {
          fail('expected an error, not a response');
        },
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.error).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne((request) =>
        request.method === 'GET' && request.url === mockApiUrl
      );
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle no data response from API', () => {
      const userName = 'testUser';

      service.getBuy(userName).subscribe((response) => {
        expect(response).toEqual([]);
      });

      const req = httpMock.expectOne((request) =>
        request.method === 'GET' && request.url === mockApiUrl
      );

      req.flush([]);
    });

    it('should handle bad request error (400)', () => {
      const userName = 'testUser';
      const errorMessage = 'Bad request';

      service.getBuy(userName).subscribe({
        next: () => {
          fail('expected an error, not a response');
        },
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.error).toBe(errorMessage);
        }
      });

      const req = httpMock.expectOne((request) =>
        request.method === 'GET' && request.url === mockApiUrl
      );

      req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
    });
  });
});
