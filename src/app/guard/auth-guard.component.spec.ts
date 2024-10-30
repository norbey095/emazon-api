import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.component'; 
import { TokenService } from '../shared/services/user/authentication/token.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockTokenService: { isAuthenticated: jest.Mock; getRoleToken: jest.Mock };
  let mockRouter: { navigate: jest.Mock };

  beforeEach(() => {
    mockTokenService = {
      isAuthenticated: jest.fn(),
      getRoleToken: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: TokenService, useValue: mockTokenService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access with user and role valid', () => {
    const expectedRoles = ['admin', 'user'];
    mockTokenService.isAuthenticated.mockReturnValue(true);
    mockTokenService.getRoleToken.mockReturnValue('admin');

    const mockRoute: Partial<ActivatedRouteSnapshot> = {
      data: { expectedRoles },
    };

    const canActivate = guard.canActivate(mockRoute as ActivatedRouteSnapshot);
    expect(canActivate).toBe(true);
  });

  it('should deny access with user is not valid', () => {
    const expectedRoles = ['admin', 'user'];
    mockTokenService.isAuthenticated.mockReturnValue(false);
    mockTokenService.getRoleToken.mockReturnValue('admin');

    const mockRoute: Partial<ActivatedRouteSnapshot> = {
      data: { expectedRoles },
    };

    const canActivate = guard.canActivate(mockRoute as ActivatedRouteSnapshot);
    expect(canActivate).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should deny access with role not valid', () => {
    const expectedRoles = ['admin', 'user'];
    mockTokenService.isAuthenticated.mockReturnValue(true);
    mockTokenService.getRoleToken.mockReturnValue('guest');

    const mockRoute: Partial<ActivatedRouteSnapshot> = {
      data: { expectedRoles },
    };

    const canActivate = guard.canActivate(mockRoute as ActivatedRouteSnapshot);
    expect(canActivate).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should deny access with role is undefined', () => {
    const expectedRoles = ['admin', 'user'];
    mockTokenService.isAuthenticated.mockReturnValue(true);
    mockTokenService.getRoleToken.mockReturnValue(undefined);

    const mockRoute: Partial<ActivatedRouteSnapshot> = {
      data: { expectedRoles },
    };

    const canActivate = guard.canActivate(mockRoute as ActivatedRouteSnapshot);
    expect(canActivate).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});