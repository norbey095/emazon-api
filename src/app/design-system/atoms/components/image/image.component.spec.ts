import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input} from '@angular/core';

@Component({
  template: '',
})
class MockImageComponent{
    @Input() src!: string;
}

describe('ImageComponent', () => {
  let component: MockImageComponent;
  let fixture: ComponentFixture<MockImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});