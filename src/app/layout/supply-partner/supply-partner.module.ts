import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { SupplyPartnerRoutingModule } from './supply-partner-routing.module';
import { SupplyPartnerComponent } from './supply-partner.component';
import { SpCheckboxComponent } from '../../components/sp-checkbox/sp-checkbox.component';
import { FormsModule } from '@angular/forms';
import { GrdFilterPipe } from '../../pipes/GrdFilterPipe';
import { ArraySortPipe} from '../../pipes/sort-filter.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpAuthGuard } from '../../_guard/sp.auth.guard';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { ReactiveFormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ErrorComponent } from '../../components/error-messages/error.component';
import { PillarSettingsComponent } from './components/placement-settings/pillar-settings/pillar-settings.component';
import { AdhesionSettingsComponent } from './components/placement-settings/adhesion-settings/adhesion-settings.component';
import { VideoPillarSettingsComponent } from './components/placement-settings/video-pillar-settings/video-pillar-settings.component';
import { InfeedVideoSettingsComponent } from './components/placement-settings/infeed-video-settings/infeed-video-settings.component';
import { InfeedImpactSettingsComponent } from './components/placement-settings/infeed-impact-settings/infeed-impact-settings.component';
import { SiabSettingsComponent } from './components/placement-settings/siab-settings/siab-settings.component';
import { TagComponent } from '../tag/tag.component';
import { MessagesComponent } from '../activity/messages/messages.component';
import { BanGUIDComponent } from '../activity/ban-guid/ban-guid.component';
import { ActivityComponent } from '../activity/activity.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageComponent } from '../../components/message/message.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AutoCompleteModule } from 'primeng/autocomplete';

import {
    AddSpComponent,
    DetailSPComponent,
    SearchComponent,
    PlacementSettingsComponent,
    SiteComponent,
    SiteDetailComponent,
    ClientSideSettingComponent,
    RealVedioSettingComponent
} from './components';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { GcloginComponent } from './components/gclogin/gclogin.component';
import { NoResultsComponent } from '../../components/no-results/no-results.component';
import { InviewPassbackComponent } from './components/passbacks/inview-passback/inview-passback.component';
import { InfeedPassbackComponent } from './components/passbacks/infeed-passback/infeed-passback.component';
import { UsersComponent } from './components/users/users.component';
import { PublisherPricingComponent } from './components/placement-settings/publisher-pricing/publisher-pricing.component';
@NgModule({
    imports: [
        CommonModule,
        PaginatorModule,
        CheckboxModule,
        ToastModule,
        MessageModule,
        MessagesModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        SupplyPartnerRoutingModule,
        FormsModule,
        NgbModule,
        AccordionModule,
        ReactiveFormsModule,
        RadioButtonModule,
        InputTextareaModule,
        ListboxModule,
        ButtonModule,
        OverlayPanelModule,
        ScrollingModule,
        AutoCompleteModule
    ],
    declarations: [
        ActivityComponent,
        AddSpComponent,
        AdhesionSettingsComponent,
        BanGUIDComponent,
        ClientSideSettingComponent,
        DetailSPComponent,
        ErrorComponent,
        GcloginComponent,
        GrdFilterPipe,
        ArraySortPipe,
        InfeedImpactSettingsComponent,
        InfeedPassbackComponent,
        InfeedVideoSettingsComponent,
        InviewPassbackComponent,
        MessageComponent,
        MessagesComponent,
        NoResultsComponent,
        PillarSettingsComponent,
        PlacementSettingsComponent,
        RealVedioSettingComponent,
        SearchComponent,
        SiabSettingsComponent,
        SiteComponent,
        SiteDetailComponent,
        SpCheckboxComponent,
        SupplyPartnerComponent,
        TagComponent,
        VideoPillarSettingsComponent,
        UsersComponent,
        PublisherPricingComponent
    ],
    providers: [SpAuthGuard, MessageService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplyPartnerModule { }
