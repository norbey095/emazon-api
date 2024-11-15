import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "emazon"', () => {
    expect(component.title).toBe('emazon');
  });

  it('should initially show the cart icon and hide the cart', () => {
    expect(component.showCart).toBe(false);
    expect(component.showIcon).toBe(true);
  });

  it('should hide the cart icon and show the cart when openCart is called', () => {
    component.openCart();
    
    expect(component.showCart).toBe(true);
    expect(component.showIcon).toBe(false);
  });

  it('should show the cart icon and hide the cart when closeCart is called', () => {
    component.openCart();
    component.closeCart();
    
    expect(component.showCart).toBe(false);
    expect(component.showIcon).toBe(true);
  });
});
