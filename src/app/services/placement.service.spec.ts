import { TestBed, inject } from '@angular/core/testing';

import { PlacementService } from './placement.service';
import { HttpClientModule } from '@angular/common/http';

describe('PlacementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlacementService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([PlacementService], (service: PlacementService) => {
    expect(service).toBeTruthy();
  }));
});
