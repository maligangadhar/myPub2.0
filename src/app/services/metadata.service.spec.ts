import { TestBed, inject } from '@angular/core/testing';

import { MetadataService } from './metadata.service';
import { MetaData, PlacementMetaData } from '../models/viewModels';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MetadataService', () => {
  let service: MetadataService;
  let service_response;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MetadataService, RouterTestingModule]
    });
  });
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MetadataService] });
    service = TestBed.get(MetadataService);
  });

  it('#getMetaData should return value of PlacementMetaData model', () => {
    service.getMetaData().subscribe((result) => {
      service_response = result;
      expect(Object.keys(service_response.data)).toEqual(['site_categories', 'tag_types', 'ad_products', 'real_video_settings']);
    });
  });

  // it('should be created', inject([MetadataService], ( service: MetadataService) => {
  //   expect(service).toBeTruthy();
  // }));
});
