import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SiteService } from '../../../services/site.service';
import { BroadcastService } from '../../../services/broadcast.service';
import { IKeyData, CurrentUserDetails } from '../../../models/viewModels';

@Component({
    selector: 'gc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    closeResult: any;
    dialog_box_content: string;
    pushRightClass: string = 'push-right';
    logginUSer: string;
    loginFlag: boolean = false;
    globalSearchText: string = '';
    reloadFlag: string = '';
    constructor(public router: Router, private service: SiteService, private broadcast: BroadcastService) {

        // this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        // this.translate.setDefaultLang('en');
        // const browserLang = this.translate.getBrowserLang();
        // this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        if (this.router.url === '/login') {
            this.loginFlag = true;
        } else {
            this.loginFlag = false;
        }
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.broadcast.DataChange.subscribe((result: IKeyData) => {
            if ('login' === result.key) {
                if (localStorage.getItem('token') && localStorage.getItem('isLoggedin')) {
                    this.loginFlag = false;
                } else {
                    this.loginFlag = result.data;
                }
            }
            if ('sideBarSP' === result.key) {
                this.onClearSearch();
            }
        });
    }
    /**
     * refresh page route to sp
     */
    refreshPage () {
        this.router.navigate(['sp']);
    }
    ngOnInit() {
        this.getCurrentUserDetails();
    }

    getCurrentUserDetails = () => {
        this.service.getCurrentUserDetails().subscribe((response: CurrentUserDetails) => {
            if (response && response.name) {
               this.logginUSer = response.name;
            }
            this.broadcast.broadcast('user', this.logginUSer);
        });
    }

    onClearSearch() {
        this.globalSearchText = '';
        this.onSearch();
    }

    onSearch() {
        this.broadcast.broadcast('search', this.globalSearchText);
        this.service.setSearch(this.globalSearchText);
        this.service.setReloadFlag(this.reloadFlag);
        if (this.router.url !== '/sp') {
            this.router.navigate(['sp']);
        }
    }

    addNewSupplyPartner() {
        this.dialog_box_content = 'Are you sure to leave the current page?';
        if (this.router.url !== '/addSp') {
            this.router.navigate(['addSp']);
            this.broadcast.broadcast('addNewSP', '');
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    /**
     * on logout clear the localStorage and redirect to login page
     */
    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('token');
        this.broadcast.broadcast('login', 'true');
        this.router.navigate(['login']);
        this.service.logout().subscribe((result) => {
            // localStorage.clear();
        }, error => {
            console.log(error);
        });
    }

    changeLang(language: string) {
        // this.translate.use(language);
    }
}
