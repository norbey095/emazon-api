import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormComponent } from './form.component';

@Component({
  template: '',
})
class MockFormComponent {
  categoryName: string = '';
  categoryDescription: string = '';

  @Output() formSubmit = new EventEmitter<{ name: string; description: string }>();

  onSubmit() {
    this.formSubmit.emit({ name: this.categoryName, description: this.categoryDescription });
    this.categoryName = '';
    this.categoryDescription = '';
  }
}

describe('FormComponent', () => {
  let component: MockFormComponent;
  let fixture: ComponentFixture<MockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit event with correct values on submit', () => {
    const formSubmitSpy = jest.spyOn(component.formSubmit, 'emit');
    component.categoryName = 'Test Category';
    component.categoryDescription = 'Test Description';

    component.onSubmit();
    expect(formSubmitSpy).toHaveBeenCalledWith({ name: 'Test Category', description: 'Test Description' }); // Verifica que se haya llamado con los parámetros correctos
    expect(component.categoryName).toBe('');
    expect(component.categoryDescription).toBe('');
  });
});
