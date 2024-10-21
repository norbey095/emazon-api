import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleModalComponent } from './article-modal.component';
import { ArticleList } from 'src/app/shared/types/article';

describe('ArticleModalComponent', () => {
    let component: ArticleModalComponent;
    let fixture: ComponentFixture<ArticleModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ArticleModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ArticleModalComponent);
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
        expect(component.isVisible).toBe(false);
    });

    it('should open modal and set article data', () => {
        const mockArticle: ArticleList = {
            id: 1,
            name: 'Article Name',
            price: 10000,
            quantity:1,
            description: 'Article Description',
            categories: [{ id: 1, name: 'Category 1', description: 'Description 1' }],
            brand: { id: 1, name: 'Brand 1', description: 'Brand Description' },
        };

        component.openModal(mockArticle);

        expect(component.name).toBe(mockArticle.name);
        expect(component.price).toBe(mockArticle.price);
        expect(component.description).toBe(mockArticle.description);
        expect(component.categories).toEqual(mockArticle.categories);
        expect(component.brand).toEqual(mockArticle.brand);
        expect(component.isVisible).toBe(true);
    });

    it('should close modal', () => {
        component.closeModal();
        expect(component.isVisible).toBe(false);
    });

    it('should return category names', () => {
        component.categories = [
            { id: 1, name: 'Category 1', description: 'Description 1' },
            { id: 2, name: 'Category 2', description: 'Description 2' },
        ];

        const categoryNames = component.getCategoryNames();
        expect(categoryNames).toBe('Category 1, Category 2');
    });

    it('should format price correctly', () => {
        const formattedPrice = component.formatPrice(10000);
        expect(formattedPrice).toBe('$10.000,00');
    });
});
