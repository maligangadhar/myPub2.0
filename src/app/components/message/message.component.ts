import { Component, OnInit, Input } from '@angular/core';
import { messageType } from '../../models/enum';
import { IMessage } from '../../models/viewModels';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'gc-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  onMessageAdded: (item: IMessage) => void;
  @Input() public id: string;
  @Input() timer?: number = 5000;
  message: IMessage = { message: '', showMessage: false, type: messageType.Success };
  ngOnInit() {
  }
  constructor(private messageService: MessageService) {
    const vm = this;
    vm.messageService.MessageAdded.subscribe(item => this.onMessageAdded(item));
    function triggerTimeOut() {
      setTimeout(function () {
        vm.message.showMessage = false;
      }, vm.timer);
    }
    vm.onMessageAdded = (item: IMessage) => {
      vm.message = item;
      triggerTimeOut();
    };
  }
}


