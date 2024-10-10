import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: '',
})
class MockNavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

describe('NavbarComponent', () => {
  let component: MockNavbarComponent;
  let fixture: ComponentFixture<MockNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockNavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu visibility', () => {
    expect(component.isMenuOpen).toBe(false);
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false);
  });
});
