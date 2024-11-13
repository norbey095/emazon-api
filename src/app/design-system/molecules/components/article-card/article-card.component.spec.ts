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
        jest.spyOn(component.formSubmit, 'emit');
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

    it('should emit openModal event', () => {
        jest.spyOn(component.openModal, 'emit');
        component.handleCardClick();

        expect(component.openModal.emit).toHaveBeenCalledWith({
            id: component.id,
            name: component.name,
            price: component.price,
            description: component.description,
            categories: component.categories,
            brand: component.brand,
            quantity: component.quantity,
        });
    });

    it('should format price correctly', () => {
        const formattedPrice = component.formatPrice(10000);
        expect(formattedPrice).toBe("$10.000,00");
    });

    it('should emit formSubmit event with correct values when addToCart is called', () => {
        component.id = 5;
        component.quantity = 3;
      
        component.addToCart();
      
        expect(component.formSubmit.emit).toHaveBeenCalledWith({
          idArticle: 5,
          quantity: 3
        });
    });
      
});