import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { BroadcastService } from '../../../../services/broadcast.service';
@Component({
  selector: 'gc-gclogin',
  templateUrl: './gclogin.component.html',
  styleUrls: ['./gclogin.component.scss']
})
export class GcloginComponent implements OnInit {

  constructor(public router: Router, private route: ActivatedRoute, private broadcast: BroadcastService) {
    const token = this.route.snapshot.queryParamMap.get('gc_token');
    if (token) {
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('token', token);
    }
  }

  ngOnInit() {
    this.broadcast.broadcast('login', true);
    const prevNavigateRoute = localStorage.getItem('prevNavigateRoute');
    if (localStorage.getItem('token')) {
      if (prevNavigateRoute) {
        this.router.navigateByUrl(prevNavigateRoute);
        this.broadcast.broadcast('login', false);
      } else {
        this.router.navigate(['sp']);
        this.broadcast.broadcast('login', true);
      }
    }
    if (this.router.url === '/login') {
      this.broadcast.broadcast('login', true);
    }
  }
  signIn = () => {
    window.location.href = environment.authUrl;
  }
}

