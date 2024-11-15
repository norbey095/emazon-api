import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { of, throwError } from 'rxjs';
import { CartDetailResponse } from 'src/app/shared/types/cart/cart';
import { EventEmitter } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: { getCart: jest.Mock };
  let closeSpy: jest.Mock;

  beforeEach(async () => {
    mockCartService = {
        getCart: jest.fn().mockReturnValue(of({ cartDetail: [], totalPrice: 0, totalItems: 0 })),
    };

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [NgxPaginationModule,HttpClientTestingModule],
      providers: [{ provide: CartService, useValue: mockCartService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

    closeSpy = jest.fn();
    component.close = new EventEmitter<void>();
    component.close.subscribe(closeSpy);

    component.page = 1;
    component.itemsPerPage = 2;
    component.descending = false;
    component.categoryName = 'test-category';
    component.brandName = 'test-brand';

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch carts on ngOnInit', () => {
    const mockResponse: CartDetailResponse = {
      totalPrice: 1000,
      cartDetail: [],
      totalItems: 0,
    };

    mockCartService.getCart.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(mockCartService.getCart).toHaveBeenCalledWith(
      component.page - 1,
      component.itemsPerPage,
      component.descending,
      component.categoryName,
      component.brandName
    );

    expect(component.totalPrices).toBe(mockResponse.totalPrice);
    expect(component.itemsCart).toEqual(mockResponse.cartDetail);
    expect(component.totalItems).toBe(mockResponse.totalItems);
  });

  it('should handle error when fetching carts', () => {
    const mockError = new Error('Error al cargar el carrito');
    mockCartService.getCart.mockReturnValue(throwError(() => mockError));

    const consoleSpy = jest.spyOn(console, 'error');

    component.fetchCarts();

    expect(consoleSpy).toHaveBeenCalledWith('Error al cargar el carrito', mockError);
  });

  it('should toggle filters visibility and fetch carts', () => {
    const mockResponse: CartDetailResponse = {
      totalPrice: 1000,
      cartDetail: [],
      totalItems: 0,
    };
    mockCartService.getCart.mockReturnValue(of(mockResponse));

    component.toggleFilters();

    expect(component.filtersVisible).toBe(true);
    expect(mockCartService.getCart).toHaveBeenCalled();
  });

  it('should emit close event when onClose is called', () => {
    component.onClose();

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should update pagination settings when onControlsChange is called', () => {
    const event = { itemsPerPage: 5, descending: true, page: 2 };

    component.onControlsChange(event);

    expect(component.itemsPerPage).toBe(5);
    expect(component.descending).toBe(true);
    expect(component.page).toBe(2);

    expect(mockCartService.getCart).toHaveBeenCalled();
  });

  it('should format price correctly using formatPrice method', () => {
    const price = 1500;

    const formattedPrice = component.formatPrice(price);

    expect(formattedPrice).toBe('$1.500,00');
  });
});
