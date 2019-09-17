import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { SIAB } from '../../../../../models/viewModels';

@Component({
  selector: 'gc-siab-settings',
  templateUrl: './siab-settings.component.html',
  styleUrls: ['./siab-settings.component.scss']
})
export class SiabSettingsComponent implements OnInit, OnChanges {

  SiabDesktopList: any[];
  SiabTabletList: any[];
  SiabPhoneList: any[];
  PassbackTagEnable: any = {
    'desktop': [],
    'mobile': [],
    'tablet': []
  };
  DeviceList: string[];
  SizeList: string[];
  @Input() SiabMeta;
  @Input() SiabPlacementDetails;
  @Output() SIAB = new EventEmitter();

  siab_settings: SIAB = {
    desktop: [],
    tablet: [],
    phone: [],
    ads_refresh: false,
    ads_refresh_timer: 30,
    enable_passback_tag: false,
    passback: []
  };
  dialog_box_content: string;
  showDeselectButton: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.SiabPlacementDetails) {
      this.SiabDesktopList = this.SiabPlacementDetails.ad_settings['Standard Display'].desktop;
      this.SiabTabletList = this.SiabPlacementDetails.ad_settings['Standard Display'].tablet;
      this.SiabPhoneList = this.SiabPlacementDetails.ad_settings['Standard Display'].mobile;
      this.selectAllCheck();
      this.onCheckBoxClick();
    }
  }

  onCheckBoxClick() {
    this.selectAllCheck();
    this.SIAB.emit(this.SiabPlacementDetails);
  }
  selectAllCheck = () => {
    let deselectFlag = 1;
    if (this.SiabDesktopList) {
      this.SiabDesktopList.forEach(element => {
        if (element.enabled !== true) {
          deselectFlag = 0;
        }
      });
    }
    if (this.SiabPhoneList) {
      this.SiabPhoneList.forEach(element => {
        if (element.enabled !== true) {
          deselectFlag = 0;
        }
      });
    }
    if (this.SiabTabletList) {
      this.SiabTabletList.forEach(element => {
        if (element.enabled !== true) {
          deselectFlag = 0;
        }
      });
    }

    deselectFlag ? this.showDeselectButton = true : this.showDeselectButton = false;
    this.SIAB.emit(this.SiabPlacementDetails);
  }

  innerSelect = (value: boolean) => {
    if (this.SiabDesktopList) {
      this.SiabDesktopList.forEach(element => {
        element.enabled = value;
      });
    }

    if (this.SiabTabletList) {
      this.SiabTabletList.forEach(element => {
        element.enabled = value;
      });
    }

    if (this.SiabPhoneList) {
      this.SiabPhoneList.forEach(element => {
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
