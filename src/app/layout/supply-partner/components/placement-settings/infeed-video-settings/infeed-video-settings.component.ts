import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { InfeedVideo, InFeedPassback } from '../../../../../models/viewModels';
import { InfeedPassbackService } from '../../../../../services/passback-service/infeed-passback.service';

@Component({
  selector: 'gc-infeed-video-settings',
  templateUrl: './infeed-video-settings.component.html',
  styleUrls: ['./infeed-video-settings.component.scss']
})
export class InfeedVideoSettingsComponent implements OnInit, OnChanges {

  DeviceList: string[];
  SizeList: string[];
  InfeedVideoDesktopList: any[];
  InfeedVideoMobileList: any[];
  dialog_box_content: string;
  infeed_video: string = 'In-Feed Video';
  @Input() InfeedVideoPlacementSettings;
  @Output() InfeedVideo = new EventEmitter();

  inFeedPassback: InFeedPassback = {
    desktopPassback: false,
    phonePassback: false,
    tabletPassback: false
  };

  infeed_video_settings: InfeedVideo = {
    desktop: false,
    desktop_sound: false,
    mobile: false,
    mobile_sound: false
  };
  constructor(private inFeedPassbackService: InfeedPassbackService) { }

  ngOnInit() {
    this.DeviceList = ['Desktop', 'Tablet'];
    this.SizeList = ['970x250', '720x90'];
  }

  ngOnChanges() {
    if (this.InfeedVideoPlacementSettings) {
      this.infeed_video_settings = {
        desktop: this.InfeedVideoPlacementSettings.ad_settings[this.infeed_video].desktop[0].enabled,
        desktop_sound: this.InfeedVideoPlacementSettings.sic_site_setting.infeed_video_desktop_muted,
        mobile: this.InfeedVideoPlacementSettings.ad_settings[this.infeed_video].mobile[0].enabled,
        mobile_sound: this.InfeedVideoPlacementSettings.sic_site_setting.infeed_video_mobile_muted,
      };

      this.inFeedPassbackService.inFeedDesktopFlag.subscribe(desktopPassback => this.inFeedPassback.desktopPassback = desktopPassback);
      this.inFeedPassbackService.inFeedPhoneFlag.subscribe(phonePassback => this.inFeedPassback.phonePassback = phonePassback);

      this.InfeedVideoDesktopList = this.InfeedVideoPlacementSettings.ad_settings[this.infeed_video].desktop;
      this.InfeedVideoMobileList = this.InfeedVideoPlacementSettings.ad_settings[this.infeed_video].mobile;
    }
  }

  onChange() {
    this.inFeedPassbackService.captureInFeedPassback(this.infeed_video_settings, 1);
    this.InfeedVideo.emit(this.infeed_video_settings);
  }
}
