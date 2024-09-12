import { TestBed } from '@angular/core/testing';

import { PveService } from './pve.service';

describe('PveService', () => {
  let service: PveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
