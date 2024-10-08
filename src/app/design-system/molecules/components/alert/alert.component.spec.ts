import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';

@Component({
  template: '',
})
class MockAlertComponent {
  @Input() message!: string;
  isVisible = true;

  closeAlert() {
    this.isVisible = false;
  }
}

describe('AlertComponent', () => {
  let component: MockAlertComponent;
  let fixture: ComponentFixture<MockAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockAlertComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the alert when closeAlert is called', () => {
    component.closeAlert();
    fixture.detectChanges();
    
    expect(component.isVisible).toBe(false);
    
    const alertElement = fixture.debugElement.query(By.css('.alert'));
    expect(alertElement).toBeFalsy();
  });
});
