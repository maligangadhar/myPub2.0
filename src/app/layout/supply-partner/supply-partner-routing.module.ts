import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplyPartnerComponent } from './supply-partner.component';
import { PlacementSettingsComponent } from './components/placement-settings/placement-settings.component';
import { SpAuthGuard } from '../../_guard/sp.auth.guard';
import { LoginAuthGuard} from '../../_guard/login.auth.guard';
import { DetailSPComponent } from './components/detail/detail.component';
import { SiteDetailComponent, AddSpComponent, SiteComponent } from './components';
import { TagComponent} from '../tag/tag.component';
import { ActivityComponent} from '../activity/activity.component';
import { MessagesComponent } from '../activity/messages/messages.component';
import { BanGUIDComponent } from '../activity/ban-guid/ban-guid.component';
import { GcloginComponent} from '../supply-partner/components/gclogin/gclogin.component';
import { UsersComponent } from '../supply-partner/components/users/users.component';
const routes: Routes = [
    { path: '', redirectTo: 'login' },
    { path: 'sp', component: SupplyPartnerComponent, canActivate: [LoginAuthGuard] },
    { path: 'editPlacement', component: AddSpComponent, canActivate: [LoginAuthGuard]},
    { path: 'spDetail', component: DetailSPComponent, canActivate: [LoginAuthGuard]},
    { path: 'placements', component: SiteDetailComponent, canActivate: [LoginAuthGuard]},
    { path: 'addSp', component: AddSpComponent, canActivate: [LoginAuthGuard]},
    { path: 'viewAllSites', component: SiteComponent, canActivate: [LoginAuthGuard]},
    { path: 'placementSettings', component: PlacementSettingsComponent, canActivate: [SpAuthGuard]},
    { path: 'tag', component: TagComponent, canActivate: [LoginAuthGuard]},
    { path: 'activity', component: ActivityComponent, canActivate: [LoginAuthGuard]},
    { path: 'banGuid', component: BanGUIDComponent, canActivate: [LoginAuthGuard]},
    { path: 'messages', component: MessagesComponent, canActivate: [LoginAuthGuard]},
    { path: 'login', component: GcloginComponent},
    { path: 'users', component: UsersComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupplyPartnerRoutingModule {
}
