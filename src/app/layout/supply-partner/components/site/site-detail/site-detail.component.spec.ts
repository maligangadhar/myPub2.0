import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDetailComponent } from './site-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientSideSettingComponent } from '../../placement-settings/client-side-setting/client-side-setting.component';
import { FormsModule } from '@angular/forms';
import { SpCheckboxComponent } from '../../../../../components/sp-checkbox/sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { RealVedioSettingComponent } from '../../placement-settings/real-vedio-setting/real-vedio-setting.component';
import { MessagesModule } from 'primeng/messages';
import { BroadcastService } from '../../../../../services/broadcast.service';

describe('SiteDetailComponent', () => {
  let component: SiteDetailComponent;
  let fixture: ComponentFixture<SiteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSideSettingComponent, RealVedioSettingComponent, SiteDetailComponent, SpCheckboxComponent],
      imports: [CheckboxModule, FormsModule, HttpClientModule, MessagesModule, RouterTestingModule],
      providers: [BroadcastService, MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#readAdUnits should populate inviewAdUnits, infeedAdUnits and siabAdUnits with enabled ad-sizes specific to ad-products if placemendetails is not null', () => {
    component.placementDetails = {
      'site_details': {
        'guid': 'test',
        'login': 'test.com',
        'email': 'Test@test.com',
        'api_key': '6T6K6R3T3y48994n7X7r6A4v6X414W3X',
        'first_name': 'Test',
        'last_name': 'Test',
        'created_at': '2019-04-04T01:09:15.000-06:00',
        'dynamic_config': true,
        'sic_v1_enabled?': false,
        'is_sic_banned?': false,
        'data_license': 1,
        'thirty_day_pageviews': 0,
        'sic_monthly_pv_estimate': '1M',
        'content_type_id': 130,
        'job_function_id': 1,
        'placement_name': 'test',
        'language': 'English'
      },
      'users': [

      ],
      'supply_partner': {
        'id': 1515,
        'partner_name': 'Test',
        'partner_guid': '368ae2d0-8e67-4fe9-acf4-a169a170d3ed',
        'created_at': '2019-03-26T09:03:19.000-06:00',
        'updated_at': '2019-03-26T09:03:19.000-06:00',
        'first_name': 'Test',
        'last_name': 'Test',
        'street_address': 'King\'s Palace',
        'city': 'Testd',
        'country': 'OM',
        'state': 'Test',
        'postal_code': '1111111',
        'phone': '9876543211',
        'email': 'Testtest@test.com',
        'url': 'Test.com',
        'payout_currency': 'USD',
        'job_function_id': 1,
        'status': false,
        'partner_type': 'publisher'
      },
      'ad_settings': {
        'Pillar': {
          'desktop': [
            {
              'size': '300x600',
              'enabled': true
            },
            {
              'size': '300x250',
              'enabled': true
            },
            {
              'size': '160x600',
              'enabled': true
            }
          ],
          'tablet': [
            {
              'size': '160x600',
              'enabled': true
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
        'Interstitial': {
          'desktop': [
            {
              'size': '720x300',
              'enabled': false
            },
            {
              'size': '550x480',
              'enabled': false
            },
            {
              'size': '580x400',
              'enabled': false
            },
            {
              'size': '750x300',
              'enabled': false
            }
          ],
          'tablet': [
            {
              'size': '720x300',
              'enabled': false
            },
            {
              'size': '550x480',
              'enabled': false
            },
            {
              'size': '580x400',
              'enabled': false
            },
            {
              'size': '300x250',
              'enabled': false
            },
            {
              'size': '768x1024',
              'enabled': false
            },
            {
              'size': '1024x768',
              'enabled': false
            },
            {
              'size': '640x960',
              'enabled': false
            }
          ],
          'mobile': [
            {
              'size': '300x250',
              'enabled': false
            },
            {
              'size': '320x480',
              'enabled': false
            },
            {
              'size': '480x320',
              'enabled': false
            }
          ]
        },
        'Standard Display': {
          'desktop': [
            {
              'size': '300x600',
              'enabled': true,
              'passback_tag': '\u003c!-- ---\u003e'
            },
            {
              'size': '300x250',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '160x600',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '728x90',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '970x250',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '180x150',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            }
          ],
          'tablet': [
            {
              'size': '300x600',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '300x250',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '160x600',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '728x90',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            }
          ],
          'mobile': [
            {
              'size': '320x50',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '300x50',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
            },
            {
              'size': '300x250',
              'enabled': false,
              'passback_tag': '\u003c!--- ---\u003e'
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
        'Video Interstitial': {
          'desktop': [
            {
              'size': '640x480',
              'enabled': false
            }
          ],
          'tablet': [
            {
              'size': '640x480',
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
              'enabled': true,
              'render_effect_id': 1
            },
            {
              'size': '728x90',
              'enabled': true,
              'render_effect_id': 1
            },
            {
              'size': '970x250',
              'enabled': true,
              'render_effect_id': 1
            }
          ],
          'mobile': [
            {
              'size': '300x250',
              'enabled': true,
              'render_effect_id': 1
            },
            {
              'size': '320x50',
              'enabled': true,
              'render_effect_id': 1
            },
            {
              'size': '300x50',
              'enabled': true,
              'render_effect_id': 1
            },
            {
              'size': '320x480',
              'enabled': true,
              'render_effect_id': 1
            }
          ]
        }
      },
      'sic_site_setting': {
        'auto_refresh_enabled': true,
        'auto_refresh_interval': 15,
        'auto_refresh_after_fill_enabled': true,
        'siab_auto_refresh_enabled': true,
        'max_content_push': null,
        'tb_position': 'bottom-left',
        'tb_animation': 'push',
        'mobile_bottom_margin': null,
        'tablet_bottom_margin': null,
        'desktop_bottom_margin': null,
        'infeed_video_mobile_muted': true,
        'video_interstitial_muted': true,
        'video_enabled': false,
        'lkqd_enabled': true,
        'video_outstream_muted': true,
        'infeed_video_desktop_muted': true,
        'spotx_channel_id': null,
        'video_outstream_position': 'bottom-right',
        'video_max_duration': null,
        'install_method': 'On Page',
        'inview_desktop_passback': '1',
        'inview_tablet_passback': '2',
        'inview_mobile_passback': null,
        'infeed_desktop_passback': 'test',
        'infeed_mobile_passback': 'test'
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
    component.readAdUnits();
    expect(component.inviewAdUnits).toEqual(' Desktop 300x600, Desktop 300x250, Desktop 160x600,Tablet 160x600');
    expect(component.infeedAdUnits).toEqual(' Desktop 300x250, Desktop 728x90, Desktop 970x250, Phone 300x250, Phone 320x50, Phone 300x50, Phone 320x480');
    expect(component.siabAdUnits).toEqual(' Desktop 300x600');
  });

  it('#readAdUnits should not populate inviewAdUnits, infeedAdUnits and siabAdUnits if placementDetails is null', () => {
    component.placementDetails = '';
    component.readAdUnits();
    expect(component.inviewAdUnits).toEqual('');
    expect(component.infeedAdUnits).toEqual('');
    expect(component.siabAdUnits).toEqual('');
  });
});
