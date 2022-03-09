import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerregisterComponent } from './partnerregister.component';

describe('PartnerregisterComponent', () => {
  let component: PartnerregisterComponent;
  let fixture: ComponentFixture<PartnerregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
