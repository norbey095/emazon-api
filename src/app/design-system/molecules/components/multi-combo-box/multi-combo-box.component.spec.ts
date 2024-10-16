import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiComboBoxComponent } from './multi-combo-box.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { of, throwError } from 'rxjs';
import { PaginationDto } from 'src/app/shared/types/paginationDto';
import { Category } from 'src/app/shared/types/category';

describe('MultiComboBoxComponent', () => {
    let component: MultiComboBoxComponent;
    let fixture: ComponentFixture<MultiComboBoxComponent>;
    let mockCategoryService: jest.Mocked<CategoryService>;

    const mockCategories: Category[] = [
        { id: 1, name: 'Category A', description:'category a'},
        { id: 2, name: 'Category B', description:'category b'},
    ];
    const mockPaginationResponse: PaginationDto<Category> = {
        contentList: mockCategories,
        totalElement: 2,
    };

    beforeEach(async () => {
        mockCategoryService = {
            getAllCategories: jest.fn(),
        } as unknown as jest.Mocked<CategoryService>;

        await TestBed.configureTestingModule({
            declarations: [MultiComboBoxComponent],
            providers: [
                { provide: CategoryService, useValue: mockCategoryService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiComboBoxComponent);
        component = fixture.componentInstance;
        mockCategoryService.getAllCategories.mockReturnValue(of(mockPaginationResponse));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load categories on ngOnInit', () => {
        expect(component.categories).toEqual(mockCategories);
        expect(component.filteredCategories).toEqual(mockCategories);
    });

    it('should toggle dropdown state', () => {
        expect(component.dropdownOpen).toBe(false);
        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(true);
        component.toggleDropdown();
        expect(component.dropdownOpen).toBe(false);
    });

    it('should select a category and emit selectedCategoriesChange', () => {
        jest.spyOn(component.selectedCategoriesChange, 'emit');
        
        component.toggleCategorySelection(1);
        expect(component.selectedCategories).toEqual([1]);
        expect(component.selectedCategoriesChange.emit).toHaveBeenCalledWith([1]);

        component.toggleCategorySelection(1);
        expect(component.selectedCategories).toEqual([]);
        expect(component.selectedCategoriesChange.emit).toHaveBeenCalledWith([]);
    });

    it('should check if a category is selected', () => {
        component.selectedCategories = [1];
        expect(component.isSelected(1)).toBe(true);
        expect(component.isSelected(2)).toBe(false);
    });

    it('should return the selected category names', () => {
        component.selectedCategories = [1];
        const categoryNames = component.getSelectedCategoryNames();
        expect(categoryNames).toBe('Category A');
        
        component.selectedCategories = [1, 2];
        expect(component.getSelectedCategoryNames()).toBe('Category A, Category B');
    });

    it('should filter categories based on search query', () => {
        component.searchQuery = 'category a';
        component.filterCategories();
        expect(component.filteredCategories).toEqual([mockCategories[0]]);
        
        component.searchQuery = '';
        component.filterCategories();
        expect(component.filteredCategories).toEqual(mockCategories);
    });

    it('should handle error when loading categories', () => {
        mockCategoryService.getAllCategories.mockReturnValue(throwError(() => new Error('Error loading categories')));
        
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        
        component.getCategories(0, 10, false);
        
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar las Categorías', expect.any(Error));
        
        consoleErrorSpy.mockRestore(); // Limpiar el espía después
    });
});
