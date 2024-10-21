import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCardComponent } from './article-card.component';

describe('ArticleCardComponent', () => {
    let component: ArticleCardComponent;
    let fixture: ComponentFixture<ArticleCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ArticleCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ArticleCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
        expect(component.id).toBe(0);
        expect(component.name).toBe('');
        expect(component.price).toBe(0);
        expect(component.description).toBe('');
        expect(component.categories).toEqual([]);
        expect(component.brand).toEqual({ id: 0, name: '', description: '' });
        expect(component.quantity).toBe(1);
    });

    it('should increase quantity', () => {
        component.increaseQuantity();
        expect(component.quantity).toBe(2);
    });

    it('should decrease quantity', () => {
        component.increaseQuantity();
        component.decreaseQuantity();
        expect(component.quantity).toBe(1);
    });

    it('should not decrease quantity', () => {
        component.decreaseQuantity();
        expect(component.quantity).toBe(1);
    });

    it('should alert with adding to cart', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        component.addToCart();
        expect(window.alert).toHaveBeenCalledWith('Agregaste 1 al carrito');
    });

    it('should emit openModal event', () => {
        jest.spyOn(component.openModal, 'emit');
        component.handleCardClick();

        expect(component.openModal.emit).toHaveBeenCalledWith({
            name: component.name,
            price: component.price,
            description: component.description,
            categories: component.categories,
            brand: component.brand,
        });
    });

    it('should format price correctly', () => {
        const formattedPrice = component.formatPrice(10000);
        expect(formattedPrice).toBe("$10.000,00");
    });
});
