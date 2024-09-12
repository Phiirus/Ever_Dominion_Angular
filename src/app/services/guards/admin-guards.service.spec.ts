import { TestBed } from '@angular/core/testing';

import { AdminGuardService } from './admin-guards.service';

describe('AdminGuardsService', () => {
  let service: AdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
