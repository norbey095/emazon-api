import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCategoryComponent } from './create-category.component';
import { CategoryService } from 'src/app/shared/services/category.service';
import { of, throwError } from 'rxjs';
import { ResponseSuccess } from 'src/app/shared/types/response-success';
import { HttpErrorResponse } from '@angular/common/http';

jest.useFakeTimers();

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryService: { createCategories: jest.Mock };

  beforeEach(async () => {
    categoryService = {
      createCategories: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and show success message', () => {
    const mockResponse: ResponseSuccess = { status: "success", messages: "Categoría creada correctamente" };
    (categoryService.createCategories as jest.Mock).mockReturnValue(of(mockResponse));

    component.onFormSubmit({ name: 'Test Category', description: 'Test Description' });

    expect(component.message).toBe("Categoría creada correctamente");
    expect(component.isMessagess).toBe(true);
    expect(component.lineColor).toBe("#00B998");
    expect(component.textColor).toBe("#00B998");
    expect(component.srcImage).toBe("assets/images/Icon-success.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });

  it('should handle error response and show error message', () => {
    const errorResponse = new HttpErrorResponse({ status: 409, statusText: 'Conflict' });
    categoryService.createCategories.mockReturnValue(throwError(() => errorResponse));

    component.onFormSubmit({ name: 'Test Category', description: 'Test Description' });

    expect(component.message).toBe(errorResponse.message);
    expect(component.isMessagess).toBe(true);
    expect(component.lineColor).toBe("#FF9500");
    expect(component.textColor).toBe("#FF9500");
    expect(component.srcImage).toBe("assets/images/Icon-warn.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });

  it('should handle unexpected error response', () => {
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    categoryService.createCategories.mockReturnValue(throwError(() => errorResponse));

    component.onFormSubmit({ name: 'Test Category', description: 'Test Description' });

    expect(component.message).toBe(errorResponse.message);
    expect(component.isMessagess).toBe(true);
    expect(component.lineColor).toBe("#D51A52");
    expect(component.textColor).toBe("#D51A52");
    expect(component.srcImage).toBe("assets/images/Icon-error.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });
});