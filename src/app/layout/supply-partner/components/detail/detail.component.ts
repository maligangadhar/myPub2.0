import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../../router.animations';
import { ISiteDetail } from '../../../../models/viewModels';
import { Subscription } from 'rxjs';
import { SiteService } from '../../../../services/site.service';
import { ActivatedRoute } from '@angular/router';
import { BroadcastService } from '../../../../services/broadcast.service';
import { Message } from 'primeng/api';


@Component({
    selector: 'gc-sp-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    animations: [routerTransition()]
})

export class DetailSPComponent implements OnInit {
    placementList: any[] = [];
    jbList: any;
    site: ISiteDetail = {
        salesforce_url: '',
        supply_partner: {
            partner_name: '',
            partner_guid: '',
            sfdc_lead_id: '',
            first_name: '',
            last_name: '',
            payout_currency: '',
            street_address: '',
            city: '',
            country: '',
            state: '',
            postal_code: '',
            contact_name: '',
            contact_address: '',
            phone: '',
            status: '',
            url: '',
            email: '',
            job_function_id: 0,
            seller_type: ''
        },
        placements: [{
            guid: '',
            login: '',
            placement_name: ''
        }]
    };
    pub_guid: string = '';
    siteList: ISiteDetail;
    subscription: Subscription;
    siteDetailsLoading: boolean;
    showSPEditFlag: boolean = false;
    guid: string = '';
    pub_guid_name: string = '';
    msgs: Message[] = [];
    timer: number = 3000;
    relationshipList: any[] = [];
    getLoadList: () => void;
    prevNavigateRoute: string = '';

    constructor(private service: SiteService, private route: ActivatedRoute, private router: Router, private broadcast: BroadcastService) {
        const vm = this;
        vm.pub_guid = this.route.snapshot.queryParamMap.get('id');
        vm.guid = this.route.snapshot.queryParamMap.get('guid');
        vm.pub_guid_name = this.route.snapshot.queryParamMap.get('name');
        this.jbList = [{
            'name': 'Audience Development/SEO',
            'id': '1'
        },
        {
            'name': 'Business Development',
            'id': '2'
        }, {
            'name': 'Ad/Media Operations',
            'id': '3'
        }, {
            'name': 'Engineering/IT',
            'id': '4'
        }, {
            'name': 'Editorial/Content',
            'id': '5'
        }, {
            'name': 'Finance',
            'id': '6'
        }, {
            'name': 'Product',
            'id': '7'
        }, {
            'name': 'Sales',
            'id': '8'
        }, {
            'name': 'Others',
            'id': '9'
        }];
        vm.getLoadList = () => {
            vm.getMetaData();
            this.siteDetailsLoading = true;
            this.prevNavigateRoute = this.router.url;
            localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
            vm.service.getSiteMetadata(vm.pub_guid).subscribe((result: any) => {
                if (result) {
                    this.site = result;
                    this.site.placements.forEach(site => {
                        if (site.placement_name === null || site.placement_name === '') {
                            site.placement_name = site.login;
                        }
                    });
                    // job function 
                    if (vm.jbList) {
                        vm.jbList.forEach(jb => {
                            if (this.site.supply_partner.job_function_id && jb.id === this.site.supply_partner.job_function_id.toString()) {
                                this.site.supply_partner.job_function_id = jb.name;
                            }
                        });
                    }
                    // relationship
                    if (vm.relationshipList) {
                        vm.relationshipList.forEach(rel => {
                            if (this.site.supply_partner.seller_type && rel.id === this.site.supply_partner.seller_type.toString()) {
                                this.site.supply_partner.seller_type = rel.name;
                            }
                        });
                    }
                }
                this.siteDetailsLoading = false;
            }, error => {
                this.siteDetailsLoading = false;
                this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
                if (error['status'] && error['status'] === 401) {
                    localStorage.removeItem('isLoggedin');
                    setTimeout(() => {
                        this.msgs = [];
                        this.router.navigate(['login']);
                    }, this.timer);
                }
            });

        };

    }
    /**
     * get meta data for directness
     */
    getMetaData = () => {
        this.relationshipList.push(
            { 'id': 'P', 'name': 'Publisher' },
            { 'id': 'I', 'name': 'Intermediary' },
            { 'id': 'B', 'name': 'Both' },
            { 'id': 'U', 'name': 'Unknown' });
    }
    editMode() {
        this.router.navigate(['editPlacement'], { queryParams: { guid: this.site.supply_partner.partner_guid, id: this.pub_guid, 'new': false } });
    }
    editPlacement(placement) {
        this.broadcast.broadcast('placement', 'true');
        this.router.navigate(['placements'], {
            queryParams: {
                'guid': placement.guid, 'name': (placement.placement_name) ? placement.placement_name : placement.login, 'id': this.pub_guid,
                'spId': this.site.supply_partner.partner_guid, 'spName': this.site.supply_partner.partner_name
            }
        });
        this.service.setplacementGuid(placement.guid);
        const spname = (placement.placement_name) ? placement.placement_name : placement.login;
        this.service.setSelectedSp(spname);
    }
    createPlacement() {
        this.router.navigate(['placementSettings'], {
            queryParams: { 'guid': this.site.supply_partner.partner_guid, 'id': this.pub_guid, 'new': true, 'name': this.site.supply_partner.partner_name }
        });
    }
    getAllGUID() {
        this.router.navigate(['viewAllSites'], { queryParams: { guid: this.site.supply_partner.partner_guid, 'name': this.site.supply_partner.partner_name, id: this.pub_guid } });
    }
    navToSalesForce = () => {
        const win = window.open('http://' + this.site.salesforce_url + '/' + this.site.supply_partner.partner_guid, '_blank');
        win.focus();
    }
    ngOnInit() {
        this.getLoadList();
    }
}

