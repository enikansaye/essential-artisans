import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanSignupComponent } from './artisan-signup.component';

describe('ArtisanSignupComponent', () => {
  let component: ArtisanSignupComponent;
  let fixture: ComponentFixture<ArtisanSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
