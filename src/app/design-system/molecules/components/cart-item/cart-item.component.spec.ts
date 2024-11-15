import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from './cart-item.component';
import { EventEmitter } from '@angular/core';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let removeSpy: jest.Mock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;

    removeSpy = jest.fn();
    component.remove = new EventEmitter<number>();
    component.remove.subscribe(removeSpy);

    component.idArticle = 1;
    component.name = 'Artículo de prueba';
    component.available = 10;
    component.quantity = 2;
    component.price = 10000;
    component.subPrice = 20000;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit remove event when onRemove is called', () => {
    component.onRemove();

    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(component.idArticle);
  });

  it('should format the price correctly using formatPrice method', () => {
    const formattedPrice = component.formatPrice(component.price);

    expect(formattedPrice).toBe('$10.000,00');
  });

  it('should handle undefined message input gracefully', () => {
    expect(component.message).toBeUndefined();
  });

  it('should handle non-default inputs correctly', () => {
    expect(component.idArticle).toBe(1);
    expect(component.name).toBe('Artículo de prueba');
    expect(component.available).toBe(10);
    expect(component.quantity).toBe(2);
    expect(component.price).toBe(10000);
    expect(component.subPrice).toBe(20000);
  });
});
