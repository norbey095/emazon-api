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
    const expectedOutput = {
      itemsPerPage: 5,
      descending: false,
      page: 1
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
});
