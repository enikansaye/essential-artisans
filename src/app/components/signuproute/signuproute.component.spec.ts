import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuprouteComponent } from './signuproute.component';

describe('SignuprouteComponent', () => {
  let component: SignuprouteComponent;
  let fixture: ComponentFixture<SignuprouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignuprouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignuprouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
