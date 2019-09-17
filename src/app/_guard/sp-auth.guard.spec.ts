import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SpAuthGuard } from './sp.auth.guard';
import { SiteService } from '../services/site.service';
import { HttpClientModule } from '@angular/common/http';

describe('SpAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [SiteService, SpAuthGuard]
    });
  });

  it('should ...', inject([SpAuthGuard], (guard: SpAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
