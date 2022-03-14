import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandombotComponent } from './randombot.component';

describe('RandombotComponent', () => {
  let component: RandombotComponent;
  let fixture: ComponentFixture<RandombotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandombotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandombotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
