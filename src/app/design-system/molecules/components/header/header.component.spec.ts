import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';

@Component({
  template: '',
})
class MockHeaderComponent {
  navActive: boolean = false;

  toggleNav() {
    this.navActive = !this.navActive;
  }
}

describe('HeaderComponent', () => {
  let component: MockHeaderComponent;
  let fixture: ComponentFixture<MockHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle navActive when toggleNav is called', () => {
    expect(component.navActive).toBe(false);
    component.toggleNav();
    expect(component.navActive).toBe(true);
    component.toggleNav();
    expect(component.navActive).toBe(false);
  });
});
