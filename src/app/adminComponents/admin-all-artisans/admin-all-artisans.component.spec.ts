import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllArtisansComponent } from './admin-all-artisans.component';

describe('AdminAllArtisansComponent', () => {
  let component: AdminAllArtisansComponent;
  let fixture: ComponentFixture<AdminAllArtisansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllArtisansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
