import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { InViewPassback, AdhesionBottomMarginFlag } from '../../../../../models/viewModels';
import { InviewPassbackService } from '../../../../../services/passback-service/inview-passback.service';

@Component({
  selector: 'gc-adhesion-settings',
  templateUrl: './adhesion-settings.component.html',
  styleUrls: ['./adhesion-settings.component.scss']
})
export class AdhesionSettingsComponent implements OnInit, OnChanges {

  AdhesionDesktopList: any[];
  AdhesionTabletList: any[];
  AdhesionMobileList: any[];
  @Output() Adhesion = new EventEmitter();
  @Input() AdhesionMeta;
  @Input() AdhesionPlacementDetails;
  DeviceList: string[];
  SizeList: string[];

  adhesion_bottom_margin_flag: AdhesionBottomMarginFlag = {
    desktop: false,
    tablet: false,
    phone: false
  };
  inViewPassback: InViewPassback = {
    desktopPassback: false,
    tabletPassback: false,
    phonePassback: false,
  };
  showDeselectButton: boolean = true;
  constructor(private inviewPassbackService: InviewPassbackService) { }

  ngOnInit() {
    this.inviewPassbackService.inviewDesktopFlag.subscribe(desktopPassback => this.inViewPassback.desktopPassback = desktopPassback);
    this.inviewPassbackService.inviewTabletFlag.subscribe(tabletPassback => this.inViewPassback.tabletPassback = tabletPassback);
    this.inviewPassbackService.inviewPhoneFlag.subscribe(phonePassback => this.inViewPassback.phonePassback = phonePassback);
    this.onCheckBoxClick();
  }
  ngOnChanges() {
    if (this.AdhesionPlacementDetails) {
      this.AdhesionDesktopList = this.AdhesionPlacementDetails.ad_settings.Adhesion.desktop;
      this.AdhesionTabletList = this.AdhesionPlacementDetails.ad_settings.Adhesion.tablet;
      this.AdhesionMobileList = this.AdhesionPlacementDetails.ad_settings.Adhesion.mobile;
    }
  }

  onCheckBoxClick() {
    let deselectFlag = 1;
    if (this.AdhesionDesktopList) {
      this.AdhesionDesktopList.forEach(element => {
        if (element.enabled !== true) {
          deselectFlag = 0;
        }
      });
    }
    if (this.AdhesionMobileList) {
      this.AdhesionMobileList.forEach(element => {
        if (element.enabled !== true) {
          deselectFlag = 0;
        }
      });
    }
    if (this.AdhesionTabletList) {
      this.AdhesionTabletList.forEach(element => {
        if (element.enabled !== true) {
          deselectFlag = 0;
        }
      });
    }
    deselectFlag ? this.showDeselectButton = true : this.showDeselectButton = false;

    if (this.AdhesionPlacementDetails) {
      this.inviewPassbackService.captureInviewPassback(this.AdhesionPlacementDetails['ad_settings']['Adhesion'], 2);
    }
    this.Adhesion.emit(this.AdhesionPlacementDetails);
  }

  innerSelect = (value: boolean) => {
    if (this.AdhesionDesktopList) {
      this.AdhesionDesktopList.forEach(element => {
        element.enabled = value;
      });
    }

    if (this.AdhesionTabletList) {
      this.AdhesionTabletList.forEach(element => {
        element.enabled = value;
      });
    }
    if (this.AdhesionMobileList) {
      this.AdhesionMobileList.forEach(element => {
        element.enabled = value;
      });
    }
    this.onCheckBoxClick();
  }

  deSelectAll = () => {
    this.innerSelect(false);
  }

  selectAll = () => {
    this.innerSelect(true);
  }
}
