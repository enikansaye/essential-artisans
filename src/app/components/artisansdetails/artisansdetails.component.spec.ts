import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisansdetailsComponent } from './artisansdetails.component';

describe('ArtisansdetailsComponent', () => {
  let component: ArtisansdetailsComponent;
  let fixture: ComponentFixture<ArtisansdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisansdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisansdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
