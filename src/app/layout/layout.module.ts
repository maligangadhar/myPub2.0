import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SiteService } from '../services/site.service';
import { BroadcastService } from '../services/broadcast.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        MessagesModule,
        NgbModule,
        NgbDropdownModule.forRoot(),
        RadioButtonModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
    providers: [SiteService, BroadcastService, TranslateService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
