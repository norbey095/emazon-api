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
    component.status = 'success';
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.message'));
    expect(messageElement.nativeElement.textContent).toContain('This is a test alert');
  });

  it('should set the correct line color for success', () => {
    component.status = 'success';
    component.ngOnInit();
    fixture.detectChanges();

    const lineElement = fixture.debugElement.query(By.css('.line'));
    expect(lineElement.nativeElement.classList).toContain('line-sucess');
  });

  it('should set the correct line color for warning', () => {
    component.status = 'warning';
    component.ngOnInit();
    fixture.detectChanges();

    const lineElement = fixture.debugElement.query(By.css('.line'));
    expect(lineElement.nativeElement.classList).toContain('line-warn');
  });

  it('should set the correct line color for error', () => {
    component.status = 'error';
    component.ngOnInit();
    fixture.detectChanges();

    const lineElement = fixture.debugElement.query(By.css('.line'));
    expect(lineElement.nativeElement.classList).toContain('line-error');
  });

  it('should have the correct text color based on status', () => {
    component.status = 'warning';
    component.ngOnInit();
    fixture.detectChanges();

    const alertElement = fixture.debugElement.query(By.css('.alert'));
    expect(alertElement.nativeElement.classList).toContain('text-warn');

    component.status = 'error';
    component.ngOnInit();
    fixture.detectChanges();

    expect(alertElement.nativeElement.classList).toContain('text-error');

    component.status = 'success';
    component.ngOnInit();
    fixture.detectChanges();

    expect(alertElement.nativeElement.classList).toContain('text-sucess');
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
