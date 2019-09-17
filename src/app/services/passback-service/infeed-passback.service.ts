import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InFeedPassback } from '../../models/viewModels';

@Injectable({
  providedIn: 'root'
})
export class InfeedPassbackService {

  setInFeedDesktop: (inFeedDesktop: boolean) => void;
  setInFeedPhone: (inFeedPhone: boolean) => void;

  setInFeedDesktopValue: (desktopPassbackTagValue: string) => void;
  setInFeedPhoneValue: (phonePassbackTagValue: string) => void;

  desktopPassbackTagValue = new BehaviorSubject('');
  tabletPassbackTagValue = new BehaviorSubject('');
  phonePassbackTagValue = new BehaviorSubject('');

  inFeedDesktopFlag = new BehaviorSubject<boolean>(false);
  inFeedPhoneFlag = new BehaviorSubject<boolean>(false);
  inFeedTabletFlag = new BehaviorSubject<boolean>(false);

  inFeedImpact: InFeedPassback = {
    desktopPassback: false,
    phonePassback: false,
    tabletPassback: false
  };
  inFeedVideo: InFeedPassback = {
    desktopPassback: false,
    phonePassback: false,
    tabletPassback: false
  };

  constructor() {
    this.setInFeedDesktop = (inFeedDesktopFlag: boolean) => {
      this.inFeedDesktopFlag.next(inFeedDesktopFlag);
    };
    this.setInFeedPhone = (inFeedPhoneFlag: boolean) => {
      this.inFeedPhoneFlag.next(inFeedPhoneFlag);
    };
    this.setInFeedDesktopValue = (desktopPassbackTagValue: string) => {
      this.desktopPassbackTagValue.next(desktopPassbackTagValue);
    };
    this.setInFeedPhoneValue = (phonePassbackTagValue: string) => {
      this.phonePassbackTagValue.next(phonePassbackTagValue);
    };
  }

  captureInFeedPassback = (placementDetails, ad_product) => {

    if (ad_product === 1) {
      if (placementDetails.hasOwnProperty('desktop')) { this.inFeedVideo.desktopPassback = placementDetails.desktop; }
      if (placementDetails.hasOwnProperty('mobile')) { this.inFeedVideo.phonePassback = placementDetails.mobile; }
    }
    if (ad_product === 2) {
      let not_enabled_count = 0;
      if (placementDetails['desktop']) {
        placementDetails['desktop'].forEach(ad_unit => {
          if (ad_unit.enabled) {
            this.inFeedImpact.desktopPassback = true;
          } else {
            not_enabled_count = not_enabled_count + 1;
          }
        });
      }

      if (not_enabled_count === placementDetails['desktop'].length) {
        this.inFeedImpact.desktopPassback = false;
      }

      not_enabled_count = 0;
      if (placementDetails['mobile']) {
        placementDetails['mobile'].forEach(ad_unit => {
          if (ad_unit.enabled) {
            this.inFeedImpact.phonePassback = true;
          } else {
            not_enabled_count = not_enabled_count + 1;
          }
        });
      }

      if (not_enabled_count === placementDetails['mobile'].length) {
        this.inFeedImpact.phonePassback = false;
      }
    }

    if (this.inFeedVideo.desktopPassback || this.inFeedImpact.desktopPassback) {
      this.setInFeedDesktop(true);
    } else if (!this.inFeedVideo.desktopPassback && !this.inFeedImpact.desktopPassback) {
      this.setInFeedDesktop(false);
    }
    if (this.inFeedVideo.phonePassback || this.inFeedImpact.phonePassback) {
      this.setInFeedPhone(true);
    } else if (!this.inFeedVideo.phonePassback && !this.inFeedImpact.phonePassback) {
      this.setInFeedPhone(false);
    }

  }
}
