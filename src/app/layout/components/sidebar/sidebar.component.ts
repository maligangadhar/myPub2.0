import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BroadcastService } from '../../../services/broadcast.service';
import { IKeyData } from '../../../models/viewModels';
import { SiteService } from '../../../services/site.service';
import { environment } from '../../../../environments/environment';
@Component({
    selector: 'gc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    adSettingFlag: boolean = false;
    dialog_box_content: string;
    placement_guid: string = '';
    loginFlag: boolean = false;

    router_link = {
        sp: 'sp',
        ads: 'adSettings',
        css: 'clientSideSetting',
        rvs: 'realVedioSetting',
        tag: 'tag',
        account: 'account',
        users: 'users'
    };

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router: Router, private broadcastService: BroadcastService, private siteService: SiteService) {
        const vm = this;
        this.adSettingFlag = false;
        if (this.router.url === '/login') {
            this.loginFlag = true;
        } else {
            this.loginFlag = false;
        }
        
        vm.broadcastService.DataChange.subscribe((result: IKeyData) => {
            if ('placement' === result.key) {
                this.adSettingFlag = result.data;
            }
        });
        vm.broadcastService.DataChange.subscribe((result: IKeyData) => {
            if ('login' === result.key) {
                if (localStorage.getItem('token') && localStorage.getItem('isLoggedin')) {
                    this.loginFlag = false;
                } else {
                    this.loginFlag = result.data;
                }
            }
        });
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        // this.translate.use(language);
    }

    async onClickNavigate(content, route_url) {
        if (this.router.url !== '/' + route_url) {
            this.router.navigate(['./' + route_url]);
        }
    }
    navToPlacement = () => {
        let placement_guid = '', selected_sp = '', selected_id = '';
        this.siteService.placement_guid.subscribe(guid => placement_guid = guid);
        this.siteService.selected_sp.subscribe(sp => selected_sp = sp);
        this.siteService.selected_id.subscribe(sp_id => selected_id = sp_id);
        this.router.navigate(['placementSettings'], { queryParams: { guid: placement_guid, name: selected_sp, id: selected_id } });
    }
    navToSupplyPartner = () => {
        this.broadcastService.broadcast('sideBarSP', true);
        this.router.navigate(['sp']);
    }
    navToReporting = () => {
        const win = window.open(environment.udUrl, '_blank');
        win.focus();
    }
    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['login']);
    }
}
