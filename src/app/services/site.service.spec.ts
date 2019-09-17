import { TestBed, inject } from '@angular/core/testing';

import { SiteService } from './site.service';
import { HttpClientModule } from '@angular/common/http';

describe('SiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([SiteService], (service: SiteService) => {
    expect(service).toBeTruthy();
  }));
});
