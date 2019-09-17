import { Component, OnInit, HostListener } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { IMessageDetail } from '../../../models/viewModels';
import { Message } from 'primeng/components/common/api';
import { DialogBoxService } from '../../../services/dialog-box.service';
import { Router } from '@angular/router';
import { BroadcastService } from '../../../services/broadcast.service';
@Component({
  selector: 'gc-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  custom: boolean = false;
  height: number;
  customeMessage: string = '';
  msgs: Message[] = [];
  systemDown: boolean = false;
  delay: boolean = false;
  tryagain: boolean = false;
  cmsg: boolean = false;
  selectedValues: string[] = [];
  messageDetails: IMessageDetail[] = [];
  showCustomeMessage: boolean = false;
  msgLoading: boolean = false;
  msgSelectFlag: boolean = false;
  dialog_box_content: string = '';
  timer: number = 3000;
  prevNavigateRoute: string = '';
  constructor(private broadcast: BroadcastService, private service: SiteService, private dialogService: DialogBoxService, private router: Router) { }

  ngOnInit() {
    this.prevNavigateRoute = this.router.url;
    localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
    this.height = window.innerHeight - 180;
    this.getMessageDetails();
  }
  /**
   * get message details
   */
  getMessageDetails() {
    this.msgLoading = true;
    this.service.getDashboardMessage().subscribe((result: IMessageDetail[]) => {
      this.messageDetails = result;
      this.msgLoading = false;
      this.messageDetails.forEach(msg => {
        msg.size = msg.message;
        msg.enabled = (msg.location === 'dashboard') ? true : false;
        if (!this.msgSelectFlag && msg.enabled) {
          this.msgSelectFlag = msg.enabled;
        }
        if (msg.message_type === 'custom') {
          msg.size = 'Create Custom message';
          this.customeMessage = msg.html;
          if (msg.enabled) {
            this.showCustomeMessage = true;
          }
        }
      });
    }, error => {
      this.msgLoading = false;
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
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height = window.innerHeight - 180;
  }
  /**
   * handle for checkbox select/unselect 
   * @param msg 
   */
  onCheckBoxClick(msg) {
    msg.selected = msg.enabled;
    this.messageDetails.forEach((value) => {
      if (msg.enabled && value.id === msg.id) {
        value.enabled = true;
      } else {
        value.enabled = false;
      }
      if (value.message_type === 'custom') {
        value.enabled ? this.showCustomeMessage = true : this.showCustomeMessage = false;
      }
    });
  }
  /*      
    posting message  :: save 
  */
  postMessage() {
    let messageFlag = false;
    this.msgs = [];
    this.messageDetails.forEach(msg => {
      if (msg.message_type === 'custom' && msg.enabled) {
        msg.message = this.customeMessage;
        if (!this.customeMessage) {
          this.msgs.push({ severity: 'error', summary: 'Info', detail: 'Please enter custom message' });
          this.triggerTimeOut();
          return false;
        }
      }
      if (msg.enabled) {
        messageFlag = true;
      }
    });
    if (messageFlag) {
      this.saveMessageData('save');
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Info', detail: 'Please select atleast one message' });
      this.triggerTimeOut();
    }
  }
  /**
   * delet messages
   * @param content 
   */
  deleteMessage(content) {
    this.dialog_box_content = 'Remove Message ?';
    this.dialogService.onClickDialog(content).then((result) => {
      if (result === 1) {
        this.messageDetails.forEach(msg => {
          msg.enabled = false;
          msg.selected = false;
          this.customeMessage = '';
        });
        this.saveMessageData('delete');
      }
    });
  }

  /**
   * save message details 
   */
  saveMessageData = (type) => {
    this.msgs = [];
    let data = {};
    const msgArr = [];
    if (type === 'save') {
      this.messageDetails.forEach(msg => {
        if (msg.enabled && (msg.message_type === 'reporting' || msg.message_type === 'system')) {
          msgArr.push({ id: msg.id });
        } else if (msg.enabled && msg.message_type === 'custom') {
          msgArr.push({ 'id': msg.id, 'message_type': 'custom', 'message': this.customeMessage });
        }
      });
      data = {
        'data': {
          'action': 'post',
          'messages': msgArr
        }
      };
    } else {
      data = {
        'data': {
          'action': 'delete'
        }
      };
    }
    this.service.saveDashboardMessage(data).subscribe(
      (result) => {
        this.msgSelectFlag = false;
        this.messageDetails.forEach(msg => {
          if (msg.enabled) {
            this.msgSelectFlag = true;
          }
        });
        this.msgs.push({ severity: 'info', summary: 'Info', detail: result['message'] });
        this.triggerTimeOut();
      }, error => {

        if (error['message']) {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error', detail: error });
        }
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
   * time out for hiding error message
   */
  triggerTimeOut() {
    setTimeout(() => {
      this.msgs = [];
    }, this.timer);
  }
}
