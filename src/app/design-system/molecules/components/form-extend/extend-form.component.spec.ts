import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ExtendFormComponent } from './extend-form.component'; 

describe('ExtendFormComponent', () => {
  let component: ExtendFormComponent;
  let fixture: ComponentFixture<ExtendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendFormComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit event when form is valid', () => {
    const emitSpy = jest.spyOn(component.formSubmit, 'emit');

    component.articleName = 'Test Category';
    component.quantity = 0;
    component.price = 0;
    component.brand = 0;

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
    expect(component.articleName).toBe('');
    expect(component.quantity).toBe(0);
    expect(component.price).toBe(0);
    expect(component.brand).toBe(0);
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

    expect( form.controls['name'].markAsTouched).toHaveBeenCalled();
    expect( form.controls['description'].markAsTouched).toHaveBeenCalled();
  });
});
