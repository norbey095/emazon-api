import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputComponent } from './input.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  template: `<app-input [(ngModel)]="inputValue"></app-input>`
})
class TestHostComponent {
  inputValue = '';
}

describe('inputComponent', () => {
  let component: inputComponent;
  let fixture: ComponentFixture<inputComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [inputComponent, TestHostComponent],
      imports: [FormsModule]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    fixture = TestBed.createComponent(inputComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should write value to the input', () => {
    component.writeValue('test value');
    expect(component.value).toBe('test value');
  });

  it('should bind value with ngModel', () => {
    hostFixture.detectChanges();
    const inputElement = hostFixture.nativeElement.querySelector('input');

    inputElement.value = 'Hello World';
    inputElement.dispatchEvent(new Event('input'));

    hostFixture.detectChanges();
    
    expect(hostFixture.componentInstance.inputValue).toBe('Hello World');
  });

  it('should support textarea when isTextArea is true', () => {
    component.isTextArea = true;
    fixture.detectChanges();
    const textAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textAreaElement).toBeTruthy();
  });

  it('should support input when isTextArea is false', () => {
    component.isTextArea = false;
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
  });
});