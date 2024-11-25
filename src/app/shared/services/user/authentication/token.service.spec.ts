import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

jest.mock('jwt-decode');

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if no token is present', () => {
    expect(service.getRoleToken()).toBeNull();
  });

  it('should return the role', () => {
    const mockToken = 'mockToken';
    const mockDecoded = { authorities: 'admin' };
    localStorage.setItem('token', mockToken);
    (jwtDecode as jest.Mock).mockReturnValue(mockDecoded);

    const role = service.getRoleToken();
    expect(role).toBe('admin');
    expect(jwtDecode).toHaveBeenCalledWith(mockToken);
  });

  it('should return true if the user is authenticated', () => {
    localStorage.setItem('token', 'mockToken');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false if the user is not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should set the role and update the BehaviorSubject', () => {
    service.setRole('admin');
    service.currentRole.subscribe(role => {
      expect(role).toBe('admin');
    });
  });

  it('should set the role to null and update the BehaviorSubject', () => {
    service.setRole(null);
    service.currentRole.subscribe(role => {
      expect(role).toBeNull();
    });
  });

  it('should return null if no token is present', () => {
    localStorage.removeItem('token');
    expect(service.getUserNameToken()).toBeNull();
  });

  it('should return the user name from the token', () => {
    const mockToken = 'mockToken';
    const mockDecoded = { sub: 'testUser' };
    localStorage.setItem('token', mockToken);
    (jwtDecode as jest.Mock).mockReturnValue(mockDecoded);

    const userName = service.getUserNameToken();
    expect(userName).toBe('testUser');
    expect(jwtDecode).toHaveBeenCalledWith(mockToken);
  });

  it('should return null if the token does not have a user name (sub)', () => {
    const mockToken = 'mockToken';
    const mockDecoded = {};
    localStorage.setItem('token', mockToken);
    (jwtDecode as jest.Mock).mockReturnValue(mockDecoded);

    const userName = service.getUserNameToken();
    expect(userName).toBeNull();
    expect(jwtDecode).toHaveBeenCalledWith(mockToken);
  });
});