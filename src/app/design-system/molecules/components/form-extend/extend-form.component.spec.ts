import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExtendFormComponent } from './extend-form.component';
import { EventEmitter } from '@angular/core';

describe('ExtendFormComponent', () => {
  let component: ExtendFormComponent;
  let fixture: ComponentFixture<ExtendFormComponent>;
  let router: Router;

  beforeEach(() => {
    const routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ExtendFormComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component with default values', () => {
    expect(component.articleName).toBe('');
    expect(component.quantity).toBe(0);
    expect(component.price).toBe(0);
    expect(component.selectedBrandChange).toBe(0);
    expect(component.description).toBe('');
    expect(component.selectedCategories).toEqual([]);
  });

  it('should emit formSubmit event when form is valid', () => {
    const form = { valid: true, resetForm: jest.fn() } as any;

    const selectedBrandMock = {
      reset: jest.fn(),
    };
    const multiComboBoxMock = {
      reset: jest.fn(),
    };

    component.selectedBrand = selectedBrandMock as any;
    component.multiComboBox = multiComboBoxMock as any;
    component.articleName = 'Test Article';
    component.quantity = 10;
    component.price = 100;
    component.selectedBrandChange = 1;
    component.description = 'Test Description';
    component.selectedCategories = [1, 2];

    const emitSpy = jest.spyOn(component.formSubmit, 'emit');

    component.onSubmit(form);

    expect(emitSpy).toHaveBeenCalledWith({
      article: {
        id: 0,
        name: 'Test Article',
        description: 'Test Description',
        quantity: 10,
        price: 100,
        idbrand: 1,
        categories: [1, 2],
      },
    });
    expect(form.resetForm).toHaveBeenCalled();
    expect(selectedBrandMock.reset).toHaveBeenCalled();
    expect(multiComboBoxMock.reset).toHaveBeenCalled();
    expect(component.articleName).toBe('');
    expect(component.quantity).toBe(0);
    expect(component.price).toBe(0);
    expect(component.selectedBrandChange).toBe(0);
    expect(component.description).toBe('');
    expect(component.selectedCategories).toEqual([]);
  });

  it('should mark fields as touched when form is invalid', () => {
    const form = {
      valid: false,
      controls: {
        name: { markAsTouched: jest.fn() },
        quantity: { markAsTouched: jest.fn() },
        price: { markAsTouched: jest.fn() },
        description: { markAsTouched: jest.fn() },
      },
    } as any;

    component.onSubmit(form);

    expect(form.controls.name.markAsTouched).toHaveBeenCalled();
    expect(form.controls.quantity.markAsTouched).toHaveBeenCalled();
    expect(form.controls.price.markAsTouched).toHaveBeenCalled();
    expect(form.controls.description.markAsTouched).toHaveBeenCalled();
  });
});
