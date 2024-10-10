import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputButtonComponent } from './input-button.component';

describe('InputButtonComponent', () => {
  let component: InputButtonComponent;
  let fixture: ComponentFixture<InputButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InputButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});