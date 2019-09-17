import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SupplyPartnerComponent } from './supply-partner.component';
import { SupplyPartnerModule } from './supply-partner.module';
import { BroadcastService } from '../../services/broadcast.service';
import { HttpClientModule } from '@angular/common/http';
import { AddSpComponent, DetailSPComponent, SiteDetailComponent, SiteComponent, PlacementSettingsComponent } from './components';
import { TagComponent } from '../tag/tag.component';
import { ActivityComponent } from '../activity/activity.component';
import { BanGUIDComponent } from '../activity/ban-guid/ban-guid.component';
import { MessagesComponent } from '../activity/messages/messages.component';
import { GcloginComponent } from './components/gclogin/gclogin.component';

describe('SupplyPartnerComponent', () => {
  let component: SupplyPartnerComponent;
  let fixture: ComponentFixture<SupplyPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        SupplyPartnerModule,
      ],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyPartnerComponent);
    component = fixture.componentInstance;
    RouterTestingModule.withRoutes([
      { path: 'login', component: GcloginComponent },
      { path: 'sp', component: SupplyPartnerComponent },
      { path: 'editPlacement', component: AddSpComponent },
      { path: 'spDetail', component: DetailSPComponent },
      { path: 'placements', component: SiteDetailComponent },
      { path: 'addSp', component: AddSpComponent },
      { path: 'viewAllSites', component: SiteComponent },
      { path: 'placementSettings', component: PlacementSettingsComponent },
      { path: 'tag', component: TagComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'banGuid', component: BanGUIDComponent },
      { path: 'messages', component: MessagesComponent }
    ]);
    fixture.detectChanges();
  });
});
