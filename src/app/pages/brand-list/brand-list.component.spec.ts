import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandListComponent } from './brand-list.component';
import { BrandService } from 'src/app/shared/services/brand/brand.service';
import { of, throwError } from 'rxjs';
import { PaginationDto } from 'src/app/shared/types/paginationDto';
import { Brand } from 'src/app/shared/types/brand';

describe('BrandListComponent', () => {
  let component: BrandListComponent;
  let fixture: ComponentFixture<BrandListComponent>;
  let brandService: jest.Mocked<BrandService>;

  beforeEach(async () => {
    brandService = {
      getAllBrand: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [BrandListComponent],
      providers: [
        { provide: BrandService, useValue: brandService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toBe('Lista de Marcas');
    expect(component.brands).toEqual([]);
    expect(component.totalItems).toBe(0);
    expect(component.itemsPerPage).toBe(8);
    expect(component.page).toBe(1);
    expect(component.descending).toBe(false);
  });

  it('should fetch brands on initialization', () => {
    const mockResponse: PaginationDto<Brand> = {
      contentList: [{ id: 1, name: 'Brand 1', description: 'Description 1' }],
      totalElement: 1,
    };

    brandService.getAllBrand.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(brandService.getAllBrand).toHaveBeenCalledWith(0, 8, false);
    expect(component.brands).toEqual(mockResponse.contentList);
    expect(component.totalItems).toBe(mockResponse.totalElement);
  });

  it('should handle error when fetching brands', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    brandService.getAllBrand.mockReturnValue(throwError('Error'));

    component.fetchBrands();

    expect(consoleSpy).toHaveBeenCalledWith('Error al cargar las Marcas', 'Error');
    consoleSpy.mockRestore();
  });
  
  it('should call fetchBrands when onControlsChange is triggered', () => {
    const mockResponse: PaginationDto<Brand> = {
      contentList: [{ id: 1, name: 'Brand 1', description: 'Description 1' }],
      totalElement: 1,
    };

    brandService.getAllBrand.mockReturnValue(of(mockResponse));

    const event = { itemsPerPage: 10, descending: true, page: 2 };
    component.onControlsChange(event);

    expect(component.itemsPerPage).toBe(10);
    expect(component.descending).toBe(true);
    expect(component.page).toBe(2);
    expect(brandService.getAllBrand).toHaveBeenCalledWith(1, 10, true);
    expect(component.brands).toEqual(mockResponse.contentList);
    expect(component.totalItems).toBe(mockResponse.totalElement);
  });

  it('should not throw an error when no brands are returned', () => {
    const mockResponse: PaginationDto<Brand> = {
      contentList: [],
      totalElement: 0,
    };

    brandService.getAllBrand.mockReturnValue(of(mockResponse));
    
    component.ngOnInit();

    expect(component.brands).toEqual([]);
    expect(component.totalItems).toBe(0);
  });

  it('should handle error in onControlsChange gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    brandService.getAllBrand.mockReturnValue(throwError('Error'));

    const event = { itemsPerPage: 10, descending: true, page: 2 };
    component.onControlsChange(event);

    expect(consoleSpy).toHaveBeenCalledWith('Error al cargar las Marcas', 'Error');
    consoleSpy.mockRestore();
  });
});
