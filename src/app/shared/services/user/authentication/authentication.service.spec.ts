import { TestBed } from '@angular/core/testing';
import { AuthService } from './authentication.service'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  let mockTokenService: {
    getRoleToken: jest.Mock<string>;
    setRole: jest.Mock<void>;
  };

  beforeEach(() => {
    mockTokenService = {
      getRoleToken: jest.fn(),
      setRole: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: TokenService, useValue: mockTokenService },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in successfully', () => {
    const mockResponse = { token: 'mockToken' };
    const email = 'test@example.com';
    const password = 'password123';

    service.login(email, password).subscribe(response => {
      expect(response.token).toBe(mockResponse.token);
      expect(localStorage.getItem('token')).toBe(mockResponse.token);
    });

    const req = httpMock.expectOne(`${environment.apiAuthUrl}login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should set role and update local storage', () => {
    const mockResponse = { token: 'mockToken' };
    const email = 'test@example.com';
    const password = 'password123';
    mockTokenService.getRoleToken.mockReturnValue('admin');

    service.login(email, password).subscribe();

    const req = httpMock.expectOne(`${environment.apiAuthUrl}login`);
    req.flush(mockResponse);

    expect(localStorage.getItem('ROLE')).toBe('admin');
    expect(mockTokenService.setRole).toHaveBeenCalledWith('admin');
  });

  it('should log out the user and remove the token', () => {
    localStorage.setItem('token', 'mockToken');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should get the token from local storage', () => {
    localStorage.setItem('token', 'mockToken');
    expect(service.getToken()).toBe('mockToken');
  });

  it('should return null if no token is found', () => {
    localStorage.removeItem('token');
    expect(service.getToken()).toBeNull();
  });
});