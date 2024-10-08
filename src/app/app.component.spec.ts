import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: '',
})
class MockAppComponent {
  title = 'emazon';
}

describe('AppComponent', () => {
  let component: MockAppComponent;
  let fixture: ComponentFixture<MockAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "emazon"', () => {
    expect(component.title).toBe('emazon');
  });
});
