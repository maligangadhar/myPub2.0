import { Component, HostListener , OnDestroy } from '@angular/core';
@Component({
    selector: 'gc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnDestroy {
    @HostListener('window:beforeunload', ['$event'])
    clearLocalStorage(event) {
       // localStorage.clear();
    }
    ngOnDestroy() {
        localStorage.removeItem('token');
    }
}
