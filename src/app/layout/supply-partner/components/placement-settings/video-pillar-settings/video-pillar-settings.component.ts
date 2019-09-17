import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { VideoPillar, InViewPassback } from '../../../../../models/viewModels';
import { InviewPassbackService } from '../../../../../services/passback-service/inview-passback.service';

@Component({
  selector: 'gc-video-pillar-settings',
  templateUrl: './video-pillar-settings.component.html',
  styleUrls: ['./video-pillar-settings.component.scss']
})
export class VideoPillarSettingsComponent implements OnInit {

  @Input() VideoPillarPlacementDetails;
  @Output() VideoPillar = new EventEmitter();
  video_pillar_settings: VideoPillar = {
    desktop: false,
    video_outstream_muted: false,
    video_outstream_position: '',
    page_left: false,
    page_right: false
  };
  inViewPassback: InViewPassback = {
    desktopPassback: false,
    tabletPassback: false,
    phonePassback: false
  };
  constructor(private inviewPassbackService: InviewPassbackService) { }

  ngOnInit() {
    this.inviewPassbackService.inviewDesktopFlag.subscribe(desktopPassback => this.inViewPassback.desktopPassback = desktopPassback);
    this.inviewPassbackService.inviewTabletFlag.subscribe(tabletPassback => this.inViewPassback.tabletPassback = tabletPassback);
    this.inviewPassbackService.inviewPhoneFlag.subscribe(phonePassback => this.inViewPassback.phonePassback = phonePassback);
    this.readAttributeValues();
    this.onChange();
  }

  outstreamPosition = (attr) => {
    // const page_left = attr === 1 ? !this.video_pillar_settings.page_left : this.video_pillar_settings.page_left;
    // const page_right = attr === 2 ? !this.video_pillar_settings.page_right : this.video_pillar_settings.page_right;
    // if (!page_left && !page_right) {
    //   if (attr === 1) { this.video_pillar_settings.page_left = true; }
    //   if (attr === 2) { this.video_pillar_settings.page_right = true; }
    // } else if (page_right && !page_left) {
    //   if (attr === 2) {
    //     this.video_pillar_settings.page_right = false;
    //   }
    //   if (attr === 1) {
    //     this.video_pillar_settings.page_left = true;
    //     this.video_pillar_settings.page_right = false;
    //   }
    // } else if (!page_right && page_left) {
    //   if (attr === 1) {
    //     this.video_pillar_settings.page_left = false;
    //   }
    //   if (attr === 2) {
    //     this.video_pillar_settings.page_left = false;
    //     this.video_pillar_settings.page_right = true;
    //   }
    // }
    // if (this.video_pillar_settings.page_left) { this.video_pillar_settings.video_outstream_position = 'bottom-left'; }
    // if (this.video_pillar_settings.page_right) { this.video_pillar_settings.video_outstream_position = 'bottom-right'; }
    // if (!this.video_pillar_settings.page_left && !this.video_pillar_settings.page_right) {
    //   this.video_pillar_settings.video_outstream_position = null;
    // }

    if (this.video_pillar_settings.desktop && this.video_pillar_settings.hasOwnProperty('page_left') && this.video_pillar_settings.hasOwnProperty('page_left')) {
      if (attr === 1) {
        this.video_pillar_settings.page_left = true;
        this.video_pillar_settings.page_right = false;
      } else if (attr === 2) {
        this.video_pillar_settings.page_left = false;
        this.video_pillar_settings.page_right = true;
      }
    }
    this.onChange();
  }

  onDesktopClick = () => {
    if (this.video_pillar_settings.desktop && !this.video_pillar_settings.page_left && !this.video_pillar_settings.page_right) {
      this.video_pillar_settings.page_left = true;
    } else if (!this.video_pillar_settings.desktop) {
      this.video_pillar_settings.page_left = false;
      this.video_pillar_settings.page_right = false;
      this.video_pillar_settings.video_outstream_position = null;
    }
    this.onChange();
  }
  /**
   * readAttributeValues reads Video Pillar values when component is initiated
   */
  readAttributeValues = () => {
    if (this.VideoPillarPlacementDetails) {
      this.video_pillar_settings = {
        desktop: this.VideoPillarPlacementDetails.ad_settings['Video Pillar'].desktop[0].enabled,
        video_outstream_muted: this.VideoPillarPlacementDetails['sic_site_setting']['video_outstream_muted'],
        video_outstream_position: null,
        page_left: false,
        page_right: false
      };

      this.video_pillar_settings.video_outstream_position = this.VideoPillarPlacementDetails['sic_site_setting']['video_outstream_position'];
      if (this.VideoPillarPlacementDetails.sic_site_setting && this.VideoPillarPlacementDetails.sic_site_setting.video_outstream_position === 'bottom-left') {
        this.video_pillar_settings.page_left = true;
      } else if (this.VideoPillarPlacementDetails.sic_site_setting && this.VideoPillarPlacementDetails.sic_site_setting.video_outstream_position === 'bottom-right') {
        this.video_pillar_settings.page_right = true;
      }
    }
  }
  onChange() {
    if (this.video_pillar_settings.page_left) { 
      this.video_pillar_settings.video_outstream_position = 'bottom-left'; 
    } else if (this.video_pillar_settings.page_right) { 
      this.video_pillar_settings.video_outstream_position = 'bottom-right'; 
    } else {
      this.video_pillar_settings.video_outstream_position = null;
    }
    this.inviewPassbackService.captureInviewPassback(this.video_pillar_settings, 3);
    this.VideoPillar.emit(this.video_pillar_settings);
  }
}
