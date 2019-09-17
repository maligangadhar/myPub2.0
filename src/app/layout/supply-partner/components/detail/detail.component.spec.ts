import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSPComponent } from './detail.component';
import { FormsModule } from '@angular/forms';
import { SiteService } from '../../../../services/site.service';
import { BroadcastService } from '../../../../services/broadcast.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SiteDetailComponent } from '../site/site-detail/site-details.component';
import { AddSpComponent } from '../addSp/add-sp.component';
import { PlacementSettingsComponent } from '../placement-settings/placement-settings.component';
import { GcloginComponent } from '../gclogin/gclogin.component';
import { ArraySortPipe } from '../../../../pipes/sort-filter.pipe';

describe('DetailSPComponent', () => {
  let component: DetailSPComponent;
  let fixture: ComponentFixture<DetailSPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSPComponent, ArraySortPipe],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [SiteService, BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSPComponent);
    component = fixture.componentInstance;
    RouterTestingModule.withRoutes([
      { path: 'login', component: GcloginComponent },
      { path: 'placements', component: SiteDetailComponent },
      { path: 'placementSettings', component: PlacementSettingsComponent },
      { path: 'editPlacement', component: AddSpComponent },
      { path: 'viewAllSites', component: SiteDetailComponent },
    ]);
    fixture.detectChanges();
  });

  it('#editPlacement should call setplacementGuid of SiteService', () => {
    const testPlacement = 'testPlacement';
    const siteService = TestBed.get(SiteService);
    const spy = spyOn(siteService, 'setplacementGuid').and.callThrough();
    component.editPlacement(testPlacement);
    expect(spy).toHaveBeenCalled();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
