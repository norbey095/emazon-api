import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar.component';

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
    expect(component.isMenuOpen).toBe(false); // Al inicio, el menú debe estar cerrado
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true); // Al llamar a toggleMenu, el menú debe abrirse
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false); // Al llamar a toggleMenu nuevamente, el menú debe cerrarse
  });
});
