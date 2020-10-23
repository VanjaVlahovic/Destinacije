import { TestBed } from '@angular/core/testing';

import { DestinacijeService } from './destinacije.service';

describe('DestinacijeService', () => {
  let service: DestinacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
