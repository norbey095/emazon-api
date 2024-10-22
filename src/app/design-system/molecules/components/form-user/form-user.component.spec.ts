import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUserComponent } from './form-user.component';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [FormUserComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormUserComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit event on valid form submission', () => {
    const form = { valid: true, resetForm: jest.fn() } as any;

    component.resetOnSuccess = true;
    component.Name = 'John';
    component.lastname = 'Doe';
    component.documentNumber = '12345678';
    component.cellPhone = '987654321';
    component.birthdate = '1990-01-01';
    component.email = 'john.doe@example.com';
    component.password = 'securePassword';

    const emitSpy = jest.spyOn(component.formSubmit, 'emit');

    component.onSubmit(form);

    expect(emitSpy).toHaveBeenCalledWith({
      user: {
        name: 'John',
        lastName: 'Doe',
        documentNumber: '12345678',
        cellPhone: '987654321',
        birthdate: '1990-01-01',
        email: 'john.doe@example.com',
        password: 'securePassword',
      }
    });

    expect(form.resetForm).toHaveBeenCalled();
    expect(component.Name).toBe('');
    expect(component.lastname).toBe('');
    expect(component.documentNumber).toBe('');
    expect(component.cellPhone).toBe('');
    expect(component.birthdate).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
});


  it('should mark fields as touched on invalid form submission', () => {
    const form: any = {
      valid: false,
      controls: {
        name: { markAsTouched: jest.fn() },
        lastname: { markAsTouched: jest.fn() },
        documentNumber: { markAsTouched: jest.fn() },
        cellPhone: { markAsTouched: jest.fn() },
        birthdate: { markAsTouched: jest.fn() },
        email: { markAsTouched: jest.fn() },
        password: { markAsTouched: jest.fn() },
      }
    };

    component.onSubmit(form);

    expect(form.controls.name.markAsTouched).toHaveBeenCalled();
    expect(form.controls.lastname.markAsTouched).toHaveBeenCalled();
    expect(form.controls.documentNumber.markAsTouched).toHaveBeenCalled();
    expect(form.controls.cellPhone.markAsTouched).toHaveBeenCalled();
    expect(form.controls.birthdate.markAsTouched).toHaveBeenCalled();
    expect(form.controls.email.markAsTouched).toHaveBeenCalled();
    expect(form.controls.password.markAsTouched).toHaveBeenCalled();
  });

  it('should reset fields on resetOnSuccess input change', () => {
    component.resetOnSuccess = true;
    component.ngOnChanges({
        resetOnSuccess: {
          currentValue: true,
          previousValue: false,
          firstChange: false,
          isFirstChange: () => false,
        },
      });

    expect(component.Name).toBe('');
    expect(component.lastname).toBe('');
    expect(component.documentNumber).toBe('');
    expect(component.cellPhone).toBe('');
    expect(component.birthdate).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });
});
