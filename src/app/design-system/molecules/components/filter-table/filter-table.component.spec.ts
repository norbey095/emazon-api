import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterTableComponent } from './filter-table.component';

describe('FilterTableComponent', () => {
  let component: FilterTableComponent;
  let fixture: ComponentFixture<FilterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterTableComponent);
    component = fixture.componentInstance;
  });

  it('should emit controlsChange with correct values on onControlsChange call', () => {
    component.filterbys = false;
    component.itemsPerPage = 8;
    const expectedOutput = {
      itemsPerPage: 8,
      descending: false,
      page: 1,
      filterBy: 'article'
    };
    
    jest.spyOn(component.controlsChange, 'emit');

    component.onControlsChange();

    expect(component.controlsChange.emit).toHaveBeenCalledWith(expectedOutput);
  });

  it('should set descending to true when orderBy is DES', () => {
    component.orderBy = 'DES';
    component.onControlsChange();
    expect(component.descending).toBe(true);
  });

  it('should set descending to false when orderBy is ASC', () => {
    component.orderBy = 'ASC';
    component.onControlsChange();
    expect(component.descending).toBe(false);
  });

  it('should set filterByChanges to brand', () => {
    component.filterBy = 'Marca';
    component.getFilterBy();
    expect(component.filterByChanges).toBe('brand');
  });

  it('should set filterByChanges to category', () => {
    component.filterBy = 'Categoría';
    component.getFilterBy();
    expect(component.filterByChanges).toBe('category');
  });

  it('should set filterByChanges to article', () => {
    component.filterBy = 'Artículo';
    component.getFilterBy();
    expect(component.filterByChanges).toBe('article');
  });
});