import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { ResponseSuccess } from '../../types/stop/response-success';
import { User } from '../../types/user/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createAssistant', () => {
    it('should create an assistant and return a ResponseSuccess', () => {
      const mockSuccessResponse: ResponseSuccess = { status: '201', messages: 'Assistant created' };
      const user: User = {
        name: 'John',
        lastName: 'Doe',
        documentNumber: '12345678',
        cellPhone: '987654321',
        birthdate: '1990-01-01',
        email: 'john.doe@example.com',
        password: 'securePassword',
      };

      service.createAssistant(user).subscribe(response => {
        expect(response).toEqual(mockSuccessResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUserUrl}registryAux`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(user);
      req.flush(mockSuccessResponse);
    });
  });
});
