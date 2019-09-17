import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PillarSettingsComponent } from './pillar-settings.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SpCheckboxComponent } from '../../../../../components/sp-checkbox/sp-checkbox.component';
import { FormsModule } from '@angular/forms';
import { InviewPassbackComponent } from '../../passbacks/inview-passback/inview-passback.component';
import { BroadcastService } from '../../../../../services/broadcast.service';
import { InviewPassbackService } from '../../../../../services/passback-service/inview-passback.service';

describe('PillarSettingsComponent', () => {
  let component: PillarSettingsComponent;
  let fixture: ComponentFixture<PillarSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviewPassbackComponent, PillarSettingsComponent, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule],
      providers: [BroadcastService, InviewPassbackService]
    })
      .compileComponents();
  }));

  it('#updateAnimation should populate PillarAnimation with overlay and push if PillarPosition is top-left', () => {
    component.PillarPlacementDetails = {};

    component.PillarPlacementDetails['sic_site_setting'] = {
      'video_enabled': 'test',
      'infeed_video_mobile_muted': 'test',
      'lkqd_enabled': 'test',
      'video_outstream_muted': 'test',
      'infeed_video_desktop_muted': 'test',
      'spotx_channel_id': 'test',
      'video_outstream_position': 'test',
      'video_interstitial_muted': 'test',
      'video_max_duration': 'test',
      'auto_refresh_enabled': true,
      'auto_refresh_interval': 30,
      'max_content_push': 'test',
      'tb_position': 'test',
      'tb_animation': 'test',
      'mobile_bottom_margin': 'test',
      'tablet_bottom_margin': 'test',
      'desktop_bottom_margin': 'test',
    };
    component.PillarPlacementDetails['sic_site_setting']['tb_position'] = 'top-left';
    component.updateAnimation();
    expect(component.PillarAnimation).toEqual(['overlay', 'push']);
  });

  it('#updateAnimation should populate PillarAnimation with overlay and push if PillarPosition is bottom-left', () => {
    component.PillarPlacementDetails = {};

    component.PillarPlacementDetails['sic_site_setting'] = {
      'video_enabled': 'test',
      'infeed_video_mobile_muted': 'test',
      'lkqd_enabled': 'test',
      'video_outstream_muted': 'test',
      'infeed_video_desktop_muted': 'test',
      'spotx_channel_id': 'test',
      'video_outstream_position': 'test',
      'video_interstitial_muted': 'test',
      'video_max_duration': 'test',
      'auto_refresh_enabled': true,
      'auto_refresh_interval': 30,
      'max_content_push': 'test',
      'tb_position': 'test',
      'tb_animation': 'test',
      'mobile_bottom_margin': 'test',
      'tablet_bottom_margin': 'test',
      'desktop_bottom_margin': 'test',
    };
    component.PillarPlacementDetails['sic_site_setting']['tb_position'] = 'bottom-left';
    component.updateAnimation();
    expect(component.PillarAnimation).toEqual(['overlay', 'push']);
  });

  it('#updateAnimation should populate PillarAnimation with overlay if PillarPosition is bottom-right', () => {
    component.PillarPlacementDetails = {};

    component.PillarPlacementDetails['sic_site_setting'] = {
      'video_enabled': 'test',
      'infeed_video_mobile_muted': 'test',
      'lkqd_enabled': 'test',
      'video_outstream_muted': 'test',
      'infeed_video_desktop_muted': 'test',
      'spotx_channel_id': 'test',
      'video_outstream_position': 'test',
      'video_interstitial_muted': 'test',
      'video_max_duration': 'test',
      'auto_refresh_enabled': true,
      'auto_refresh_interval': 30,
      'max_content_push': 'test',
      'tb_position': 'test',
      'tb_animation': 'test',
      'mobile_bottom_margin': 'test',
      'tablet_bottom_margin': 'test',
      'desktop_bottom_margin': 'test',
    };
    component.PillarPlacementDetails['sic_site_setting']['tb_position'] = 'bottom-right';
    component.updateAnimation();
    expect(component.PillarAnimation).toEqual(['overlay']);
  });

  it('#updateAnimation should populate PillarAnimation with overlay if PillarPosition is top-right', () => {
    component.PillarPlacementDetails = {};

    component.PillarPlacementDetails['sic_site_setting'] = {
      'video_enabled': 'test',
      'infeed_video_mobile_muted': 'test',
      'lkqd_enabled': 'test',
      'video_outstream_muted': 'test',
      'infeed_video_desktop_muted': 'test',
      'spotx_channel_id': 'test',
      'video_outstream_position': 'test',
      'video_interstitial_muted': 'test',
      'video_max_duration': 'test',
      'auto_refresh_enabled': true,
      'auto_refresh_interval': 30,
      'max_content_push': 'test',
      'tb_position': 'test',
      'tb_animation': 'test',
      'mobile_bottom_margin': 'test',
      'tablet_bottom_margin': 'test',
      'desktop_bottom_margin': 'test',
    };
    component.PillarPlacementDetails['sic_site_setting']['tb_position'] = 'top-right';
    component.updateAnimation();
    expect(component.PillarAnimation).toEqual(['overlay']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PillarSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
