import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllartisanComponent } from './allartisan.component';

describe('AllartisanComponent', () => {
  let component: AllartisanComponent;
  let fixture: ComponentFixture<AllartisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllartisanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllartisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
