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

        component.items = [
            { name: 'item1', description: 'description1' },
            { name: 'item2', description: 'description2' },
            { name: 'item3', description: 'description3' },
        ];

        expect(component.totalItems).toBe(100);
        expect(component.itemsPerPage).toBe(10);
        expect(component.page).toBe(1);
        expect(component.items).toEqual([
            { name: 'item1', description: 'description1' },
            { name: 'item2', description: 'description2' },
            { name: 'item3', description: 'description3' },
        ]);
    });
});