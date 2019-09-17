import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from '../../../../services/site.service';
import { routerTransition } from '../../../../router.animations';
import { ISiteSearch, IKeyData } from '../../../../models/viewModels';
import { Subject } from 'rxjs';
import { BroadcastService } from '../../../../services/broadcast.service';
import { Message } from 'primeng/components/common/api';
@Component({
    selector: 'gc-sp-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    animations: [routerTransition()]
})
export class SearchComponent implements OnInit {
    rowCount: number;
    displaySiteDetails: Array<any> = [];
    throttle = 400;
    siteDetails: any;
    tableBodyId: string = 'searchTableBody';
    totalSiteDetails: any;
    reloadFlag: string;
    totalRecords: number = 0;
    params: any;
    searchText: string = '';
    searchDetailsLoading: boolean;
    userFilter: any = { login: '' };
    globalSearchText: string = '';
    ngUnsubscribe: Subject<any> = new Subject<any>();
    @Output() onSPClick: any = new EventEmitter();
    height: number;
    token: string = '';
    msgs: Message[] = [];
    timer: number = 3000;
    showGuidFlag: boolean = false;
    prevNavigateRoute: string = '';

    constructor(private service: SiteService, private router: Router, private route: ActivatedRoute, private broadcastService: BroadcastService) {
        const vm = this;
        vm.broadcastService.DataChange.subscribe((result: IKeyData) => {
            if ('search' === result.key) {
                this.getSearchDetails(result.data);
            }
        });
        vm.token = this.route.snapshot.queryParamMap.get('gc_token');
        if (vm.token) {
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('token', vm.token);
        }
        this.broadcastService.broadcast('login', false);
    }

    ngOnInit() {
        this.service.siteSearchText.subscribe(currentSearch => this.globalSearchText = currentSearch);
        this.service.siteReloadFlag.subscribe(currentReloadFlag => this.reloadFlag = currentReloadFlag);
        this.getSearchDetails(this.globalSearchText);
        this.height = window.innerHeight - 190;
        localStorage.setItem('partnerName', '');
        localStorage.setItem('partnerGuid', '');
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.height = window.innerHeight - 190;
    }
    /**
     * @param site on site view details
     */
    onSiteView(site: ISiteSearch) {
        if (site) {
            this.broadcastService.broadcast('spDetails', 'true');
            this.service.setSiteDetails(site.partner_guid, site.partner_name, site.id);
            localStorage.setItem('partnerGuid', site.partner_guid);
            localStorage.setItem('partnerName', site.partner_name);
            this.router.navigate(['spDetail'], { queryParams: { id: site.id, name: site.partner_name, guid: site.partner_guid } });
        }
    }

    /**
     * Update row count
     */
    updateRowCount() {
        setTimeout(() => {
            this.rowCount = document.getElementById(this.tableBodyId).getElementsByTagName('tr').length;
        }, 500);
    }
    /**
     * get search details
     */
    getSearchDetails = (searchText: string) => {
        this.searchDetailsLoading = true;
        this.showGuidFlag = false;
        searchText = searchText.trim();
        const searchParam = {
            'q': searchText
        };
        this.service.getSPList(searchParam).subscribe((result: Array<any>) => {
            if (result) {
                this.prevNavigateRoute = this.router.url;
                localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
                this.siteDetails = result;
                this.displaySiteDetails = result;
                this.displaySiteDetails.forEach(site => {
                    if (site['sites']) {
                        site['sites'].forEach(siteList => {
                            if (siteList['guid'].toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                                site['guid'] = siteList['guid'];
                                site['placement_name'] = (siteList['placement_name']) ? siteList['placement_name'] : siteList['login'];
                                this.showGuidFlag = true;
                            }
                        });
                    }
                });
                this.totalRecords = result.length;
                if (!this.reloadFlag) {
                    this.searchText = '';
                }
                if (this.displaySiteDetails.length === 0) {
                    this.rowCount = 0;
                }
            }
            this.searchDetailsLoading = false;
        }, error => {
            this.searchDetailsLoading = false;
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
            if (error['status'] && error['status'] === 401) {
                localStorage.removeItem('isLoggedin');
                localStorage.removeItem('token');
                this.broadcastService.broadcast('login', 'true');
                setTimeout(() => {
                    this.msgs = [];
                    this.router.navigate(['login']);
                }, this.timer);
            }
        });
    }
    /**
     * navigation to placement details
     */
    navToPlacementDetailPage = (placement) => {
        this.router.navigate(['placements'], {
            queryParams: { 'guid': placement.guid, 'name': placement.placement_name, 'spId': placement.partner_guid, 'spName': placement.partner_name, 'id': placement.id }
        });
    }
    /**
     * time out interval for hide messages
     */
    triggerTimeOut() {
        setTimeout(() => {
            this.msgs = [];
        }, this.timer);
    }
    /**
     * clear search
     */
    onClearSearch() {
        this.searchText = '';
        this.rowCount = 0;
    }
    /**
     * On search details
     */
    onSearch = (searchText: string) => {
        this.getSearchDetails(searchText);
    }
}
