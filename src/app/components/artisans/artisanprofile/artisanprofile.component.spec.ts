import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanprofileComponent } from './artisanprofile.component';

describe('ArtisanprofileComponent', () => {
  let component: ArtisanprofileComponent;
  let fixture: ComponentFixture<ArtisanprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
