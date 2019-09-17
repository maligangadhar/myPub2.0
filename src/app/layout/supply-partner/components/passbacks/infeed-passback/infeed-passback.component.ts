import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InFeedPassback } from '../../../../../models/viewModels';
import { InfeedPassbackService } from '../../../../../services/passback-service/infeed-passback.service';
import { BroadcastService } from '../../../../../services/broadcast.service';

@Component({
  selector: 'gc-infeed-passback',
  templateUrl: './infeed-passback.component.html',
  styleUrls: ['./infeed-passback.component.scss']
})
export class InfeedPassbackComponent implements OnInit {

  @Input() inFeedPassback: InFeedPassback;
  @Output() infeedPassbackEmit = new EventEmitter();
  desktopPassbackTagValue: string;
  tabletPassbackTagValue: string;
  phonePassbackTagValue: string;


  constructor(private inFeedPassbackService: InfeedPassbackService, private broadcast: BroadcastService) { }

  ngOnInit() {
    this.inFeedPassbackService.desktopPassbackTagValue.subscribe(desktopPassbackTagValue => this.desktopPassbackTagValue = desktopPassbackTagValue);
    this.inFeedPassbackService.tabletPassbackTagValue.subscribe(tabletPassbackTagValue => this.tabletPassbackTagValue = tabletPassbackTagValue);
    this.inFeedPassbackService.phonePassbackTagValue.subscribe(phonePassbackTagValue => this.phonePassbackTagValue = phonePassbackTagValue);
  }

  updateTagValue = (event, device) => {
    if (device === 1) {
      this.inFeedPassbackService.setInFeedDesktopValue(event);
    } else if (device === 3) {
      this.inFeedPassbackService.setInFeedPhoneValue(event);
    }
    this.infeedPassbackEmit.emit({
      desktop: this.desktopPassbackTagValue,
      mobile: this.phonePassbackTagValue
    });
    this.broadcast.broadcast('infeedDesktopPassback', this.desktopPassbackTagValue);
    this.broadcast.broadcast('infeedPhonePassback', this.phonePassbackTagValue);
  }
}
