import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'gc-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    height: number;

    constructor(private router: Router) {
        router.events.subscribe((val) => {
            // see also 
            if (val instanceof NavigationEnd) {
                val.url === '/activity' ? document.getElementById('mainContainer').style.overflowY = 'hidden' : document.getElementById('mainContainer').style.overflowY = 'auto';
            }
            
        });
    }

    ngOnInit() {
        this.height = window.innerHeight - 60;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.height = window.innerHeight - 60;
    }
}
