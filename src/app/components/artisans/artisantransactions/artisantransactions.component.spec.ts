import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisantransactionsComponent } from './artisantransactions.component';

describe('ArtisantransactionsComponent', () => {
  let component: ArtisantransactionsComponent;
  let fixture: ComponentFixture<ArtisantransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisantransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisantransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
