import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TableComponent],
        imports: [NgxPaginationModule],
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(TableComponent);
      component = fixture.componentInstance;
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should have default input values', () => {
      expect(component.totalItems).toBeUndefined();
      expect(component.itemsPerPage).toBeUndefined();
      expect(component.page).toBeUndefined();
      expect(component.items).toEqual([]);
    });
  
    it('should accept input values', () => {
      component.totalItems = 100;
      component.itemsPerPage = 10;
      component.page = 1;
      component.items = ['item1', 'item2', 'item3'];
  
      expect(component.totalItems).toBe(100);
      expect(component.itemsPerPage).toBe(10);
      expect(component.page).toBe(1);
      expect(component.items).toEqual(['item1', 'item2', 'item3']);
    });
 });
