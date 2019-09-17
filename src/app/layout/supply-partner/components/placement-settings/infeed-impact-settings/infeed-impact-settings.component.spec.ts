import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfeedImpactSettingsComponent } from './infeed-impact-settings.component';
import { SpCheckboxComponent } from '../../../../../components/sp-checkbox/sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InfeedPassbackComponent } from '../../passbacks/infeed-passback/infeed-passback.component';
import { BroadcastService } from '../../../../../services/broadcast.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('InfeedImpactSettingsComponent', () => {
  let component: InfeedImpactSettingsComponent;
  let fixture: ComponentFixture<InfeedImpactSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfeedImpactSettingsComponent, InfeedPassbackComponent, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule, RouterTestingModule],
      providers: [BroadcastService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfeedImpactSettingsComponent);
    component = fixture.componentInstance;
    component.InfeedImpactPhoneList = [
      { size: '300x250', enabled: false, render_effect_id: null },
      { size: '320x50', enabled: false, render_effect_id: null },
      { size: '300x50', enabled: false, render_effect_id: null },
      { size: '320x480', enabled: false, render_effect_id: null }];
    component.InfeedImpactDesktopList = [
      { size: '300x250', enabled: false, render_effect_id: null },
      { size: '728x90', enabled: false, render_effect_id: null },
      { size: '970x250', enabled: false, render_effect_id: null }];
    component.InfeedImpactMeta = {
      'desktop': [
        {
          'id': 1,
          'display_name': 'None',
          'slug': '5a881b06-2e98-487e-8275-5d8243d85500',
          'default': true,
          'sort_index': 0,
          'device': 'common'
        },
        {
          'id': 6,
          'display_name': 'None',
          'slug': 'none',
          'default': true,
          'sort_index': 0,
          'device': 'common'
        },
        {
          'id': 8,
          'display_name': 'Expansion',
          'slug': 'expansion',
          'default': false,
          'sort_index': 100,
          'device': 'desktop'
        },
        {
          'id': 7,
          'display_name': 'Parallax',
          'slug': 'parallax',
          'default': false,
          'sort_index': 100,
          'device': 'common'
        }
      ],
      'mobile': [
        {
          'id': 1,
          'display_name': 'None',
          'slug': '5a881b06-2e98-487e-8275-5d8243d85500',
          'default': true,
          'sort_index': 0,
          'device': 'common'
        },
        {
          'id': 6,
          'display_name': 'None',
          'slug': 'none',
          'default': true,
          'sort_index': 0,
          'device': 'common'
        },
        {
          'id': 7,
          'display_name': 'Parallax',
          'slug': 'parallax',
          'default': false,
          'sort_index': 100,
          'device': 'common'
        },
        {
          'id': 5,
          'display_name': 'Scroller',
          'slug': 'scroller',
          'default': false,
          'sort_index': 100,
          'device': 'mobile'
        }
      ]
    };
    component.InfeedImpactPlacementDetails = {
      'site_details': {
        'login': 'test',
        'email': 'test',
        'api_key': 'test',
        'first_name': 'test',
        'last_name': 'test',
        'created_at': 'test',
        'dynamic_config': true,
        'sic_v1_enabled?': false,
        'is_sic_banned?': false,
        'data_license': 1,
        'thirty_day_pageviews': 0,
        'sic_monthly_pv_estimate': 'test',
        'content_type_id': 'test',
        'job_function_id': 'test',
        'placement_name': 'test',
        'language': 'English',
        'sic': 'test',
        'siab': 'test',
        'infeed_impact': 'test'
      },
      'users': [

      ],
      'supply_partner': {
        'id': 1021,
        'partner_name': '123Greetings.com, Inc.',
        'partner_guid': '0014000001YrETAAA3',
        'created_at': 'test',
        'updated_at': 'test'
      },
      'ad_settings': {
        'Pillar': {
          'desktop': [
            {
              'size': '300x600',
              'enabled': false
            },
            {
              'size': '300x250',
              'enabled': false
            },
            {
              'size': '160x600',
              'enabled': false
            }
          ],
          'tablet': [
            {
              'size': '160x600',
              'enabled': false
            }
          ]
        },
        'Adhesion': {
          'desktop': [
            {
              'size': '728x90',
              'enabled': false
            }
          ],
          'tablet': [
            {
              'size': '728x90',
              'enabled': false
            }
          ],
          'mobile': [
            {
              'size': '320x50',
              'enabled': false
            },
            {
              'size': '320x100',
              'enabled': false
            }
          ]
        },
        'Standard Display': {
          'desktop': [
            {
              'size': '300x600',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '300x250',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '160x600',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '728x90',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '970x250',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '180x150',
              'enabled': false,
              'passback_tag': ''
            }
          ],
          'tablet': [
            {
              'size': '300x600',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '300x250',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '160x600',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '728x90',
              'enabled': false,
              'passback_tag': ''
            }
          ],
          'mobile': [
            {
              'size': '320x50',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '300x50',
              'enabled': false,
              'passback_tag': ''
            },
            {
              'size': '300x250',
              'enabled': false,
              'passback_tag': ''
            }
          ]
        },
        'Video Pillar': {
          'desktop': [
            {
              'size': '400x300',
              'enabled': false
            }
          ],
          'tablet': [
            {
              'size': '400x300',
              'enabled': false
            }
          ]
        },
        'In-Feed Video': {
          'mobile': [
            {
              'size': 'In-Feed Video',
              'enabled': false
            }
          ],
          'desktop': [
            {
              'size': 'In-Feed Video',
              'enabled': false
            }
          ]
        },
        'In-Feed Impact': {
          'desktop': [
            {
              'size': '300x250',
              'enabled': false,
              'render_effect_id': null
            },
            {
              'size': '728x90',
              'enabled': false,
              'render_effect_id': null
            },
            {
              'size': '970x250',
              'enabled': false,
              'render_effect_id': null
            }
          ],
          'mobile': [
            {
              'size': '300x250',
              'enabled': false,
              'render_effect_id': null
            },
            {
              'size': '320x50',
              'enabled': false,
              'render_effect_id': null
            },
            {
              'size': '300x50',
              'enabled': false,
              'render_effect_id': null
            },
            {
              'size': '320x480',
              'enabled': false,
              'render_effect_id': null
            }
          ]
        }
      },
      'sic_site_setting': {
        'auto_refresh_enabled': true,
        'auto_refresh_interval': 15,
        'auto_refresh_after_fill_enabled': true,
        'siab_auto_refresh_enabled': true,
        'max_content_push': 'test',
        'tb_position': 'bottom-left',
        'tb_animation': 'push',
        'mobile_bottom_margin': 'test',
        'tablet_bottom_margin': 'test',
        'desktop_bottom_margin': 'test',
        'infeed_video_mobile_muted': true,
        'video_interstitial_muted': true,
        'video_enabled': false,
        'lkqd_enabled': true,
        'video_outstream_muted': true,
        'infeed_video_desktop_muted': true,
        'spotx_channel_id': 'test',
        'video_outstream_position': 'bottom-right',
        'video_max_duration': 'test',
        'install_method': 'On Page',
        'inview_desktop_passback': 'test',
        'inview_tablet_passback': 'test',
        'inview_mobile_passback': 'test',
        'infeed_desktop_passback': 'test',
        'infeed_mobile_passback': 'test',
        'infeed_impact': 'test'
      },
      'header_bidding_option': {
        'inview_appnexus_enabled': false,
        'inview_openx_enabled': false,
        'inview_criteo_enabled': false,
        'inview_aol_enabled': false,
        'inpage_appnexus_enabled': false,
        'inpage_openx_enabled': false,
        'inpage_criteo_enabled': false,
        'infeed_appnexus_enabled': false,
        'infeed_openx_enabled': false,
        'infeed_criteo_enabled': false,
        'infeed_aol_enabled': false,
        'inpage_aol_enabled': false
      },
      'realtime_bidding_option': {
        'inview_33xchange_enabled': true,
        'inpage_33xchange_enabled': true,
        'infeed_33xchange_enabled': true
      }
    };
    fixture.detectChanges();
  });

  it('#ngOnChanges should call #selectAllCheck of InfeedImpactSettingsComponent', () => {
    const spy = spyOn(component, 'selectAllCheck');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('#updatePassback should update the values of infeed_desktop_passback and infeed_mobile_passback of sic_site_setting in InfeedImpactPlacementDetails with the parameter passed', () => {
    component.updatePassback({ desktop: 'test', mobile: 'test' });
    expect(component.InfeedImpactPlacementDetails['sic_site_setting']['infeed_desktop_passback']).toEqual('test');
    expect(component.InfeedImpactPlacementDetails['sic_site_setting']['infeed_mobile_passback']).toEqual('test');
  });

  it('#onCheckBoxClick should call #selectAllCheck of InfeedImpactSettingsComponent', () => {
    const spy = spyOn(component, 'selectAllCheck');
    component.onCheckBoxClick();
    expect(spy).toHaveBeenCalled();
  });

  it('#deSelectAll should call #innerSelect of InfeedImpactSettingsComponent', () => {
    const spy = spyOn(component, 'innerSelect');
    component.deSelectAll();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('#selectAll should call #innerSelect of InfeedImpactSettingsComponent', () => {
    const spy = spyOn(component, 'innerSelect');
    component.selectAll();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('#innerSelect should change the enabled attribute of InfeedImpactDesktopList and InfeedImpactPhoneList of InfeedImpactSettingsComponent to true if called with true as a parameter', () => {
    component.innerSelect(true);
    component.InfeedImpactDesktopList.forEach(element => {
      expect(element.enabled).toBeTruthy();
    });
    component.InfeedImpactPhoneList.forEach(element => {
      expect(element.enabled).toBeTruthy();
    });
  });

  it('#innerSelect should change the enabled attribute of InfeedImpactDesktopList and InfeedImpactPhoneList of InfeedImpactSettingsComponent to false if called with false as a parameter', () => {
    component.innerSelect(false);
    component.InfeedImpactDesktopList.forEach(element => {
      expect(element.enabled).toBeFalsy();
    });
    component.InfeedImpactPhoneList.forEach(element => {
      expect(element.enabled).toBeFalsy();
    });
  });

  it('#innerSelect should call #onCheckBoxClick of InfeedImpactSettingsComponent', () => {
    const spy = spyOn(component, 'onCheckBoxClick');
    component.innerSelect(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
