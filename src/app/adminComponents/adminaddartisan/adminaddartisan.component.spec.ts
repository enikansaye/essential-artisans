import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddartisanComponent } from './adminaddartisan.component';

describe('AdminaddartisanComponent', () => {
  let component: AdminaddartisanComponent;
  let fixture: ComponentFixture<AdminaddartisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddartisanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddartisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
