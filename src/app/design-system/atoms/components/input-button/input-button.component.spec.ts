import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output,EventEmitter} from '@angular/core';

@Component({
  template: '',
})
class MockInputButtonComponent{
    @Input() value!: string;
}

describe('InputButtonComponent', () => {
  let component: MockInputButtonComponent;
  let fixture: ComponentFixture<MockInputButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockInputButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockInputButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});