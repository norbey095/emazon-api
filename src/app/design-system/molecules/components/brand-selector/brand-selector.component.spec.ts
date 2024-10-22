import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandSelectorComponent } from './brand-selector.component';
import { BrandService } from 'src/app/shared/services/stop/brand/brand.service';
import { of, throwError } from 'rxjs';
import { PaginationDto } from 'src/app/shared/types/stop/paginationDto';
import { Brand } from 'src/app/shared/types/stop/brand';

describe('BrandSelectorComponent', () => {
    let component: BrandSelectorComponent;
    let fixture: ComponentFixture<BrandSelectorComponent>;
    let mockBrandService: jest.Mocked<BrandService>;

    
    const mockBrands: Brand[] = [
    { id: 1, name: 'Brand A', description:'brand a'},
    { id: 2, name: 'Brand B', description:'brand b'},
    ];

    const mockPaginationResponse: PaginationDto<Brand> = {
        contentList: mockBrands,
        totalElement: 2,
    };

    beforeEach(async () => {
        mockBrandService = {
            getAllBrand: jest.fn(),
        } as unknown as jest.Mocked<BrandService>;

        await TestBed.configureTestingModule({
            declarations: [BrandSelectorComponent],
            providers: [
                { provide: BrandService, useValue: mockBrandService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BrandSelectorComponent);
        component = fixture.componentInstance;
        mockBrandService.getAllBrand.mockReturnValue(of(mockPaginationResponse));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize brands on ngOnInit', () => {
        expect(component.brands).toEqual(mockBrands);
        expect(component.filteredBrands).toEqual(mockBrands);
        expect(component.totalElemnts).toBe(2);
    });

    it('should toggle dropdown state', () => {
        expect(component.dropdownOpen).toBe(false);
        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(true);
        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(false);
    });

    it('should select a brand and emit selectedBrandChange', () => {
        jest.spyOn(component.selectedBrandChange, 'emit');
        component.onBrandSelect(1);
        expect(component.selectedBrand).toBe(1);
        expect(component.selectedBrandChange.emit).toHaveBeenCalledWith(1);
        expect(component.dropdownOpen).toBe(false);
    });

    it('should return the correct selected brand name', () => {
        component.selectedBrand = 1;
        const brandName = component.getSelectedBrandName();
        expect(brandName).toBe('Brand A');
    });

    it('should filter brands based on search query', () => {
        component.searchQuery = 'brand a';
        component.filterBrands();
        expect(component.filteredBrands).toEqual([mockBrands[0]]);
        
        component.searchQuery = '';
        component.filterBrands();
        expect(component.filteredBrands).toEqual(mockBrands);
    });

    it('should handle error when fetching brands', () => {
        mockBrandService.getAllBrand.mockReturnValue(throwError(() => new Error('Error')));
        
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        
        component.getSingleBrand(0, 1);
        
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar las Marcas', expect.any(Error));
        
        consoleErrorSpy.mockRestore(); // Limpiar el espía después
    });
});
