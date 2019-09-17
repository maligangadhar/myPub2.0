import { TestBed } from '@angular/core/testing';

import { InviewPassbackService } from './inview-passback.service';

describe('InviewPassbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InviewPassbackService = TestBed.get(InviewPassbackService);
    expect(service).toBeTruthy();
  });
});
