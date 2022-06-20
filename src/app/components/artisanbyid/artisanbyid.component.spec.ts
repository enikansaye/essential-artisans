import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanbyidComponent } from './artisanbyid.component';

describe('ArtisanbyidComponent', () => {
  let component: ArtisanbyidComponent;
  let fixture: ComponentFixture<ArtisanbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanbyidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
