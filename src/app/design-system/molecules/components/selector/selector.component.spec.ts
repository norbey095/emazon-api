import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectorComponent } from './selector.component';
import { BrandService } from 'src/app/shared/services/stock/brand/brand.service';
import { Observable, of } from 'rxjs';
import { PaginationDto } from 'src/app/shared/types/stop/paginationDto';
import { Brand } from 'src/app/shared/types/stop/brand';
import { ArticleService } from 'src/app/shared/services/stock/article/article.service';
import { ArticleList } from 'src/app/shared/types/stop/article';

describe('BrandSelectorComponent', () => {
    let component: SelectorComponent;
    let fixture: ComponentFixture<SelectorComponent>;
    let mockBrandService: jest.Mocked<BrandService>;
    let mockArticleService: jest.Mocked<ArticleService>;

    const mockBrands: Brand[] = [
        { id: 1, name: 'Brand A', description: 'brand a' },
        { id: 2, name: 'Brand B', description: 'brand b' },
    ];

    const mockArticles: ArticleList[] = [
        { id: 1, name: 'Article A', description: 'Description A', quantity: 10, price: 100, brand: { id: 1, name: '', description: '' }, categories: [] },
        { id: 2, name: 'Article B', description: 'Description B', quantity: 20, price: 200, brand: { id: 1, name: '', description: '' }, categories: [] },
    ];

    const mockPaginationResponse: PaginationDto<Brand> = {
        contentList: mockBrands,
        totalElement: 2,
    };

    const mockPaginationResponseArticle: PaginationDto<ArticleList> = {
        contentList: mockArticles,
        totalElement: 2,
    };

    beforeEach(async () => {
        mockBrandService = {
            getAllBrand: jest.fn(),
        } as unknown as jest.Mocked<BrandService>;

        mockArticleService = {
            getAllArticles: jest.fn(),
        } as unknown as jest.Mocked<ArticleService>;

        await TestBed.configureTestingModule({
            declarations: [SelectorComponent],
            providers: [
                { provide: BrandService, useValue: mockBrandService },
                { provide: ArticleService, useValue: mockArticleService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectorComponent);
        component = fixture.componentInstance;
        mockBrandService.getAllBrand.mockReturnValue(of(mockPaginationResponse));
        mockArticleService.getAllArticles.mockReturnValue(of(mockPaginationResponseArticle));
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize items brand on ngOnInit', () => {
        component.isBrand = true;
        expect(component.items).toEqual(mockBrands);
        expect(component.filteredItems).toEqual(mockBrands);
        expect(component.totalElemnts).toBe(2);
    });

    it('should initialize items article on ngOnInit when isBrand is false', () => {
        component.isBrand = false;
        mockBrandService.getAllBrand.mockReturnValue(of(mockPaginationResponse));
        component.ngOnInit();
        expect(component.items).toEqual(mockArticles);
        expect(component.filteredItems).toEqual(mockArticles);
        expect(component.totalElemnts).toBe(2);
    });

    it('should toggle dropdown state', () => {
        expect(component.dropdownOpen).toBe(false);
        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(true);
        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(false);
    });

    it('should select an item and emit selectedItemChange', () => {
        jest.spyOn(component.selectedItemChange, 'emit');
        component.onItemSelect(1);
        expect(component.selectedItem).toBe(1);
        expect(component.selectedItemChange.emit).toHaveBeenCalledWith(1);
        expect(component.dropdownOpen).toBe(false);
    });

    it('should return the correct selected item name', () => {
        component.selectedItem = 1;
        const brandName = component.getSelectedItemName();
        expect(brandName).toBe('Brand A');
    });

    it('should filter items based on search query', () => {
        component.searchQuery = 'brand a';
        component.filterItems();
        expect(component.filteredItems).toEqual([mockBrands[0]]);
        
        component.searchQuery = '';
        component.filterItems();
        expect(component.filteredItems).toEqual(mockBrands);
    });

    it('should filter items article based on search query', () => {
        component.isBrand = false;
        component.items = mockArticles;
        component.searchQuery = 'Article A';
        component.filterItems(); 
    
        expect(component.filteredItems).toEqual([mockArticles[0]]);
    
        component.searchQuery = ''; 
        component.filterItems();
        expect(component.filteredItems).toEqual(mockArticles);
    });
    

    it('should handle error when loading brands', () => {
        mockBrandService.getAllBrand.mockReturnValue(
            of({ contentList: [], totalElement: 0 })
        );
    
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
        component.getBrand(0, 1, true);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    
        mockBrandService.getAllBrand.mockReturnValueOnce(
            new Observable((subscriber) => {
                subscriber.error('Error');
            })
        );
    
        component.getBrand(0, 1, true);    
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar las Marcas', 'Error');
    });  
});