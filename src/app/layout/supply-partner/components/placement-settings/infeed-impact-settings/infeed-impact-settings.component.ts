import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { InFeedPassback } from '../../../../../models/viewModels';
import { InfeedPassbackService } from '../../../../../services/passback-service/infeed-passback.service';

const ad_settings: string = 'ad_settings';
const infeed_impact: string = 'In-Feed Impact';

@Component({
    selector: 'gc-infeed-impact-settings',
    templateUrl: './infeed-impact-settings.component.html',
    styleUrls: ['./infeed-impact-settings.component.scss']
})
export class InfeedImpactSettingsComponent implements OnInit, OnChanges {

    PassbackTagEnable: boolean[];
    DeviceList: string[];
    InfeedImpactDesktopList: any[];
    InfeedImpactPhoneList: any[];
    SizeList: string[];

    @Input() InfeedImpactMeta;
    @Input() InfeedImpactPlacementDetails;
    @Output() InfeedImpact = new EventEmitter();

    desktopExpansionFlag: boolean;
    mobileExpansionFlag: boolean;
    inFeedPassback: InFeedPassback = {
        desktopPassback: false,
        phonePassback: false,
        tabletPassback: false
    };

    dialog_box_content: string;
    showDeselectButton: boolean;

    constructor(private infeedPassbackService: InfeedPassbackService) { }

    ngOnInit() {
        this.infeedPassbackService.inFeedDesktopFlag.subscribe(desktopPassback => this.inFeedPassback.desktopPassback = desktopPassback);
        this.infeedPassbackService.inFeedPhoneFlag.subscribe(phonePassback => this.inFeedPassback.phonePassback = phonePassback);
    }

    ngOnChanges() {
        if (this.InfeedImpactPlacementDetails
            && this.InfeedImpactPlacementDetails[ad_settings][infeed_impact].desktop
            && this.InfeedImpactPlacementDetails[ad_settings][infeed_impact].mobile) {
            this.InfeedImpactDesktopList = this.InfeedImpactPlacementDetails[ad_settings][infeed_impact].desktop;
            this.InfeedImpactDesktopList.forEach(desktop => {
                if (!desktop['render_effect_id']) {
                    const desktopMeta = this.InfeedImpactMeta.desktop.filter(meta => meta.display_name === 'None');
                    desktop['render_effect_id'] = desktopMeta[0].id;
                }
            }); 
            this.InfeedImpactPhoneList = this.InfeedImpactPlacementDetails[ad_settings][infeed_impact].mobile;
            this.InfeedImpactPhoneList.forEach(phone => {
                if (!phone['render_effect_id']) {
                    const phoneMeta = this.InfeedImpactMeta.mobile.filter(meta => meta.display_name === 'None');
                    phone['render_effect_id'] = phoneMeta[0].id;
                }
            }); 
            this.selectAllCheck();
        }
    }

    /**
     * OnCheckBoxClick is called on every click of checkbox
     */
    onCheckBoxClick = () => {
        this.selectAllCheck();
    }

    /**
     * check for select all details for desktop and phone
     */
    selectAllCheck = () => {
        let deselectFlag = 1;
        this.InfeedImpactDesktopList.forEach(element => {
            if (element.enabled !== true) {
                deselectFlag = 0;
            }
        });
        this.InfeedImpactPhoneList.forEach(element => {
            if (element.enabled !== true) {
                deselectFlag = 0;
            }
        });
        deselectFlag ? this.showDeselectButton = true : this.showDeselectButton = false;
        if (this.InfeedImpactPlacementDetails['ad_settings']['In-Feed Impact']) {
            this.InfeedImpactPlacementDetails['ad_settings']['In-Feed Impact']['desktop'].forEach(infeed => {
                infeed.render_effect_id = Number(infeed.render_effect_id);
            });
            this.InfeedImpactPlacementDetails['ad_settings']['In-Feed Impact']['mobile'].forEach(infeed => {
                infeed.render_effect_id = Number(infeed.render_effect_id);
            });
        }
        this.infeedPassbackService.captureInFeedPassback(this.InfeedImpactPlacementDetails[ad_settings][infeed_impact], 2);
        this.InfeedImpact.emit(this.InfeedImpactPlacementDetails);
    }

    /**
     * updatePassback will update passback when there is a change in passback input fields
     */
    updatePassback = (event) => {
        this.InfeedImpactPlacementDetails['sic_site_setting']['infeed_desktop_passback'] = event.desktop;
        this.InfeedImpactPlacementDetails['sic_site_setting']['infeed_mobile_passback'] = event.mobile;
    }

    innerSelect = (value: boolean) => {
        this.InfeedImpactDesktopList.forEach(element => {
            element.enabled = value;
        });

        this.InfeedImpactPhoneList.forEach(element => {
            element.enabled = value;
        });
        this.onCheckBoxClick();
    }

    deSelectAll = () => {
        this.innerSelect(false);
    }

    selectAll = () => {
        this.innerSelect(true);
    }
}
