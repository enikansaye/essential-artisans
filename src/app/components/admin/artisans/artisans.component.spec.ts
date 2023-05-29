import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisansComponent } from './artisans.component';

describe('ArtisansComponent', () => {
  let component: ArtisansComponent;
  let fixture: ComponentFixture<ArtisansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
