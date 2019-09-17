import { Component, OnInit, HostListener } from '@angular/core';
import { BroadcastService } from '../../../services/broadcast.service';
import { Router } from '@angular/router';
import { DialogBoxService } from '../../../services/dialog-box.service';
import { PlacementService } from '../../../services/placement.service';
import { IBanGuid } from '../../../models/viewModels';
@Component({
  selector: 'gc-ban-guid',
  templateUrl: './ban-guid.component.html',
  styleUrls: ['./ban-guid.component.scss']
})
export class BanGUIDComponent implements OnInit {

  height: number;
  selGuidArr: string[] = [];
  msgs = [];
  bannedList: IBanGuid[] = [];
  dialog_box_content: string = '';
  banDetailsLoading: boolean = false;
  timer: number = 3000;
  prevNavigateRoute: string = '';
  searchText: string = '';
  rowCount: number;
  totalBanLength: number; 
  constructor(private dialogService: DialogBoxService, private broadcast: BroadcastService,
    private placementService: PlacementService, private router: Router) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height = window.innerHeight - 250;
  }
  ngOnInit() {
    this.prevNavigateRoute = this.router.url;
    localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
    this.height = window.innerHeight - 250;
    this.getBannedDetails(1);
  }
  /**
   * get banned details 
   */
  getBannedDetails(pageCount) {
    this.banDetailsLoading = true;
    this.placementService.getBannedGUIDList(pageCount).subscribe((result: IBanGuid[]) => {
      this.procesbanData(result);
    }, error => {
        this.processErrorMessages(error);
    });
  }

  /**
   * on search 
   */
  onSearch = (searchText) => {
    this.banDetailsLoading = true;
    this.placementService.getBannedSearchList(searchText).subscribe((result: IBanGuid[]) => {
      this.procesbanData(result);
    }, error => {
        this.processErrorMessages(error);
    });
  }

  procesbanData = (result) => {
    this.bannedList = result['data'];
    this.totalBanLength = result['page_count'] * 100;
    this.banDetailsLoading = false;
  }

  /**
   * process error messages
   */
  processErrorMessages = (error) => {
    this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
    this.triggerTimeOut();
    this.banDetailsLoading = false;
    if (error['status'] && error['status'] === 401) {
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('token');
      this.broadcast.broadcast('login', 'true');
      setTimeout(() => {
        this.msgs = [];
        this.router.navigate(['login']);
      }, this.timer);
    }
  }
  paginate = (event) => {
    this.getBannedDetails(event.page + 1);
  }
  /**
  * clear search 
  */
  onClearSearch() {
    this.searchText = '';
    this.rowCount = 0;
  }

  /**
   * redirect :: to placement details on ban view click 
   */
  onBanView = (ban) => {
    this.broadcast.broadcast('placement', 'true');
    this.router.navigate(['placements'], {
      queryParams: { 'guid': ban.guid, 'name': ban.login, 'id': ban.supply_partner_id, 'spId': ban.partner_guid, 'spName': ban.partner_name }
    });
  }
  /**
   * check for selected ban GUID
   */
  onCheckBoxClick = (banObj) => {
    if (banObj.enabled) {
      if (!this.selGuidArr.includes(banObj.guid)) {
        this.selGuidArr.push(banObj.guid);
      }
    } else {
      const index = this.selGuidArr.indexOf(banObj.guid);
      if (index > -1) {
        this.selGuidArr.splice(index, 1);
      }
    }
  }

  /**
   * un ban site details
   */
  unBanSite = (content) => {
    this.dialog_box_content = 'Remove Selected bans ? ';
    this.dialogService.onClickDialog(content).then((result) => {
      if (result === 1) {
        this.msgs = [];
        const banObj = {
          'data': this.selGuidArr
        };
        this.placementService.unbanPlacement(banObj).subscribe((result: any) => {
          this.getBannedDetails(1);
          this.msgs.push({ severity: 'info', summary: 'Info', detail: result['message'] });
          this.triggerTimeOut();
          this.selGuidArr = [];
        }, error => {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
          this.triggerTimeOut();
          this.banDetailsLoading = false;
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
    });
  }

  /**
   * timeout for error messages
   */
  triggerTimeOut() {
    setTimeout(() => {
      this.msgs = [];
    }, this.timer);
  }
}
