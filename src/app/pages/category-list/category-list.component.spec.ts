import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import { CategoryService } from 'src/app/shared/services/category.service';
import { of, throwError } from 'rxjs';
import { PaginationDto } from 'src/app/shared/types/paginationDto';
import { Category } from 'src/app/shared/types/category';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoryService: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    categoryService = {
      getAllCategories: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      providers: [
        { provide: CategoryService, useValue: categoryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toBe('Lista de Categorías');
    expect(component.categories).toEqual([]);
    expect(component.totalItems).toBe(0);
    expect(component.itemsPerPage).toBe(5);
    expect(component.page).toBe(1);
    expect(component.descending).toBe(false);
  });

  it('should fetch categories on initialization', () => {
    const mockResponse: PaginationDto<Category> = {
      contentList: [{ id: 1, name: 'Category 1', description: 'Description 1' }],
      totalElement: 1,
    };

    categoryService.getAllCategories.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(categoryService.getAllCategories).toHaveBeenCalledWith(0, 5, false);
    expect(component.categories).toEqual(mockResponse.contentList);
    expect(component.totalItems).toBe(mockResponse.totalElement);
  });

  it('should handle error when fetching categories', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    categoryService.getAllCategories.mockReturnValue(throwError('Error'));

    component.fetchCategories();

    expect(consoleSpy).toHaveBeenCalledWith('Error al cargar las categorías', 'Error');
    consoleSpy.mockRestore();
  });

  it('should fetch categories when controls change', () => {
    const mockResponse: PaginationDto<Category> = {
        contentList: [{ id: 1, name: 'Category 1', description: 'Description 1' }],
        totalElement: 1,
    };
    categoryService.getAllCategories.mockReturnValue(of(mockResponse));

    component.orderBy = 'DES';
    component.onControlsChange();

    expect(component.descending).toBe(true);
    expect(component.page).toBe(1);
    expect(categoryService.getAllCategories).toHaveBeenCalledWith(0, 5, true);
    expect(component.categories).toEqual(mockResponse.contentList);
    expect(component.totalItems).toBe(mockResponse.totalElement); 
    });
});
