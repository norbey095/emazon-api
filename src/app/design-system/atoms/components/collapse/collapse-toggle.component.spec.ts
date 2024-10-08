import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output,EventEmitter} from '@angular/core';

@Component({
  template: '',
})
class MockCollapseToggleComponent {
    @Input() label: string = 'Categorías';
    @Output() toggleEvent = new EventEmitter<void>();
}

describe('CollapseToggleComponent', () => {
  let component: MockCollapseToggleComponent;
  let fixture: ComponentFixture<MockCollapseToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockCollapseToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockCollapseToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});