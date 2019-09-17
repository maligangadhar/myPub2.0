import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { BroadcastService } from '../../services/broadcast.service';
import { IKeyData } from '../../models/viewModels';
@Component({
    selector: 'gc-supply-partner',
    templateUrl: './supply-partner.component.html',
    styleUrls: ['./supply-partner.component.scss'],
    animations: [routerTransition()]
})
export class SupplyPartnerComponent implements OnInit {
    spType = 'search';
    selectedGuid = 0;
    guid = '' ;
    spId = '' ;
    selSiteObj: any;

    constructor(private broadcastService: BroadcastService) {
        const vm = this;
        vm.broadcastService.DataChange.subscribe((result: IKeyData) => {
            this.spType = result.key;
        });
    }
    ngOnInit() {
    }
    spSelect = function () {
        this.spType = 'detail';
    };
    onCreateGUID = function (event) {
        this.spId = event.login;
        this.guid = event.guid;
        this.spType = 'createGuid';
        this.router.navigate(['placementSettings']);
    };
    onGetAllGUID = function (event) {
        this.spId = event.login;
        this.guid = event.guid;
        this.spType = 'site';
    };
    onSiteView  = function (event) {
        this.selSiteObj = event;
        this.spType = 'siteDetail';
    };
    onEditGuid = function (event) {
        this.spId = event.spId;
        this.spName = event.spName;
        this.spType = 'editGuid';
        this.router.navigate(['placementSettings']);
    };
    editSPDetails = function (guid) {
        this.selectedGuid = guid;
        this.spType = 'editSP';
    };
}
