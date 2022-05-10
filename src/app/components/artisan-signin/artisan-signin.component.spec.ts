import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanSigninComponent } from './artisan-signin.component';

describe('ArtisanSigninComponent', () => {
  let component: ArtisanSigninComponent;
  let fixture: ComponentFixture<ArtisanSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
