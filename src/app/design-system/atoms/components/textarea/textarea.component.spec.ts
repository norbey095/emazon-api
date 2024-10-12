import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  template: `<app-textarea [(ngModel)]="textareaValue"></app-textarea>`
})
class TestHostComponent {
    textareaValue = '';
}

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaComponent, TestHostComponent],
      imports: [FormsModule]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should write value to the textarea', () => {
    component.writeValue('test value');
    expect(component.value).toBe('test value');
  });
});