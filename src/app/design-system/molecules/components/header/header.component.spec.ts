import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Header component', () => {
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

  it('should logout and navigate to articles when logout is called', () => {
    localStorage.setItem('token', 'mockToken');
    localStorage.setItem('ROLE', 'ROLE_ADMIN');

    component.logout();

    expect(component.isAuthenticate).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('ROLE')).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });
});
