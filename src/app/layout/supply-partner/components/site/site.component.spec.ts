import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SiteComponent } from './site.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BroadcastService } from '../../../../services/broadcast.service';
import { SiteService } from '../../../../services/site.service';
import { SiteDetailComponent } from './site-detail/site-details.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ArraySortPipe } from '../../../../pipes/sort-filter.pipe';

describe('SiteComponent', () => {
  let component: SiteComponent;
  let fixture: ComponentFixture<SiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteComponent, ArraySortPipe],
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [BroadcastService, SiteService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteComponent);
    component = fixture.componentInstance;
    RouterTestingModule.withRoutes([
      { path: 'placements', component: SiteDetailComponent },
    ]);
    fixture.detectChanges();
  });

  it('#getSearchDetails should call getSiteMetaData of SiteService if guid_id exists',
    inject([SiteService, HttpTestingController], (siteService, httpBackend) => {
      siteService = TestBed.get(SiteService);
      component.guid_id = 'test';
      const spy = spyOn(siteService, 'getSiteMetadata').and.callThrough();

      component.getSearchDetails();
      expect(spy).toHaveBeenCalled();
    }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
