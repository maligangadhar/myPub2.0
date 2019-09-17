import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { PlacementSettingsComponent } from './placement-settings.component';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { AdhesionSettingsComponent } from './adhesion-settings/adhesion-settings.component';
import { InfeedImpactSettingsComponent } from './infeed-impact-settings/infeed-impact-settings.component';
import { InfeedVideoSettingsComponent } from './infeed-video-settings/infeed-video-settings.component';
import { SpCheckboxComponent } from '../../../../components/sp-checkbox/sp-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { PillarSettingsComponent } from './pillar-settings/pillar-settings.component';
import { VideoPillarSettingsComponent } from './video-pillar-settings/video-pillar-settings.component';
import { SiabSettingsComponent } from './siab-settings/siab-settings.component';
import { ClientSideSettingComponent } from './client-side-setting/client-side-setting.component';
import { RealVedioSettingComponent } from './real-vedio-setting/real-vedio-setting.component';
import { SiteService } from '../../../../services/site.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetadataService } from '../../../../services/metadata.service';
import { PlacementService } from '../../../../services/placement.service';
import { MessagesModule } from 'primeng/messages';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InviewPassbackComponent } from '../passbacks/inview-passback/inview-passback.component';
import { InfeedPassbackComponent } from '../passbacks/infeed-passback/infeed-passback.component';
import { BroadcastService } from '../../../../services/broadcast.service';
import { GcloginComponent } from '../gclogin/gclogin.component';
import { Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/primeng';

describe('PlacementSettingsComponent', () => {
    let component: PlacementSettingsComponent;
    let fixture: ComponentFixture<PlacementSettingsComponent>;
    let httpTestingController;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdhesionSettingsComponent,
                ClientSideSettingComponent,
                GcloginComponent,
                InfeedImpactSettingsComponent,
                InfeedPassbackComponent,
                InfeedVideoSettingsComponent,
                InviewPassbackComponent,
                PillarSettingsComponent,
                PlacementSettingsComponent,
                RealVedioSettingComponent,
                SiabSettingsComponent,
                SpCheckboxComponent,
                VideoPillarSettingsComponent],
            imports: [AccordionModule, AutoCompleteModule, ListboxModule, OverlayPanelModule, BrowserAnimationsModule, CheckboxModule, FormsModule, HttpClientModule, HttpClientTestingModule, MessagesModule, RouterTestingModule],
            providers: [BroadcastService, MessageService, MetadataService, PlacementService, SiteService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlacementSettingsComponent);
        component = fixture.componentInstance;
        component.selected_guid = 'test';
        component.selected_id = '1';
        component.validFlag = true;
        component.placementDetails = {
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
        RouterTestingModule.withRoutes([
            { path: 'login', component: GcloginComponent }
        ]);
        fixture.detectChanges();
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('#getMetaData should call getMetaData of MetaDataService', () => {
        let metadataService: MetadataService;
        metadataService = TestBed.get(MetadataService);
        const spy = spyOn(metadataService, 'getMetaData').and.callThrough();
        component.getMetaData();
        expect(spy).toHaveBeenCalled();
    });

    it('#getPlacementDetails should call getNewPlacementDetails of PlacementService', inject([PlacementService, HttpTestingController], (placementService, httpBackend) => {
        placementService = TestBed.get(PlacementService);
        component.new_placement = true;
        component.getPlacementDetails();
    }));

    it('#getPlacementDetails should call getPlacementDetails of PlacementService', inject([PlacementService, HttpTestingController], (placementService, httpBackend) => {
        placementService = TestBed.get(PlacementService);
        const spy = spyOn(placementService, 'getPlacementDetails').and.callThrough();
        component.selected_id = '1';
        component.getPlacementDetails();
        expect(spy).toHaveBeenCalled();
    }));

    it('#createUpdatePlacementSettings should push error message to msgs if sic_site_settings is missing in placementDetails', () => {
        component.placementDetails = {};
        component.createUpdatePlacementSettings();
        expect(component.msgs).toContain({ severity: 'error', summary: 'Error', detail: 'Sic site settings are missing' });
    });

    it('#createUpdatePlacementSettings should call savePlacementSettings of PlacementService if a new placement to be created', inject([PlacementService, HttpTestingController], (placementService, httpBackend) => {
        placementService = TestBed.get(PlacementService);
        const spy = spyOn(placementService, 'savePlacementSettings').and.callThrough();
        component.new_placement = true;
        component.placementDetails = {};
        component.validFlag = true;

        component.placementDetails['site_details'] = {
            'guid': 'test',
            'login': 'test.com',
            'email': 'test@test.com',
            'api_key': 'test',
            'placement_name': 'test',
            'first_name': 'test',
            'last_name': 'test',
            'created_at': '2019-02-18T04:35:08.000-07:00',
            'dynamic_config': true,
            'sic_v1_enabled?': false,
            'data_license': 1,
            'thirty_day_pageviews': 0,
            'sic_monthly_pv_estimate': '1M- one million',
            'content_type_id': 2,
            'job_function_id': 4
        };
        component.ads_refresh = {
            enabled: true,
            time: 20
        };

        component.siteCategory = 1;
        component.placementDetails['sic_site_setting'] = {
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
        component.createUpdatePlacementSettings();
        expect(spy).toHaveBeenCalled();
    }));

    it('#createUpdatePlacementSettings should call updatePlacementSettings of PlacementService to update an existing placement', inject([PlacementService, HttpTestingController], (placementService, httpBackend) => {
        placementService = TestBed.get(PlacementService);
        const spy = spyOn(placementService, 'updatePlacementSettings').and.callThrough();
        component.new_placement = false;
        component.placementDetails = {};
        component.placementDetails['site_details'] = {
            'guid': 'test',
            'login': 'test.com',
            'email': 'test@test.com',
            'api_key': 'test',
            'first_name': 'test',
            'last_name': 'test',
            'placement_name': 'test',
            'created_at': '2019-02-18T04:35:08.000-07:00',
            'dynamic_config': true,
            'sic_v1_enabled?': false,
            'data_license': 1,
            'thirty_day_pageviews': 0,
            'sic_monthly_pv_estimate': '1M- one million',
            'content_type_id': 2,
            'job_function_id': 4
        };
        component.ads_refresh = {
            enabled: true,
            time: 20
        };
        component.siteCategory = 1;
        component.placementDetails['sic_site_setting'] = {
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
        component.createUpdatePlacementSettings();
        expect(spy).toHaveBeenCalled();
    }));


    it('#setAdsRefresh should push error to msgs if sic_site_settings is missing in placementDetails', () => {
        component.placementDetails = {};
        component.setAdsRefresh();
        expect(component.msgs).toContain({ severity: 'error', summary: 'Error', detail: 'Sic site settings are missing' });
    });

    it('#setAdsRefresh should set the values of auto_refresh_enabled and auto_refresh_interval to ads_refresh if sic_site_settings exists', () => {
        component.placementDetails = {};
        component.placementDetails['sic_site_setting'] = {
            'video_enabled': 'test',
            'infeed_video_mobile_muted': 'test',
            'lkqd_enabled': 'test',
            'video_outstream_muted': 'test',
            'infeed_video_desktop_muted': 'test',
            'spotx_channel_id': 'test',
            'video_outstream_position': 'test',
            'video_interstitial_muted': 'test',
            'video_max_duration': 'test',
            'auto_refresh_enabled': false,
            'auto_refresh_interval': 12,
            'max_content_push': 'test',
            'tb_position': 'test',
            'tb_animation': 'test',
            'mobile_bottom_margin': 'test',
            'tablet_bottom_margin': 'test',
            'desktop_bottom_margin': 'test',
        };
        component.setAdsRefresh();
        expect(component.ads_refresh.enabled).toEqual(component.placementDetails['sic_site_setting']['auto_refresh_enabled']);
        expect(component.ads_refresh.time).toEqual(component.placementDetails['sic_site_setting']['auto_refresh_interval']);
    });

    it('#displayAdsSelected should push error message into msgs if ad_settings is missing in placementDetails ', () => {
        component.placementDetails = [];
        component.displayAdsSelected();
        expect(component.msgs).toContain({ severity: 'error', summary: 'Error', detail: 'Ad settings are missing' });
    });

    it('#displayAdsSelected should calculate no of ad-sizes selected for each ad-product if ad_settings exists in placementDetails ', () => {
        component.placementDetails = {};
        component.new_placement = true;
        component.display_selected_ads_flag = 1;
        component.placementDetails['ad_settings'] = {
            'Pillar': {
                'desktop': [
                    {
                        'size': '300x600',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '300x250',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '160x600',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'tablet': [
                    {
                        'size': '160x600',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ]
            },
            'Adhesion': {
                'desktop': [
                    {
                        'size': '728x90',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'tablet': [
                    {
                        'size': '728x90',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'mobile': [
                    {
                        'size': '320x50',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '320x100',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ]
            },
            'Interstitial': {
                'desktop': [
                    {
                        'size': '720x300',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '550x480',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '580x400',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '750x300',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'tablet': [
                    {
                        'size': '720x300',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '550x480',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '580x400',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '300x250',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '768x1024',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '1024x768',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '640x960',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'mobile': [
                    {
                        'size': '300x250',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '320x480',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '480x320',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ]
            },
            'Standard Display': {
                'desktop': [
                    {
                        'size': '300x600',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '300x250',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '160x600',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '728x90',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '970x250',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '180x150',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'tablet': [
                    {
                        'size': '300x600',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '300x250',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '160x600',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '728x90',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'mobile': [
                    {
                        'size': '320x50',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '300x50',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '300x250',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ]
            },
            'Video Pillar': {
                'desktop': [
                    {
                        'size': '400x300',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'tablet': [
                    {
                        'size': '400x300',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ]
            },
            'Video Interstitial': {
                'desktop': [
                    {
                        'size': '640x480',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'tablet': [
                    {
                        'size': '640x480',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ]
            },
            'In-Feed Video': {
                'mobile': [
                    {
                        'size': 'In-Feed Video',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'desktop': [
                    {
                        'size': 'In-Feed Video',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ]
            },
            'In-Feed Impact': {
                'desktop': [
                    {
                        'size': '300x250',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '728x90',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '970x250',
                        'enabled': true,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ],
                'mobile': [
                    {
                        'size': '300x250',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '320x50',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '300x50',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    },
                    {
                        'size': '320x480',
                        'enabled': false,
                        'passback_tag': '',
                        'passback_enabled': null
                    }
                ]
            }
        };
        component.displayAdsSelected();
        expect(component.selected_ads['Pillar']).toEqual('1/4');
        expect(component.selected_ads['Adhesion']).toEqual('1/4');
        expect(component.selected_ads['Interstitial']).toEqual('3/14');
        expect(component.selected_ads['In-Feed Impact']).toEqual('2/7');
        expect(component.selected_ads['Standard Display']).toEqual('3/13');
    });

    it('#onUpdateSettings should push error message into msgs if sic_site_setting is missing in placementDetails', () => {
        component.placementDetails = {};
        component.onUpdateSettings('test', 2);
        expect(component.msgs).toContain({ severity: 'error', summary: 'Error', detail: 'Sic site settings are missing' });
    });

    it('#onUpdateSettings should call displayAdsSelected of PlacementSettingsComponent ', () => {
        const ad_product = {
            'sic_site_setting': {
                max_content_push: 'test',
                tb_animation: 'test',
                tb_position: 'test'
            }
        };
        const ad_number = 1;

        const spy = spyOn(component, 'displayAdsSelected');
        component.onUpdateSettings(ad_product, ad_number);
        expect(spy).toHaveBeenCalled();
    });

    it('#onUpdateSettings should update \'max_content_push\', \'tb_position\', \'tb_animation\' of placementDetails with ad_product passed as parameter if ad_number is \'1\'', () => {
        const ad_product = {
            'sic_site_setting': {
                max_content_push: 'test',
                tb_animation: 'test',
                tb_position: 'test'
            }
        };
        const ad_number = 1;
        component.onUpdateSettings(ad_product, ad_number);
        ['max_content_push', 'tb_position', 'tb_animation'].forEach((attribute) => {
            expect(component.placementDetails['sic_site_setting'][attribute]).toEqual('test');
        });
    });

    it('#onUpdateSettings should update \'mobile_bottom_margin\', \'tablet_bottom_margin\', \'desktop_bottom_margin\' placementDetails with ad_product passed as parameter if ad_number is \'2\'', () => {
        const ad_product = {
            'sic_site_setting': {
                mobile_bottom_margin: 'test',
                tablet_bottom_margin: 'test',
                desktop_bottom_margin: 'test'
            }
        };
        const ad_number = 2;
        component.onUpdateSettings(ad_product, ad_number);
        ['mobile_bottom_margin', 'tablet_bottom_margin', 'desktop_bottom_margin'].forEach((attribute) => {
            expect(component.placementDetails['sic_site_setting'][attribute]).toEqual('test');
        });
    });

    it('#onUpdateSettings should update \'video_outstream_muted\', \'video_outstream_position\' placementDetails with ad_product passed as parameter if ad_number is \'5\'', () => {
        const ad_product = {
            'desktop': true,
            video_outstream_muted: true,
            video_outstream_position: 'test'
        };
        const ad_number = 5;
        component.onUpdateSettings(ad_product, ad_number);
        expect(component.placementDetails['sic_site_setting']['video_outstream_position']).toEqual('test');
        expect(component.placementDetails['sic_site_setting']['video_outstream_muted']).toBeTruthy();
        expect(component.placementDetails['ad_settings']['Video Pillar']['desktop'][0]['enabled']).toBeTruthy();
    });


    it('#onUpdateSettings should update \'infeed_video_desktop_muted\', \'infeed_video_mobile_muted\' placementDetails with ad_product passed as parameter if ad_number is \'6\'', () => {
        const ad_product = {
            'desktop': true,
            'mobile': true,
            desktop_sound: true,
            mobile_sound: true
        };
        const ad_number = 6;
        component.onUpdateSettings(ad_product, ad_number);
        expect(component.placementDetails['sic_site_setting']['infeed_video_desktop_muted']).toBeTruthy();
        expect(component.placementDetails['sic_site_setting']['infeed_video_mobile_muted']).toBeTruthy();
        expect(component.placementDetails['ad_settings']['In-Feed Video']['desktop'][0]['enabled']).toBeTruthy();
        expect(component.placementDetails['ad_settings']['In-Feed Video']['mobile'][0]['enabled']).toBeTruthy();
    });

    it('#onUpdateSettings should update \'infeed_video_desktop_muted\', \'infeed_video_mobile_muted\' placementDetails with ad_product passed as parameter if ad_number is \'9\'', () => {
        const ad_product = {
            'inview_appnexus_enabled': false,
            'inview_openx_enabled': false,
            'inview_criteo_enabled': false,
            'inview_aol_enabled': false,
            'inpage_appnexus_enabled': false,
            'inpage_openx_enabled': true,
            'inpage_criteo_enabled': false,
            'infeed_appnexus_enabled': false,
            'infeed_openx_enabled': true,
            'infeed_criteo_enabled': false,
            'infeed_aol_enabled': false,
            'inpage_aol_enabled': false
        };
        const ad_number = 9;
        component.onUpdateSettings(ad_product, ad_number);
        Object.keys(component.placementDetails.header_bidding_option).forEach((attr) => {
            expect(component.placementDetails['header_bidding_option'][attr]).toEqual(ad_product[attr]);
        });
    });

    it('#onUpdateSettings should update \'infeed_video_mobile_muted\',\'lkqd_enabled\',\'video_outstream_muted\',' +
        '\'infeed_video_desktop_muted\',\'spotx_channel_id\',\'video_enabled\',\'video_outstream_position\',\'video_interstitial_muted\',\'video_max_duration\'' +
        ' of placementDetails with ad_product passed as parameter if ad_number is \'10\''
        ,
        () => {
            const ad_product = {
                'infeed_video_mobile_muted': true,
                'lkqd_enabled': '',
                'video_outstream_muted': '',
                'infeed_video_desktop_muted': '',
                'spotx_channel_id': '',
                'video_enabled': true,
                'video_outstream_position': 'bottom-left',
                'video_interstitial_muted': true,
                'video_max_duration': 35
            };
            const ad_number = 10;
            component.onUpdateSettings(ad_product, ad_number);
            Object.keys(ad_product).forEach((attr) => {
                expect(component.placementDetails['sic_site_setting'][attr]).toEqual(ad_product[attr]);
            });
        });

    it('#displayErrorMessages should populate Login Message of display_error_messages with URL already registered', () => {
        component.display_error_messages = {
            'Login Message': '',
            'Site Category': '',
            'Tag Type': '',
            'Pageview': '',
            'Language': ''
        };
        component.displayErrorMessages('Login is already registered');
        expect(component.display_error_messages['Login Message']).toEqual('URL already registered');
        ['Site Category',
            'Tag Type',
            'Pageview',
            'Language'].forEach((attr) => {
                expect(component.display_error_messages[attr]).toEqual('');
            });
    });
    it('#displayErrorMessages should populate Tag Type of display_error_messages with Please select a Tag Type', () => {
        component.display_error_messages = {
            'Login Message': '',
            'Site Category': '',
            'Tag Type': '',
            'Pageview': '',
            'Language': ''
        };
        component.displayErrorMessages('Tag Type');
        expect(component.display_error_messages['Tag Type']).toEqual('Please select a Tag Type');
        ['Site Category',
            'Login Message',
            'Pageview',
            'Language'].forEach((attr) => {
                expect(component.display_error_messages[attr]).toEqual('');
            });
    });
    it('#displayErrorMessages should populate Pageview of display_error_messages with Please enter monthly pageviews', () => {
        component.display_error_messages = {
            'Login Message': '',
            'Site Category': '',
            'Tag Type': '',
            'Pageview': '',
            'Language': ''
        };
        component.displayErrorMessages('Monthly pageview estimate cant be blank');
        expect(component.display_error_messages['Pageview']).toEqual('Please enter monthly pageviews');
        ['Site Category',
            'Login Message',
            'Tag Type',
            'Language'].forEach((attr) => {
                expect(component.display_error_messages[attr]).toEqual('');
            });
    });
    it('#displayErrorMessages should populate Site Category of display_error_messages with Please select a category', () => {
        component.display_error_messages = {
            'Login Message': '',
            'Site Category': '',
            'Tag Type': '',
            'Pageview': '',
            'Language': ''
        };
        component.displayErrorMessages('Category cant be blank');
        expect(component.display_error_messages['Site Category']).toEqual('Please select a category');
        ['Pageview',
            'Login Message',
            'Tag Type',
            'Language'].forEach((attr) => {
                expect(component.display_error_messages[attr]).toEqual('');
            });
    });
    it('#displayErrorMessages should populate Site Category of display_error_messages with Please select a language', () => {
        component.display_error_messages = {
            'Login Message': '',
            'Site Category': '',
            'Tag Type': '',
            'Pageview': '',
            'Language': ''
        };
        component.displayErrorMessages('language');
        expect(component.display_error_messages['Language']).toEqual('Please select a language');
        ['Pageview',
            'Login Message',
            'Tag Type',
            'Site Category'].forEach((attr) => {
                expect(component.display_error_messages[attr]).toEqual('');
            });
    });
    it('#ngOnChanges should call #setAdsRefresh of PlacementSettingsComponent', () => {
        const spy = spyOn(component, 'setAdsRefresh');
        component.ngOnChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('#ngOnChanges should call #displayAdsSelected of PlacementSettingsComponent', () => {
        const spy = spyOn(component, 'displayAdsSelected');
        component.ngOnChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('#addNewCategory should change value of addNewCategoryFlag to true', () => {
        component.addNewCategoryFlag = false;
        component.addNewCategory();
        expect(component.addNewCategoryFlag).toBeTruthy();
    });

    it('#clonePlacementSettings should copy placementDetails of existing and create a new placementDetails json with no guid', () => {
        const copy_placement_name = 'copy_' + component.placementDetails.site_details.placement_name;
        const copy_placement_login = 'copy_' + component.placementDetails.site_details.login;
        component.new_placement = false;
        component.selected_sp = 'test';
        component.clonePlacementSettings();
        expect(component.new_placement).toBeTruthy();
        expect(component.placement_name).toEqual(component.selected_sp);
        expect(component.placementDetails.site_details.placement_name).toEqual(copy_placement_name);
        expect(component.placementDetails.site_details.login).toEqual(copy_placement_login);
        expect(component.placementDetails.site_details.guid).toEqual('');
    });

    it('#gobackToDetailPage should call #navigate of Router', inject([Router], (router: Router) => {
        spyOn(router, 'navigate').and.stub();
        component.goBackToDetailPage();
        expect(router.navigate).toHaveBeenCalled();
    }));

    it('#onHideOverlayPanel should populate addNewCategoryFlag with false', () => {
        component.addNewCategoryFlag = true;
        component.onHideOverlayPanel();
        expect(component.addNewCategoryFlag).toBeFalsy();
    });

    it('#onHideOverlayPanel should populate siteCateFlag with false', () => {
        component.siteCateFlag = true;
        component.onHideOverlayPanel();
        expect(component.siteCateFlag).toBeFalsy();
    });

    it('#onHideOverlayPanel should populate newCategory with \'\'', () => {
        component.newCategory = 'test';
        component.onHideOverlayPanel();
        expect(component.newCategory).toEqual('');
    });
});
