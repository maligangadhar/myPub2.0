import { SupplyPartnerModule } from './supply-partner.module';
import { RouterTestingModule } from '@angular/router/testing';
import { GcloginComponent } from './components/gclogin/gclogin.component';
import { SupplyPartnerComponent } from './supply-partner.component';
import { AddSpComponent, DetailSPComponent, SiteDetailComponent, SiteComponent, PlacementSettingsComponent } from './components';
import { TagComponent } from '../tag/tag.component';
import { ActivityComponent } from '../activity/activity.component';
import { BanGUIDComponent } from '../activity/ban-guid/ban-guid.component';
import { MessagesComponent } from '../activity/messages/messages.component';

describe('DashboardModule', () => {
  let dashboardModule: SupplyPartnerModule;

  beforeEach(() => {
    dashboardModule = new SupplyPartnerModule();
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
  });
});
