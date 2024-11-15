import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartIconComponent } from './cart-icon.component';
import { EventEmitter } from '@angular/core';

describe('CartIconComponent', () => {
  let component: CartIconComponent;
  let fixture: ComponentFixture<CartIconComponent>;
  let openCartSpy: jest.Mock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartIconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CartIconComponent);
    component = fixture.componentInstance;

    openCartSpy = jest.fn();
    component.openCart = new EventEmitter<void>();
    component.openCart.subscribe(openCartSpy);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openCart event when onClick is called', () => {
    component.onClick();

    expect(openCartSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit openCart event if onClick is not called', () => {
    expect(openCartSpy).not.toHaveBeenCalled();
  });
});
