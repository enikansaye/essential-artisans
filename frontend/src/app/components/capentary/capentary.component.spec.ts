import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapentaryComponent } from './capentary.component';

describe('CapentaryComponent', () => {
  let component: CapentaryComponent;
  let fixture: ComponentFixture<CapentaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapentaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
