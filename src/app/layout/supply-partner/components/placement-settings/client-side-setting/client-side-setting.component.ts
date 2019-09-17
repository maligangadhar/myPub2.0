import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../../../../services/site.service';
import { routerTransition } from '../../../../../router.animations';
import { Message } from 'primeng/api';
@Component({
    selector: 'gc-client-side-setting',
    templateUrl: './client-side-setting.component.html',
    styleUrls: ['./client-side-setting.component.scss'],
    animations: [routerTransition()]
})
export class ClientSideSettingComponent implements OnInit {
    @Input() public disabled: boolean;
    @Input() public spName: string;
    @Input() public spId: string;
    @Input() public placementDetailsClientSide: any;
    @Output() ClientSide = new EventEmitter();
    showDeselect: boolean = true;

    client_side = {
        real_impact: {
            appNexus: true,
            openX: true,
            aol: true
        },
        real_display: {
            appNexus: true,
            openX: true,
            aol: true
        },
        infeed_impact: {
            appNexus: true,
            openX: true,
            aol: true
        }
    };

    selected_guid: string = '';
    selected_sp: string = '';
    msgs: Message[] = [];
    constructor(private service: SiteService, private router: Router) {
    }
    realImpactList: any[];
    realDisplayList: any[];
    infeedList: any[];
    selectedRealImpact: string[] = [];
    selectedInfeed: string[] = [];
    selectedRealDisplay: string[] = [];
    showSelectAll: boolean = false;
    ngOnInit() {
        if (this.router.url.split('?')[0] === '/placementSettings') {
            this.showSelectAll = true;
        }
        this.service.selected_guid.subscribe(currentData => this.selected_guid = currentData);
        this.service.selected_sp.subscribe(sp => this.selected_sp = sp);
        this.realImpactList = [
            {
                id: 'appNexus',
                type: 'real_impact',
                value: 'appNexus',
                enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.inview_appnexus_enabled) ? true : false,
                disabled: true,
                map: 'inview_appnexus_enabled'
            },
            {
                value: 'openX',
                id: 'openX',
                enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.inview_openx_enabled) ? true : false,
                type: 'real_impact',
                disabled: this.disabled,
                map: 'inview_openx_enabled'
             }
            // {
            //     value: 'aol',
            //     id: 'aol',
            //     enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.inview_aol_enabled) ? true : false,
            //     type: 'real_impact',
            //     disabled: this.disabled,
            //     map: 'inview_aol_enabled'
            // }
        ];

        this.realDisplayList = [
            {
                id: 'appNexus',
                type: 'real_display',
                value: 'appNexus',
                enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.inpage_appnexus_enabled) ? true : false,
                disabled: this.disabled,
                map: 'inpage_appnexus_enabled'
            },
            {
                value: 'openX',
                id: 'openX',
                enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.inpage_openx_enabled) ? true : false,
                type: 'real_display',
                disabled: this.disabled,
                map: 'inpage_openx_enabled'
            }
            // {
            //     value: 'aol',
            //     id: 'aol',
            //     enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.inpage_aol_enabled) ? true : false,
            //     type: 'real_display',
            //     disabled: this.disabled,
            //     map: 'inpage_aol_enabled'
            // }
        ];
        this.infeedList = [
            {
                id: 'appNexus',
                value: 'appNexus',
                type: 'infeed_impact',
                enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.infeed_appnexus_enabled) ? true : false,
                disabled: this.disabled,
                map: 'infeed_appnexus_enabled'
            },
            {
                value: 'openX',
                id: 'openX',
                enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.infeed_openx_enabled) ? true : false,
                type: 'infeed_impact',
                disabled: this.disabled,
                map: 'infeed_openx_enabled'
            } 
            // {
            //     value: 'aol',
            //     id: 'aol',
            //     type: 'infeed_impact',
            //     enabled: (this.placementDetailsClientSide && this.placementDetailsClientSide.infeed_aol_enabled) ? true : false,
            //     disabled: this.disabled,
            //     map: 'infeed_aol_enabled'
            // }
        ];
        this.showDeSelectAll();
    }

    showDeSelectAll = () => {
        let deselectFlag = 1;
        if (this.placementDetailsClientSide) {
            this.realDisplayList.forEach((item) => {
                if (this.placementDetailsClientSide[item.map] !== true) {
                    deselectFlag = 0;
                }
            });
            this.realImpactList.forEach((item) => {
                if (this.placementDetailsClientSide[item.map] !== true) {
                    deselectFlag = 0;
                }
            });
            this.infeedList.forEach((item) => {
                if (this.placementDetailsClientSide[item.map] !== true) {
                    deselectFlag = 0;
                }
            });
            if (deselectFlag) {
                this.showDeselect = true;
            } else {
                this.showDeselect = false;
            }
            this.ClientSide.emit(this.placementDetailsClientSide);
        }
    }

    selectAll = () => {
        this.innerSelect(true);
    }

    deSelectAll = () => {
        this.innerSelect(false);
    }

    innerSelect = (value: boolean) => {
        if (this.placementDetailsClientSide) {
            this.realDisplayList.forEach((item) => {
                this.placementDetailsClientSide[item.map] = value;
                item.enabled = value;
            });
            this.realImpactList.forEach((item) => {
                this.placementDetailsClientSide[item.map] = value;
                item.enabled = value;
            });
            this.infeedList.forEach((item) => {
                this.placementDetailsClientSide[item.map] = value;
                item.enabled = value;
            });
            this.showDeselect = !this.showDeselect;
            this.ClientSide.emit(this.placementDetailsClientSide);
        }

    }
    updateSettings = (event) => {
        Object.keys(this.client_side[event.type]).forEach(element => {
            if (element === event.id) {
                this.client_side[event.type][element] = event.enabled;
            }
        });
        this.realDisplayList.forEach((item) => {
            this.placementDetailsClientSide[item.map] = item.enabled;
        });
        this.realImpactList.forEach((item) => {
            this.placementDetailsClientSide[item.map] = item.enabled;
        });
        this.infeedList.forEach((item) => {
            this.placementDetailsClientSide[item.map] = item.enabled;
        });
        this.showDeSelectAll();
        this.ClientSide.emit(this.placementDetailsClientSide);
    }
}
