import { TestBed } from '@angular/core/testing';

import { ArtisansService } from './artisans.service';

describe('ArtisansService', () => {
  let service: ArtisansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtisansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
