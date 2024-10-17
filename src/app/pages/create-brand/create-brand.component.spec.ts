import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBrandComponent } from './create-brand.component';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { of, throwError } from 'rxjs';
import { ResponseSuccess } from 'src/app/shared/types/response-success';
import { HttpErrorResponse } from '@angular/common/http';

jest.useFakeTimers();

describe('CreateBrandComponent', () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let brandService: { createBrand: jest.Mock };

  beforeEach(async () => {
    brandService = {
      createBrand: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateBrandComponent],
      providers: [
        { provide: BrandService, useValue: brandService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and show success message', () => {
    const mockResponse: ResponseSuccess = { status: "success", messages: "Marca creada correctamente" };
    (brandService.createBrand as jest.Mock).mockReturnValue(of(mockResponse));

    component.onFormSubmit({ name: 'Test Brand', description: 'Test Description' });

    expect(component.message).toBe("Marca creada correctamente");
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe("success");
    expect(component.srcImage).toBe("assets/images/Icon-success.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });

  it('should handle error response and show error message', () => {
    const errorResponse = new HttpErrorResponse({ status: 409, statusText: 'Conflict' });
    brandService.createBrand.mockReturnValue(throwError(() => errorResponse));

    component.onFormSubmit({ name: 'Test Brand', description: 'Test Description' });

    expect(component.message).toBe(errorResponse.message);
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe("warning");
    expect(component.srcImage).toBe("assets/images/Icon-warn.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });

  it('should handle unexpected error response', () => {
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    brandService.createBrand.mockReturnValue(throwError(() => errorResponse));

    component.onFormSubmit({ name: 'Test Brand', description: 'Test Description' });

    expect(component.message).toBe(errorResponse.message);
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe("error");
    expect(component.srcImage).toBe("assets/images/Icon-error.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });
});