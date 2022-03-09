import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcrepairComponent } from './acrepair.component';

describe('AcrepairComponent', () => {
  let component: AcrepairComponent;
  let fixture: ComponentFixture<AcrepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcrepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcrepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
