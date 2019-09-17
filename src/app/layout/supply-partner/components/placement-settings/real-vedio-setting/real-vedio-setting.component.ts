import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SiteService } from '../../../../../services/site.service';
import { routerTransition } from '../../../../../router.animations';
import { MessageService } from 'primeng/api';
import { RealVideo } from '../../../../../models/viewModels';
import { Router } from '@angular/router';

@Component({
    selector: 'gc-real-video-setting',
    templateUrl: './real-vedio-setting.component.html',
    styleUrls: ['./real-vedio-setting.component.scss'],
    animations: [routerTransition()]
})
export class RealVedioSettingComponent implements OnInit {
    outstreamList: string[] = [];
    maxDurationList: any[] = [
        { name: 'Not set', value: null },
        { name: '15 seconds', value: 15 },
        { name: '30 seconds', value: 30 }];
    realVideoEnabled: any;
    realVedioFlag: string[] = [];
    selected_guid: string = '';
    selected_sp: string = '';
    showSelectAll: boolean = false;
    siteDetailsLoading: boolean = true;

    @Input() disabled;
    @Input() placementDetailsRealVideo;
    @Output() RealVideo = new EventEmitter();

    real_video: RealVideo = {
        lkqd_enabled: false,
        spotx_channel: 30,
        maximum_duration: 30
    };
    constructor(private messageService: MessageService, private router: Router, private service: SiteService) {
    }
    ngOnInit() {
        if (this.router.url.split('?')[0] === '/placementSettings') {
            this.showSelectAll = true;
        }
        this.realVedioFlag = ['realVideo'];
        this.service.selected_guid.subscribe(currentData => this.selected_guid = currentData);
        this.service.selected_sp.subscribe(sp => this.selected_sp = sp);
        this.realVideoEnabled = {
            name: 'realVideo',
            value: 'realVideo',
            id: 'realVideo',
            disabled: false
        };
        this.siteDetailsLoading = true;
        if (this.placementDetailsRealVideo && this.placementDetailsRealVideo.video_max_duration === 0) {
            this.placementDetailsRealVideo.video_max_duration = null;
        }
    }
    saveSetting = () => {
        this.messageService.add({ severity: 'success', summary: 'Information', detail: 'Successfully saved real video setting information' });
    }

    onCheckBoxClick() {
        this.RealVideo.emit(this.placementDetailsRealVideo);
    }

    selectAll() {
        const to_select = ['real_video_enabled', 'lkqd_enabled'];
        to_select.forEach(element => {
            this.real_video[element] = true;
            this.onCheckBoxClick();
        });
    }

}
