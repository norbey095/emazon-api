import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output,EventEmitter} from '@angular/core';

@Component({
  template: '',
})
class MockMenuItemComponent{
    @Input() url!: string;
    @Input() title!: string;
}

describe('MenuItemComponent', () => {
  let component: MockMenuItemComponent;
  let fixture: ComponentFixture<MockMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockMenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});