import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { BasicFormComponent } from './basic-form.component'; 

describe('BasicFormComponent', () => {
  let component: BasicFormComponent;
  let fixture: ComponentFixture<BasicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicFormComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit event when form is valid', () => {
    const emitSpy = jest.spyOn(component.formSubmit, 'emit');

    component.categoryName = 'Test Category';
    component.categoryDescription = 'Test Description';

    const form: NgForm = {
      valid: true,
      resetForm: jest.fn(),
      controls: {
        name: { markAsTouched: jest.fn() },
        description: { markAsTouched: jest.fn() },
      },
      submitted: false,
      _directives: [],
      form: { controls: {} },
      ngSubmit: null,
    } as any;

    component.onSubmit(form as NgForm);

    expect(emitSpy).toHaveBeenCalledWith({
      name: 'Test Category',
      description: 'Test Description'
    });
    expect(form.resetForm).toHaveBeenCalled();
    expect(component.categoryName).toBe('');
    expect(component.categoryDescription).toBe('');
  });

  it('should mark controls as touched if the form is invalid', () => {
    const form: NgForm = {
      valid: false,
      resetForm: jest.fn(),
      controls: {
        name: { markAsTouched: jest.fn() },
        description: { markAsTouched: jest.fn() },
      },
      submitted: false,
      _directives: [],
      form: { controls: {} },
      ngSubmit: null,
    } as any;

    component.onSubmit(form as NgForm);

    expect(form.controls['name'].markAsTouched).toHaveBeenCalled();
    expect(form.controls['description'].markAsTouched).toHaveBeenCalled();
  });

  describe('checkLength', () => {
    it('should set lengthNameError when categoryName exceeds 50 characters', () => {
      component.categoryName = 'A'.repeat(51);
      component.checkLength();
      expect(component.lengthNameError).toBe('Excede los 50 caracteres.');
    });

    it('should clear lengthNameError when categoryName is 50 characters or less', () => {
      component.categoryName = 'A'.repeat(50);
      component.checkLength();
      expect(component.lengthNameError).toBe('');
    });

    it('should set lengthDescriptionError when categoryDescription exceeds 120 characters for "brand"', () => {
      component.urlBack = 'brand/somepath';
      component.categoryDescription = 'A'.repeat(121);
      component.checkLength();
      expect(component.lengthDescriptionError).toBe('Excede los 120 caracteres.');
    });

    it('should set lengthDescriptionError when categoryDescription exceeds 90 characters', () => {
      component.urlBack = 'other/somepath';
      component.categoryDescription = 'A'.repeat(91);
      component.checkLength();
      expect(component.lengthDescriptionError).toBe('Excede los 90 caracteres.');
    });

    it('should clear lengthDescriptionError when categoryDescription is valid', () => {
      component.categoryDescription = 'A'.repeat(90);
      component.checkLength();
      expect(component.lengthDescriptionError).toBe('');
    });
  });
});
