import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input} from '@angular/core';

@Component({
  template: '',
})
class MockHeroComponent {
    @Input() title!: string;
}

describe('HeroComponent', () => {
  let component: MockHeroComponent;
  let fixture: ComponentFixture<MockHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});