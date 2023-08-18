import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertransactionComponent } from './usertransaction.component';

describe('UsertransactionComponent', () => {
  let component: UsertransactionComponent;
  let fixture: ComponentFixture<UsertransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
