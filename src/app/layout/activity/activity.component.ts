import { Component, OnInit, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { IActivity } from '../../models/viewModels';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BroadcastService } from '../../services/broadcast.service';
@Component({
  selector: 'gc-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {
  rowCount: number;
  displayactivityDetails: IActivity[] = [];
  number_of_sites = 20;
  totalactivityDetails: any;
  throttle = 400;
  scrollDistance = 0.01;
  totalRecords: number = 0;
  params: any;
  height: any;
  searchText: string = '';
  globalSearchText: string = '';
  searchDetailsLoading: boolean;
  userFilter: any = { login: '' };
  msgs: Message[] = [];
  timer: number = 3000;
  tableBodyId: string = 'activityTableBody';
  @Output() onSPClick: any = new EventEmitter();
  private _destroy$ = new Subject();
  prevNavigateRoute: string = '';

  constructor(private service: SiteService, private router: Router, private broadcast: BroadcastService) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height = window.innerHeight - 210;
  }
  ngOnInit() {
    this.prevNavigateRoute = this.router.url;
    localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
    this.service.siteSearchText.subscribe(currentSearch => this.globalSearchText = currentSearch);
    this.searchDetailsLoading = true;
    this.getSearchDetails(1);
    this.height = window.innerHeight - 210;
  }

  /**
   * get search activity details
   */
  getSearchDetails = (pageNumber) => {
    this.service.getActivityList(pageNumber, this.searchText.trim()).pipe(takeUntil(this._destroy$)).subscribe((result: IActivity[]) => {
      this.displayactivityDetails = result['content'];
      this.totalRecords = result['page_count'] * 100;
      this.searchDetailsLoading = false;
    }, error => {
      this.searchDetailsLoading = false;
      this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
      this.triggerTimeOut();
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

  /**
   * update row count
   */
  updateRowCount = () => {
    this.rowCount = document.getElementById(this.tableBodyId).getElementsByTagName('tr').length;
  }
  /**
   * clear search 
   */
  onClearSearch() {
    this.searchText = '';
    this.rowCount = 0;
  }

  /**
   * on search activity
   */
  onSearch = (searchText: string) => {
    this.searchDetailsLoading = true;
    this.service.searchActivityListBy(searchText.trim()).pipe(takeUntil(this._destroy$)).subscribe((result: IActivity[]) => {
      this.displayactivityDetails = result['content'];
      this.totalRecords = result['page_count'] * 100;
      this.searchDetailsLoading = false;
      this.rowCount = result['content'].length;
    }, error => {
      this.searchDetailsLoading = false;
      this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
      this.triggerTimeOut();
    });
  }
  /**
   * error message time out
   */
  triggerTimeOut() {
    setTimeout(() => {
      this.msgs = [];
    }, this.timer);
  }
  /**
   * paginate 
   */
  paginate = (event) => {
    this.searchText = '';
    this.getSearchDetails(event.page + 1);
    setTimeout(() => {
      this.updateRowCount();
    }, 300);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
