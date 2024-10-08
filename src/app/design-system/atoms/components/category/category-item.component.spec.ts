import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

@Component({
  template: '',
})
class MockCategoryItemComponent {
  @Input() category!: { id: number; name: string; description: string };
}

describe('CategoryItemComponent', () => {
  let component: MockCategoryItemComponent;
  let fixture: ComponentFixture<MockCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockCategoryItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
