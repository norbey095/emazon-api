import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemComponent } from './menu-item.component';
import { By } from '@angular/platform-browser';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the url input correctly', () => {
    component.url = 'https://example.com';
    fixture.detectChanges();
    expect(component.url).toBe('https://example.com');
  });

  it('should set the title input correctly', () => {
    component.title = 'Example Title';
    fixture.detectChanges();
    expect(component.title).toBe('Example Title');
  });

  it('should render the title in the template', () => {
    component.title = 'Example Title';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('a'));
    expect(titleElement.nativeElement.textContent).toContain('Example Title');
  });

  it('should render a link with the correct URL', () => {
    component.url = 'https://example.com';
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('a'));
    expect(linkElement.nativeElement.getAttribute('href')).toBe('https://example.com');
  });
});
