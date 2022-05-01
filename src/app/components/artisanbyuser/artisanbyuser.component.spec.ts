import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanbyuserComponent } from './artisanbyuser.component';

describe('ArtisanbyuserComponent', () => {
  let component: ArtisanbyuserComponent;
  let fixture: ComponentFixture<ArtisanbyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanbyuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
