import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminartisanbyidComponent } from './adminartisanbyid.component';

describe('AdminartisanbyidComponent', () => {
  let component: AdminartisanbyidComponent;
  let fixture: ComponentFixture<AdminartisanbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminartisanbyidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminartisanbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
