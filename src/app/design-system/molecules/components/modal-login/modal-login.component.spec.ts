import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalLoginComponent } from './modal-login.component';
import { AuthService } from 'src/app/shared/services/user/authentication/authentication.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constants/constants';

describe('ModalLoginComponent', () => {
  let component: ModalLoginComponent;
  let fixture: ComponentFixture<ModalLoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ModalLoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ModalLogin component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal', () => {
    component.openModal();
    expect(component.isOpen).toBe(true);
  });

  it('should close the modal', () => {
    component.closeModal();
    expect(component.isOpen).toBe(false);
  });

  it('should submit form and login successfully', () => {
    const form = { valid: true, resetForm: jest.fn() } as any;

    mockAuthService.login.mockReturnValue(of({}));

    component.onSubmit(form);

    expect(mockAuthService.login).toHaveBeenCalledWith(component.email, component.password);
    expect(component.message).toBe("Inicio de sesión correcto");
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe("success");
    expect(component.isSuccessful).toBe(true);
    expect(component.isOpen).toBe(false);
  });

  it('should handle login error', () => {
    const form = { valid: true, resetForm: jest.fn() } as any;

    const errorResponse = new HttpErrorResponse({ error: 'Unauthorized', status: 401 });
    mockAuthService.login.mockReturnValue(throwError(() => errorResponse));

    component.onSubmit(form);

    expect(mockAuthService.login).toHaveBeenCalledWith(component.email, component.password);
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe("warning");
    expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_WARNING);
    expect(component.message).toBe(errorResponse.message);
  });

  it('should mark fields as touched when form is invalid', () => {
    const form: any = {
        valid: false,
        controls: {
            email: { markAsTouched: jest.fn() },
            password: { markAsTouched: jest.fn() },
        }
      };

    component.onSubmit(form);

    expect(form.controls.email.markAsTouched).toHaveBeenCalled();
    expect(form.controls.password.markAsTouched).toHaveBeenCalled();
  });

  it('should call onRegister and close modal', () => {
    component.onRegister();
    expect(component.isOpen).toBe(false);
  });
});
