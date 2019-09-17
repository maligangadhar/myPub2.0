import { Component, OnInit, HostListener } from '@angular/core';
import { PlacementService } from '../../../../services/placement.service';
import { UserService } from '../../../../services/user.service';
import { IUserDetails } from '../../../../models/viewModels';
import { Router } from '@angular/router';
import { DialogBoxService } from '../../../../services/dialog-box.service';
import { BroadcastService } from '../../../../services/broadcast.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'gc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  msgs = [];
  height: number;
  rowCount: number = 0;
  userCount: number = 0;
  timer: number = 3000;
  userData: IUserDetails[] = [];
  userDetailsLoading: boolean = false;
  placementDetailsLoading: boolean = false;
  searchText: string = '';
  dialog_box_content: string = '';
  newUser: string = '';
  userFlag: boolean = true;
  selectedUser: string = '';
  selectedUserCopy: string = '';
  selected_userId: string = '';
  editEmailFlag: boolean = false;
  placementDetails: any = [];
  selected_placement: string = '';
  pageCount: number = 0;
  pageNumber: number = 1;
  optionFlag: boolean = false;
  selectAllPlacementFlag: boolean = false;
  users: string[] = [];
  filteredUsers: any[];
  associated_user: string = '';
  tableBodyId: string = 'searchUserBody';
  private subject: Subject<string> = new Subject();

  constructor(private placementService: PlacementService, private broadcast: BroadcastService, private dialogService: DialogBoxService, private userService: UserService, private router: Router) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height = window.innerHeight - 200;
  }
  ngOnInit() {
    this.height = window.innerHeight - 200;
    this.getUserDetails(1);
    // set debounce time for search
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(searchTextValue => {
      this.onSearch(searchTextValue);
    });
  }

  /**
   * get user details 
   * @param page 
   */
  getUserDetails(page) {
    this.userDetailsLoading = true;
    this.userService.getUserDetails(page, this.searchText).subscribe((result) => {
      this.userData = result['data'];
      this.pageCount = result['page_count'] * 100;
      this.userDetailsLoading = false;
    }, error => {
      this.processErrorMessages(error);
    });
  }

  /***
   * search user info details
   */
  onSearch = (searchTextValue) => {
    this.userDetailsLoading = true;
    this.userService.getSearchAllDetails(searchTextValue).subscribe((result) => {
      this.userData = result['data'];
      this.userCount = this.userData.length;
      this.userDetailsLoading = false;
    }, error => {
      this.processErrorMessages(error);
    });
  }

  /**
   * on ley up search
   * @param event 
   */
  onKeyUp(event: any) {
    if (event.target.value) {
      // this.onSearch(event.target.value);
      this.subject.next(event.target.value);
    } else {
      this.getUserDetails(this.pageNumber);
    }
    setTimeout(() => {
      if (document.getElementById(this.tableBodyId)) {
        this.userCount = document.getElementById(this.tableBodyId).getElementsByTagName('tr').length;
      }
    }, 500);
  }
  /**
   * check for select all true/false
   */
  checkSelectAll = (event) => {
    const totalCount = this.placementDetails.length;
    let counter = 0;
    this.placementDetails.forEach(placement => {
      if (!placement.enabled) {
        this.selectAllPlacementFlag = false;
      } else {
        counter += 1;
      }
    });
    if (totalCount === counter) {
      this.selectAllPlacementFlag = true;
    }
  }
  /**
   * add new user 
   */
  addNewUser = (content) => {
    this.dialog_box_content = 'Enter user email address';
    this.newUser = '';
    this.dialogService.onClickDialog(content).then((result) => {
      if (result === 1) {
        this.msgs = [];
        this.userDetailsLoading = true;
        const param = {
          'user': { 'email': this.newUser }
        };
        this.userService.createNewUSer(param).subscribe((result: any) => {
          this.getUserDetails(1);
          this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Successfully added user ' + this.newUser });
          this.triggerTimeOut();
          this.userDetailsLoading = false;
        }, error => {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message']['email'] });
          this.triggerTimeOut();
          this.userDetailsLoading = false;
          if (error['status'] && error['status'] === 401) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('token');
            setTimeout(() => {
              this.msgs = [];
              this.router.navigate(['login']);
            }, this.timer);
          }
        });
      }
    });
  }
  /***
   * on user clik to show its placement details
   */
  onUserClick = (user) => {
    this.userFlag = false;
    this.associated_user = '';
    this.selectedUser = user.email;
    this.selected_userId = user.id;
    this.placementDetailsLoading = true;
    this.userService.getUserById(user.id).subscribe((result: any) => {
      this.placementDetails = result.placements;
      this.rowCount = result.placements.length;
      this.placementDetails.forEach(item => {
        if (!item.placement_name) {
          item.placement_name = item.login;
        }
      });
      this.placementDetailsLoading = false;
    }, error => {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
      this.triggerTimeOut();
      this.placementDetailsLoading = false;
    });
  }

  /**
   * show email address in text box to edit 
   */
  editEmailDetails = () => {
    this.editEmailFlag = true;
    this.selectedUserCopy = this.selectedUser;
  }

  /**
   * clear search
   */
  onClearSearch = () => {
    this.searchText = '';
    this.getUserDetails(this.pageNumber);
    this.userCount = 0;
  }

  /**
   * cancel edit email settings
   */
  cancelEditEmail = () => {
    this.editEmailFlag = !this.editEmailFlag;
    this.selectedUser = this.selectedUserCopy;
  }
  /**
   * 
   */
  navOptions = () => {
    this.optionFlag = true;
  }

  /***
   * select all 
   */
  selectAll = () => {
    this.placementDetails.forEach(placement => {
      if (this.selectAllPlacementFlag) {
        placement.enabled = true;
      } else {
        placement.enabled = false;
      }
    });
  }
  /**
   * edit user email address
   */
  editUserEmailAddress = () => {
    this.editEmailFlag = false;
    this.optionFlag = false;
    const param = {
      'user': { 'email': this.selectedUser, 'id': this.selected_userId }
    };
    this.userService.updateUserEmail(this.selected_userId, param).subscribe((result: any) => {
      this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Successfully updated email address' });
      this.triggerTimeOut();
    }, error => {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message']['email'] });
      this.triggerTimeOut();
    });
  }

  /**
   *  navigate  to plcement detail page
   */
  onSiteView = (placement) => {
    this.broadcast.broadcast('placement', 'true');
    this.router.navigate(['placements'], {
      queryParams: {
        'guid': placement.guid, 'name': placement.login,
        'id': placement.partner_id, 'spId': placement.partner_guid, 'spName': placement.partner_name
      }
    });
  }

  /***
   * delete placement 
   */
  deletePlacement = (site, content) => {
    this.selected_placement = site.placement_name;
    this.dialogService.onClickDialog(content).then((result) => {
      if (result === 1) {
        this.userService.deleteUserPlacements(this.selected_userId, site.guid).subscribe((result: any) => {
          this.placementDetails = result.placements;
          this.placementDetails.forEach(item => {
            if (!item.placement_name) {
              item.placement_name = item.login;
            }
          });
          this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Successfully deleted ' + site.placement_name });
          this.triggerTimeOut();
        }, error => {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
          this.triggerTimeOut();
        });
      }
    });
  }
  /**
   * process error messages
   */
  processErrorMessages = (error) => {
    this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
    this.triggerTimeOut();
    this.userDetailsLoading = false;
    if (error['status'] && error['status'] === 401) {
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('token');
      setTimeout(() => {
        this.msgs = [];
        this.router.navigate(['login']);
      }, this.timer);
    }
  }

  /**
   * back to user list
   */
  backToUserList = () => {
    this.userFlag = !this.userFlag;
    this.searchText = '';
    this.getUserDetails(1);
    this.optionFlag = false;
    this.editEmailFlag = false;
  }

  /**
   * clone selected placemenet to new user
   */
  cloneUser = () => {
    const selectedPlacement = [];
    this.placementDetails.forEach(placement => {
      if (placement.enabled) {
        selectedPlacement.push(placement.guid);
      }
    });
    if (selectedPlacement.length < 1) {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Please select placements to associate with user' });
      this.triggerTimeOut();
    } else {
      let selectedUser = '';
      const cloneObj = {
        'user': {
          'email': this.associated_user,
          'placements': selectedPlacement
        }
      };
      // get the selected user id 
      this.users.forEach(users => {
        if (users['email'] === this.associated_user) {
          selectedUser = users['id'];
        }
      });
      if (selectedUser) {
        // API service to save placements for existing users
        this.userService.saveUserClonePlacements(selectedUser, cloneObj).subscribe(results => {
          this.handleUserCloneSuccess();
        }, error => {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to associate selected placements for ' + this.associated_user });
          this.triggerTimeOut();
        });
      } else {
        this.userService.saveNewUserClonePlacements(cloneObj).subscribe(results => {
          this.handleUserCloneSuccess();
        }, error => {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to associate selected placements for ' + this.associated_user });
          this.triggerTimeOut();
        });
      }
    }
  }

  /**
   * handle success clone
   */
  handleUserCloneSuccess = () => {
    this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Successfully  associated placements for ' + this.associated_user });
    this.associated_user = '';
    this.selectAllPlacementFlag = false;
    this.placementDetails.forEach(placement => {
      placement.enabled = false;
    });
    this.triggerTimeOut();
  }
  /**
     * filtering the users
     * @param event 
     */
  filterUsers(event) {
    this.userService.getUserDetailsBySearch(event.query).subscribe(results => {
      this.users = results['data'];
      this.filteredUsers = [];
      for (let i = 0; i < this.users.length; i++) {
        const userEmail = this.users[i]['email'];
        this.filteredUsers.push(userEmail);
      }
    });
  }

  /***
   * paginate user details
   */
  paginate = (event) => {
    this.searchText = '';
    this.pageNumber = event.page + 1;
    this.getUserDetails(event.page + 1);
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
