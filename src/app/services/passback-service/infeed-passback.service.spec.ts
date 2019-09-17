import { TestBed } from '@angular/core/testing';

import { InfeedPassbackService } from './infeed-passback.service';

describe('InfeedPassbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfeedPassbackService = TestBed.get(InfeedPassbackService);
    expect(service).toBeTruthy();
  });
});
