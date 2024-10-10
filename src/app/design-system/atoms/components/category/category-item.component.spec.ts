import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryItemComponent } from './category-item.component';
import { By } from '@angular/platform-browser';

describe('CategoryItemComponent', () => {
  let component: CategoryItemComponent;
  let fixture: ComponentFixture<CategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryItemComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render category name', () => {
    const mockCategory = { id: 1, name: 'Category 1', description: 'Description 1' };
    component.category = mockCategory;

    fixture.detectChanges();

    const categoryElement = fixture.debugElement.query(By.css('.category-item'));

    expect(categoryElement).toBeTruthy();
    const categoryNativeElement = categoryElement.nativeElement;
    expect(categoryNativeElement.textContent).toContain(mockCategory.name);
  });
});
