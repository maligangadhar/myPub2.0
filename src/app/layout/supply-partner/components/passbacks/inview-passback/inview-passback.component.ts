import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InviewPassbackService } from '../../../../../services/passback-service/inview-passback.service';
import { BroadcastService } from '../../../../../services/broadcast.service';

@Component({
  selector: 'gc-inview-passback',
  templateUrl: './inview-passback.component.html',
  styleUrls: ['./inview-passback.component.scss']
})
export class InviewPassbackComponent implements OnInit {

  @Input() inViewPassback;
  @Output() inViewPassbackEmit = new EventEmitter();
  desktopPassbackTagValue: string;
  tabletPassbackTagValue: string;
  phonePassbackTagValue: string;
  constructor(private inviewPassbackService: InviewPassbackService, private broadcast: BroadcastService) { }

  ngOnInit() {
    this.inviewPassbackService.desktopPassbackTagValue.subscribe(desktopPassbackTagValue => this.desktopPassbackTagValue = desktopPassbackTagValue);
    this.inviewPassbackService.tabletPassbackTagValue.subscribe(tabletPassbackTagValue => this.tabletPassbackTagValue = tabletPassbackTagValue);
    this.inviewPassbackService.phonePassbackTagValue.subscribe(phonePassbackTagValue => this.phonePassbackTagValue = phonePassbackTagValue);
  }

  updateTagValue = (event, device) => {
    if (device === 1) {
      this.inviewPassbackService.setInviewDesktopValue(event);
    } else if (device === 2) {
      this.inviewPassbackService.setInviewTabletValue(event);
    } else if (device === 3) {
      this.inviewPassbackService.setInviewPhoneValue(event);
    }
    this.inViewPassbackEmit.emit({
      desktop: this.desktopPassbackTagValue,
      mobile: this.phonePassbackTagValue,
      tablet: this.tabletPassbackTagValue
    });
    this.broadcast.broadcast('inviewDesktopPassback', this.desktopPassbackTagValue);
    this.broadcast.broadcast('inviewPhonePassback', this.phonePassbackTagValue);
    this.broadcast.broadcast('inviewTabletPassback', this.tabletPassbackTagValue);
  }
}
