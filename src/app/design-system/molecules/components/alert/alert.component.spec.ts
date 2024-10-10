import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { By } from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the alert message', () => {
    component.message = 'This is a test alert';
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.message'));
    expect(messageElement.nativeElement.textContent).toContain('This is a test alert');
  });

  it('should have the correct line color', () => {
    component.lineColor = '#FF0000'; 
    fixture.detectChanges();

    const lineElement = fixture.debugElement.query(By.css('.line'));
    expect(lineElement.nativeElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should have the correct text color', () => {
    component.textColor = 'blue';
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css('.alert'));
    expect(alertElement.nativeElement.style.color).toBe('blue');
  });

  it('should close the alert after 4 seconds', (done) => {
    component.ngOnInit();
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.isVisible).toBe(false);
      done();
    }, 4000);
  });

  it('should close the alert when close button is clicked', () => {
    component.message = 'This is a test alert';
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.close-btn'));
    closeButton.triggerEventHandler('click', null);

    expect(component.isVisible).toBe(false);
  });
});
