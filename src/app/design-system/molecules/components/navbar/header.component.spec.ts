import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './header.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should have menuOpen set to false initially', () => {
    expect(component.menuOpen).toBe(false);
  });

  it('should toggle menuOpen when toggleMenu is called', () => {
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);

    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });
});
