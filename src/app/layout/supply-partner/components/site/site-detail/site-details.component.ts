import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from '../../../../../services/site.service';
import { DialogBoxService } from '../../../../../services/dialog-box.service';
import { IKeyData, InViewPassback, InFeedPassback } from '../../../../../models/viewModels';
import { BroadcastService } from '../../../../../services/broadcast.service';
import { PlacementService } from '../../../../../services/placement.service';

@Component({
    selector: 'gc-site-detail',
    templateUrl: './site-detail.component.html',
    styleUrls: ['./site-detail.component.scss'],
    animations: [routerTransition()]
})

export class SiteDetailComponent implements OnInit {
    @Input() public site: any;
    disabled: boolean = true;
    @Output() onEditGuidClick = new EventEmitter();
    inviewAdUnits: string = '';
    inviewPassbackFlag: InViewPassback = {
        desktopPassback: false,
        phonePassback: false,
        tabletPassback: false
    };
    infeedAdUnits: string = '';
    infeedPassbackFlag: InFeedPassback = {
        desktopPassback: false,
        phonePassback: false,
        tabletPassback: false
    };
    siabAdUnits: string = '';
    realImpactList: any[];
    siteDetails: any;
    siteDetailsLoading: boolean = true;
    realDisplayList: any[];
    infeedList: any[];
    selectedRealImpact: string[] = [];
    selectedInfeed: string[] = [];
    selectedRealDisplay: string[] = [];
    guid: string = '';
    name: string = '';
    id: string = '';
    spId: string = '';
    spName: String = '';
    create_update: string = '';
    placementDetails: any;
    rev_ctrl_passbacks: any;
    height: number;
    dialog_box_content: string = '';
    reasonForBan: string = '';
    msgs = [];
    sicBanned: boolean = false;
    timer: number = 3000;
    logginUser: string = '';
    prevNavigateRoute: string = '';
    dataLicense: string = 'Unrestricted';
    constructor(private route: ActivatedRoute, private router: Router, private broadcast: BroadcastService, private placementService: PlacementService, private dialogService: DialogBoxService) {
        this.broadcast.DataChange.subscribe((result: IKeyData) => {
            if ('user' === result.key) {
                this.logginUser = result.data;
            }
        });
        this.prevNavigateRoute = this.router.url;
        localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.height = window.innerHeight - 180;
    }

    ngOnInit() {

        this.height = window.innerHeight - 180;
        this.name = this.route.snapshot.queryParamMap.get('name');
        this.guid = this.route.snapshot.queryParamMap.get('guid');
        this.id = this.route.snapshot.queryParamMap.get('id');
        this.spId = this.route.snapshot.queryParamMap.get('spId');
        this.spName = this.route.snapshot.queryParamMap.get('spName');
        this.create_update = this.route.snapshot.queryParamMap.get('create_update');
        if (this.create_update) {
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Placement ' + this.create_update + ' successfully' });
            this.triggerTimeOut();
        }
        this.placementService.getPlacementDetails(this.id, this.guid).subscribe((result: any) => {
            if (result) {
                this.placementDetails = result;
                // check for DFP ad type 
                this.placementDetails.sic_site_setting.install_method = (this.placementDetails.sic_site_setting.install_method === 'DFP') ? 'Ad Server' : this.placementDetails.sic_site_setting.install_method;
                this.sicBanned = this.placementDetails.site_details['is_sic_banned?'];
                if (this.placementDetails.site_details['data_license']) {
                    this.dataLicense = (this.placementDetails.site_details['data_license'] === 1) ? 'Unrestricted' : (this.placementDetails.site_details['data_license'] === 3) ? 'cannot use' : 'Unrestricted';
                }
                this.siteDetailsLoading = false;
                this.readAdUnits();
            } else {
                this.siteDetailsLoading = false;
            }
        }, error => {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
            this.siteDetailsLoading = false;
            if (error['status'] && error['status'] === 401) {
                localStorage.removeItem('isLoggedin');
                localStorage.removeItem('token');
                this.broadcast.broadcast('login', 'true');
                setTimeout(() => {
                    this.msgs = [];
                    this.router.navigate(['login']);
                }, this.timer);
            }
        });
        this.siteDetailsLoading = true;
    }
    banPlacement = (content) => {
        this.msgs = [];
        this.dialogService.onClickDialog(content).then((result) => {
            if (result === 1 && this.reasonForBan) {
                const banObj = {
                    'data': {
                        'site_guid': this.guid,
                        'reason': this.reasonForBan,
                        'user': this.logginUser
                    }
                };
                this.placementService.banPlacement(banObj).subscribe((result: any) => {
                    this.msgs.push({ severity: 'info', summary: 'Info', detail: result['message'] });
                    this.sicBanned = true;
                    this.triggerTimeOut();
                }, error => {
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
                    this.triggerTimeOut();
                    if (error['status'] && error['status'] === 401) {
                        localStorage.removeItem('isLoggedin');
                        localStorage.removeItem('token');
                        this.broadcast.broadcast('login', 'true');
                        setTimeout(() => {
                            this.msgs = [];
                            this.router.navigate(['login']);
                        }, this.timer);
                    }
                });
            }
        });
    }
    editAddSetting = () => {
        this.router.navigate(['placementSettings'], { queryParams: { guid: this.guid, name: this.name, id: this.id } });
    }

    /**
     * clone placement settings
     */
    clonePlacementSettings = () => {
        this.router.navigate(['placementSettings'], { queryParams: { guid: this.guid, name: this.name, id: this.id, clone: 'true' } });
    }

    triggerTimeOut() {
        setTimeout(() => {
            this.msgs = [];
        }, this.timer);
    }
    goBackToDetailPage = () => {
        this.router.navigate(['spDetail'], { queryParams: { id: this.id, name: this.name, guid: this.guid } });
    }

    readAdUnits = () => {
        this.infeedPassbackFlag = {
            desktopPassback: false,
            phonePassback: false,
            tabletPassback: false
        };
        this.inviewPassbackFlag = {
            desktopPassback: false,
            phonePassback: false,
            tabletPassback: false
        };
        if (this.placementDetails && this.placementDetails.ad_settings) {
            ['Pillar', 'Adhesion', 'Video Pillar'].forEach(ad_product => {
                this.placementDetails.ad_settings[ad_product]['desktop'].forEach(ad_unit => {
                    if (ad_unit.enabled) {
                        this.inviewAdUnits = this.inviewAdUnits + ' Desktop ' + ad_unit.size + ',';
                        this.inviewPassbackFlag.desktopPassback = true;
                    }
                });
            });

            ['Pillar', 'Adhesion'].forEach(ad_product => {
                this.placementDetails.ad_settings[ad_product]['tablet'].forEach(ad_unit => {
                    if (ad_unit.enabled) {
                        this.inviewAdUnits = this.inviewAdUnits + 'Tablet ' + ad_unit.size + ',';
                        this.inviewPassbackFlag.tabletPassback = true;
                    }
                });
            });

            this.placementDetails.ad_settings['Adhesion']['mobile'].forEach(ad_unit => {
                if (ad_unit.enabled) {
                    this.inviewAdUnits = this.inviewAdUnits + ' Phone ' + ad_unit.size + ',';
                    this.inviewPassbackFlag.phonePassback = true;
                }
            });

            ['In-Feed Video', 'In-Feed Impact'].forEach(ad_product => {
                this.placementDetails.ad_settings[ad_product]['desktop'].forEach(ad_unit => {
                    if (ad_unit.enabled) {
                        this.infeedAdUnits = this.infeedAdUnits + ' Desktop ' + ad_unit.size + ',';
                        this.infeedPassbackFlag.desktopPassback = true;
                    }
                });
            });

            ['In-Feed Video', 'In-Feed Impact'].forEach(ad_product => {
                this.placementDetails.ad_settings[ad_product]['mobile'].forEach(ad_unit => {
                    if (ad_unit.enabled) {
                        this.infeedAdUnits = this.infeedAdUnits + ' Phone ' + ad_unit.size + ',';
                        this.infeedPassbackFlag.phonePassback = true;
                    }
                });
            });
            ['desktop', 'mobile', 'tablet'].forEach((device) => {
                this.placementDetails.ad_settings['Standard Display'][device].forEach(ad_unit => {
                    if (ad_unit.enabled && device === 'desktop') {
                        this.siabAdUnits = this.siabAdUnits + ' Desktop ' + ad_unit.size + ',';
                    } else if (ad_unit.enabled && device === 'tablet') {
                        this.siabAdUnits = this.siabAdUnits + ' Tablet ' + ad_unit.size + ',';
                    } else if (ad_unit.enabled && device === 'mobile') {
                        this.siabAdUnits = this.siabAdUnits + ' Phone ' + ad_unit.size + ',';
                    }
                });
            });

            if (this.inviewAdUnits) {
                this.inviewAdUnits = this.inviewAdUnits.substring(0, this.inviewAdUnits.length - 1);
            }
            if (this.infeedAdUnits) {
                this.infeedAdUnits = this.infeedAdUnits.substring(0, this.infeedAdUnits.length - 1);
            }
            if (this.siabAdUnits) {
                this.siabAdUnits = this.siabAdUnits.substring(0, this.siabAdUnits.length - 1);
            }
        }
    }
}
