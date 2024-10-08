import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output,EventEmitter} from '@angular/core';

@Component({
  template: '',
})
class MockinputComponent{
    @Input() type!: string;
    @Input() id!: string;
    @Input() name!: string;
    @Input() placeholder!: string;
}

describe('inputComponent', () => {
  let component: MockinputComponent;
  let fixture: ComponentFixture<MockinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockinputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});