import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { SiteService } from '../../../../services/site.service';
import { BroadcastService } from '../../../../services/broadcast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver'; 

@Component({
    selector: 'gc-sp-site',

    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss'],
    animations: [routerTransition()]
})

export class SiteComponent implements OnInit {
    @Input() public spId: string;
    @Output() public siteView = new EventEmitter();
    @Output() public onCreateGUID = new EventEmitter();
    searchDetailsLoading: boolean;
    siteDetails: any;
    guid = '';
    guid_id = '';
    name = '';
    msgs = [];
    timer: number = 3000;
    height: string;
    detailDiv: HTMLElement;
    siteDetailTableDiv: HTMLElement;
    constructor(private service: SiteService, private broadcast: BroadcastService, private router: Router, private route: ActivatedRoute) {
        const vm = this;
        this.broadcast.broadcast('placement', true);
        vm.guid = this.route.snapshot.queryParamMap.get('guid');
        vm.guid_id = this.route.snapshot.queryParamMap.get('id');
        vm.name = this.route.snapshot.queryParamMap.get('name');
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.height = (window.innerHeight - 200) + 'px';
    }

    ngOnInit() {
        this.height = (window.innerHeight - 130) + 'px';
        this.getSearchDetails();

    }

    backToAccountInfo = () => {
        this.router.navigate(['spDetail'], { queryParams: { id: this.guid_id } });
    }

    createPlacement = () => {
        this.router.navigate(['placementSettings'], {
            queryParams: { 'guid': this.guid, 'name': this.name, 'id': this.guid_id, 'new': true }
        });
    }

    getSearchDetails = () => {
        this.searchDetailsLoading = true;
        if (this.guid_id) {
            this.service.getSiteMetadata(this.guid_id).subscribe(result => {
                this.searchDetailsLoading = false;
                this.siteDetails = result;
                this.siteDetails.placements.forEach(site => {
                    if (site.placement_name === null || site.placement_name === '') {
                        site.placement_name = site.login;
                    }
                });
                this.detailDiv = document.getElementById('site-container');
                this.detailDiv.style.minHeight = this.height;
            }, error => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
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
    }

    /**
     * export to CSV file
     */
    exportToCSV = () => {
        const data = this.siteDetails.placements;
        const replacer = (key, value) => value === null ? '' : value; 
        const header = Object.keys(data[0]);
        const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        const csvArray = csv.join('\r\n');
        const blob = new Blob([csvArray], { type: 'text/csv' });
        saveAs(blob, this.name + '- placements');
    }
    onSiteView = (site) => {
        this.broadcast.broadcast('placement', 'true');
        this.router.navigate(['placements'], {
            queryParams: {
                'guid': site.guid, 'name': (site.placement_name) ? site.placement_name : site.login,
                'id': this.guid_id, 'spName': this.siteDetails.supply_partner.partner_name, 'spId': this.siteDetails.supply_partner.partner_guid
            }
        });
    }

}
