import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Pillar, InViewPassback } from '../../../../../models/viewModels';
import { InviewPassbackService } from '../../../../../services/passback-service/inview-passback.service';

@Component({
  selector: 'gc-pillar-settings',
  templateUrl: './pillar-settings.component.html',
  styleUrls: ['./pillar-settings.component.scss']
})
export class PillarSettingsComponent implements OnInit, OnChanges {

  PillarDesktopList: any[];
  PillarTabletList: any[];
  PillarPosition: any[];
  PillarAnimation: any[];
  DeviceList: string[];
  SizeList: string[];
  showDeselectButton: boolean = true;
  @Input() PillarMeta;
  @Input() PillarPlacementDetails;
  @Output() Pillar = new EventEmitter<Pillar>();

  inViewPassback: InViewPassback = {
    desktopPassback: false,
    tabletPassback: false,
    phonePassback: false
  };

  constructor(private inviewPassbackService: InviewPassbackService) { }

  ngOnInit() {
    this.PillarPosition = ['top-left', 'bottom-left', 'top-right', 'bottom-right'];
    this.inviewPassbackService.inviewDesktopFlag.subscribe(desktopPassback => this.inViewPassback.desktopPassback = desktopPassback);
    this.inviewPassbackService.inviewTabletFlag.subscribe(tabletPassback => this.inViewPassback.tabletPassback = tabletPassback);
    this.inviewPassbackService.inviewPhoneFlag.subscribe(phonePassback => this.inViewPassback.phonePassback = phonePassback);
    this.onCheckBoxClick();
    this.updateAnimation();
  }

  ngOnChanges() {
    if (this.PillarPlacementDetails) {
      this.PillarDesktopList = this.PillarPlacementDetails.ad_settings['Pillar'].desktop;
      this.PillarTabletList = this.PillarPlacementDetails.ad_settings['Pillar'].tablet;
    }
  }

  /**
   * onCheckboxClick is triggered on every checkbox click and updates the status of all the ad-units in PillarPlacementDetails.
   * After updating, the emits the settings json to placementSettingsComponent
   */
  onCheckBoxClick() {
    let deselectFlag = 1;
    if (this.PillarDesktopList) {
      this.PillarDesktopList.forEach(element => {
        if (element.enabled !== true) {
          deselectFlag = 0;
        }
      });
    }
    if (this.PillarTabletList) {
      this.PillarTabletList.forEach(element => {
        if (element.enabled !== true) {
          deselectFlag = 0;
        }
      });
    }
    if (this.PillarPlacementDetails
      && this.PillarPlacementDetails.hasOwnProperty('ad_settings')
      && this.PillarPlacementDetails['ad_settings'].hasOwnProperty('Pillar')) {
      this.inviewPassbackService.captureInviewPassback(this.PillarPlacementDetails['ad_settings']['Pillar'], 1);
    }
    deselectFlag ? this.showDeselectButton = true : this.showDeselectButton = false;
    this.Pillar.emit(this.PillarPlacementDetails);
  }

  /**
   * emit pillar details
   */
  emitPillarDetails(newValue) {
    if (this.PillarPlacementDetails) {
      if (this.PillarPlacementDetails['sic_site_setting']
        && this.PillarPlacementDetails['sic_site_setting'].hasOwnProperty('max_content_push')) {
        this.PillarPlacementDetails['sic_site_setting']['max_content_push'] = newValue;
      }
      this.Pillar.emit(this.PillarPlacementDetails);
    }
  }

  innerSelect = (value: boolean) => {
    if (this.PillarDesktopList) {
      this.PillarDesktopList.forEach(element => {
        element.enabled = value;
      });
    }
    if (this.PillarTabletList) {
      this.PillarTabletList.forEach(element => {
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

  /** 
   * Catches the emit from passback component
  */
  updateAnimation = () => {
    if (this.PillarPlacementDetails && this.PillarPlacementDetails['sic_site_setting'] && this.PillarPlacementDetails['sic_site_setting'].hasOwnProperty('tb_position')) {
      if ((this.PillarPlacementDetails['sic_site_setting']['tb_position'] === 'top-left') ||
        (this.PillarPlacementDetails['sic_site_setting']['tb_position'] === 'bottom-left')) {
        this.PillarAnimation = ['overlay', 'push'];
      } else if ((this.PillarPlacementDetails['sic_site_setting']['tb_position'] === 'top-right') ||
        (this.PillarPlacementDetails['sic_site_setting']['tb_position'] === 'bottom-right')) {
        this.PillarAnimation = ['overlay'];
        this.PillarPlacementDetails['sic_site_setting']['tb_animation'] = 'overlay';
      }
    }
  }

  // UpdatePassback reads the passbacks of the placement that comes as input from placement settings component
  updatePassback(event) {
    if (this.PillarPlacementDetails && this.PillarPlacementDetails['sic_site_setting']) {
      this.PillarPlacementDetails['sic_site_setting']['inview_desktop_passback'] = event.desktop;
      this.PillarPlacementDetails['sic_site_setting']['inview_mobile_passback'] = event.mobile;
      this.PillarPlacementDetails['sic_site_setting']['inview_tablet_passback'] = event.tablet;
    }
  }
}

