import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { SiteService } from '../services/site.service';

@Injectable({ providedIn: 'root' })
export class SpAuthGuard implements CanActivate {
  selected_guid: string = '';
  selected_sp: string = '';
  constructor(private router: Router, private service: SiteService, private route: ActivatedRoute) {
    this.selected_guid = this.route.snapshot.queryParamMap.get('guid');
    this.selected_sp = this.route.snapshot.queryParamMap.get('name');
  }

  canActivate() {
    if (!this.selected_guid) {
      this.service.selected_guid.subscribe(currentData => this.selected_guid = currentData);
      if (!this.selected_guid && localStorage.getItem('partnerGuid')) {
        this.selected_guid = localStorage.getItem('partnerGuid');
      }
    }
    if (!this.selected_sp) {
      if (!this.selected_sp && localStorage.getItem('partnerName')) {
        this.selected_sp = localStorage.getItem('partnerName');
      }
    }
    if (this.selected_guid && this.selected_sp && localStorage.getItem('isLoggedin')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
