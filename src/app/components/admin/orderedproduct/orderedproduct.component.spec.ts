import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedproductComponent } from './orderedproduct.component';

describe('OrderedproductComponent', () => {
  let component: OrderedproductComponent;
  let fixture: ComponentFixture<OrderedproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
