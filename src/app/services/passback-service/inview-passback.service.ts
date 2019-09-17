import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InViewPassback } from '../../models/viewModels';

@Injectable({
  providedIn: 'root'
})
export class InviewPassbackService {

  setInviewDesktop: (inviewDesktop: boolean) => void;
  setInviewPhone: (inviewPhone: boolean) => void;
  setInviewTablet: (inviewTablet: boolean) => void;

  setInviewDesktopValue: (desktopPassbackTagValue: string) => void;
  setInviewPhoneValue: (tabletPassbackTagValue: string) => void;
  setInviewTabletValue: (phonePassbackTagValue: string) => void;

  desktopPassbackTagValue = new BehaviorSubject('');
  tabletPassbackTagValue = new BehaviorSubject('');
  phonePassbackTagValue = new BehaviorSubject('');

  inviewDesktopFlag = new BehaviorSubject<boolean>(false);
  inviewPhoneFlag = new BehaviorSubject<boolean>(false);
  inviewTabletFlag = new BehaviorSubject<boolean>(false);

  pillarInview: InViewPassback = {
    desktopPassback: false,
    phonePassback: false,
    tabletPassback: false
  };
  adhesionInview: InViewPassback = {
    desktopPassback: false,
    phonePassback: false,
    tabletPassback: false
  };
  videoPillarInview: InViewPassback = {
    desktopPassback: false,
    phonePassback: false,
    tabletPassback: false
  };

  constructor() {
    this.setInviewDesktop = (inviewDesktopFlag: boolean) => {
      this.inviewDesktopFlag.next(inviewDesktopFlag);
    };
    this.setInviewPhone = (inviewPhoneFlag: boolean) => {
      this.inviewPhoneFlag.next(inviewPhoneFlag);
    };
    this.setInviewTablet = (inviewTabletFlag: boolean) => {
      this.inviewTabletFlag.next(inviewTabletFlag);
    };
    this.setInviewDesktopValue = (desktopPassbackTagValue: string) => {
      this.desktopPassbackTagValue.next(desktopPassbackTagValue);
    };
    this.setInviewTabletValue = (tabletPassbackTagValue: string) => {
      this.tabletPassbackTagValue.next(tabletPassbackTagValue);
    };
    this.setInviewPhoneValue = (phonePassbackTagValue: string) => {
      this.phonePassbackTagValue.next(phonePassbackTagValue);
    };
  }

  captureInviewPassback = (placementDetails, ad_product) => {
    if (ad_product === 3 && placementDetails && placementDetails.hasOwnProperty('desktop')) {
      this.videoPillarInview.desktopPassback = placementDetails['desktop'];
    } else {
      let not_enabled_count = 0;
      if (placementDetails && placementDetails.hasOwnProperty('desktop') && placementDetails['desktop']) {
        placementDetails['desktop'].forEach(ad_unit => {
          if (ad_unit.enabled) {
            (ad_product === 1) ? this.pillarInview.desktopPassback = true : this.adhesionInview.desktopPassback = true;
          } else {
            not_enabled_count = not_enabled_count + 1;
          }
        });

        if (not_enabled_count === placementDetails['desktop'].length) {
          (ad_product === 1) ? this.pillarInview.desktopPassback = false : this.adhesionInview.desktopPassback = false;
        }
      }

      not_enabled_count = 0;
      if (placementDetails && placementDetails.hasOwnProperty('tablet') && placementDetails['tablet']) {
        placementDetails['tablet'].forEach(ad_unit => {
          if (ad_unit.enabled) {
            (ad_product === 1) ? this.pillarInview.tabletPassback = true : this.adhesionInview.tabletPassback = true;
          } else {
            not_enabled_count = not_enabled_count + 1;
          }
        });
        if (not_enabled_count === placementDetails['tablet'].length) {
          (ad_product === 1) ? this.pillarInview.tabletPassback = false : this.adhesionInview.tabletPassback = false;
        }
      }

      not_enabled_count = 0;
      if (placementDetails && placementDetails.hasOwnProperty('mobile') && placementDetails['mobile']) {
        placementDetails['mobile'].forEach(ad_unit => {
          if (ad_unit.enabled) {
            (ad_product === 1) ? this.videoPillarInview.phonePassback = true : this.videoPillarInview.phonePassback = true;
          } else {
            not_enabled_count = not_enabled_count + 1;
          }
        });
        if (not_enabled_count === placementDetails['mobile'].length) {
          (ad_product === 1) ? this.videoPillarInview.phonePassback = false : this.videoPillarInview.phonePassback = false;
        }
      }
    }

    if (this.pillarInview.desktopPassback || this.adhesionInview.desktopPassback || this.videoPillarInview.desktopPassback) {
      this.setInviewDesktop(true);
    } else if (!this.pillarInview.desktopPassback && !this.adhesionInview.desktopPassback && !this.videoPillarInview.desktopPassback) {
      this.setInviewDesktop(false);
    }
    if (this.pillarInview.tabletPassback || this.adhesionInview.tabletPassback || this.videoPillarInview.tabletPassback) {
      this.setInviewTablet(true);
    } else if (!this.pillarInview.tabletPassback && !this.adhesionInview.tabletPassback && !this.videoPillarInview.tabletPassback) {
      this.setInviewTablet(false);
    }
    if (this.pillarInview.phonePassback || this.adhesionInview.phonePassback || this.videoPillarInview.phonePassback) {
      this.setInviewPhone(true);
    } else if (!this.pillarInview.phonePassback && !this.adhesionInview.phonePassback && !this.videoPillarInview.phonePassback) {
      this.setInviewPhone(false);
    }
  }
}
