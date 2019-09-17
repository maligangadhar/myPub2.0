import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPillarSettingsComponent } from './video-pillar-settings.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InviewPassbackComponent } from '../../passbacks/inview-passback/inview-passback.component';

describe('VideoPillarSettingsComponent', () => {
  let component: VideoPillarSettingsComponent;
  let fixture: ComponentFixture<VideoPillarSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviewPassbackComponent, VideoPillarSettingsComponent],
      imports: [CheckboxModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPillarSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#outstreamPosition should empty video_outstream_position irrespective of attr if page_left and page_right of video_interstitial_settings are false', () => {
    component.video_pillar_settings = {
      desktop: false,
      video_outstream_muted: false,
      video_outstream_position: null,
      page_left: false,
      page_right: false
    };
    component.outstreamPosition(1);
    expect(component.video_pillar_settings.video_outstream_position).toBeNull();
  });

  it('#outstreamPosition should empty video_outstream_position irrespective of attr if page_left and page_right of video_interstitial_settings are false', () => {
    component.video_pillar_settings = {
      desktop: false,
      video_outstream_muted: false,
      video_outstream_position: null,
      page_left: false,
      page_right: false
    };
    component.outstreamPosition(2);
    expect(component.video_pillar_settings.video_outstream_position).toBeNull();
  });

  it('#outstreamPosition should populate video_outstream_position with \'bottom-left\' if page_left of video_pillar_settings is true and argument parameter is 1', () => {
    component.video_pillar_settings = {
      desktop: false,
      video_outstream_muted: false,
      video_outstream_position: null,
      page_left: true,
      page_right: false
    };
    component.outstreamPosition(1);
    expect(component.video_pillar_settings.video_outstream_position).toEqual('bottom-left');
  });

  it('#outstreamPosition should populate video_outstream_position with \'bottom-right\' if page_right of video_pillar_settings is true and argument parameter is 2', () => {
    component.video_pillar_settings = {
      desktop: false,
      video_outstream_muted: false,
      video_outstream_position: null,
      page_left: false,
      page_right: true
    };
    component.outstreamPosition(2);
    expect(component.video_pillar_settings.video_outstream_position).toEqual('bottom-right');
  });

  it('#onChange should emit video_pillar_settings when called', () => {
    component.video_pillar_settings = {
      desktop: false,
      video_outstream_muted: false,
      video_outstream_position: 'test',
      page_left: false,
      page_right: false,
    };
    spyOn(component.VideoPillar, 'emit');
    component.onChange();
    expect(component.VideoPillar.emit).toHaveBeenCalledWith(component.video_pillar_settings);
  });

  it('#onChange should  populate video_outstream_position to be \'bottom-left\' if page_left of video_pillar_settings is true', () => {
    component.video_pillar_settings = {
      desktop: false,
      video_outstream_muted: false,
      video_outstream_position: 'test',
      page_left: true,
      page_right: false,
    };
    component.onChange();
    expect(component.video_pillar_settings.video_outstream_position).toEqual('bottom-left');
  });

  it('#onChange should  populate video_outstream_position to be \'bottom-right\' if page_right of video_pillar_settings is true', () => {
    component.video_pillar_settings = {
      desktop: false,
      video_outstream_muted: false,
      video_outstream_position: 'test',
      page_left: false,
      page_right: true,
    };
    component.onChange();
    expect(component.video_pillar_settings.video_outstream_position).toEqual('bottom-right');
  });

  it('#onDesktopClick should change page_left of video_pillar_settings to true if page_left,page_right are false and desktop of video_pillar_settings is true', () => {
    component.video_pillar_settings = {
      desktop: true,
      video_outstream_muted: false,
      video_outstream_position: 'test',
      page_left: false,
      page_right: false,
    };
    component.onDesktopClick();
    expect(component.video_pillar_settings.page_left).toBeTruthy();
    expect(component.video_pillar_settings.video_outstream_position).toEqual('bottom-left');
  });

  it('#onDesktopClick should change page_left,page_right of video_pillar_settings to false and video_outstream_position to null if desktop of video_pillar_settings is false', () => {
    component.video_pillar_settings = {
      desktop: false,
      video_outstream_muted: false,
      video_outstream_position: 'test',
      page_left: true,
      page_right: true,
    };
    component.onDesktopClick();
    expect(component.video_pillar_settings.page_left).toBeFalsy();
    expect(component.video_pillar_settings.page_right).toBeFalsy();
    expect(component.video_pillar_settings.video_outstream_position).toBeNull();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
