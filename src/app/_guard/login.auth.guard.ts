import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
