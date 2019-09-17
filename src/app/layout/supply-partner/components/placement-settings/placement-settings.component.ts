import { Component, OnInit, OnChanges } from '@angular/core';
import { SiteService } from '../../../../services/site.service';
import { routerTransition } from '../../../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsRefresh } from '../../../../models/viewModels';
import { MetadataService } from '../../../../services/metadata.service';
import { Message, SelectItem } from 'primeng/api';
import { PlacementService } from '../../../../services/placement.service';
import { InfeedPassbackService } from '../../../../services/passback-service/infeed-passback.service';
import { BroadcastService } from '../../../../services/broadcast.service';
import { InviewPassbackService } from '../../../../services/passback-service/inview-passback.service';
import { UserService } from '../../../../services/user.service';
/**
       * code : 
          * 1. desktop
          * 2. Tablet  
          * 3 Phone
       * 
       * Product : 
          * 1. Pillar
          * 2. Adhesion
          * 5. Video Pillar
          * 6. In-feed video
          * 7. In-feed Impact
          * 8. SIAB  
   */

@Component({
    selector: 'gc-placements',
    templateUrl: './placement-settings.component.html',
    styleUrls: ['./placement-settings.component.scss'],
    animations: [routerTransition()]
})
export class PlacementSettingsComponent implements OnInit, OnChanges {

    public placementDetailsLoading: boolean = true;
    public CategoryList: any[];
    public MetaData: any;
    public languageList: any;
    inFeedPassbackValue: any;
    sic_site_settings = 'sic_site_setting';
    public savePlacementBtn: string = 'save settings';
    install_method = 'install_method';
    msgs: Message[] = [];
    validFlag: boolean = true;
    siteCategory: number;
    display_selected_ads_flag: number = 0;
    validation_flag: any;
    selected_id: string;
    sp_guid: string;
    selected_guid: string = '';
    placement_name: string = '';
    selected_sp: string = '';
    tagList: string[] = [];
    new_placement: boolean;
    ads_refresh: AdsRefresh;
    timer: number = 3000;
    submitted: boolean = false;
    addUserSuggession: string[] = [];
    auto_suggest_results: string[] = [];
    halt_update_create: any = {
        'Standard Display': false,
        'Adhesion': false
    };
    display_error_messages = {
        'Login Message': '',
        'Site Category': '',
        'Tag Type': '',
        'Pageview': '',
        'Language': ''
    };
    placementDetails: any;
    panel_headers = {
        pillar: 'Pillar',
        adhesion: 'Adhesion',
        video_pillar: 'Video Pillar',
        infeed_video: 'Infeed Video',
        infeed_impact: 'Infeed Impact',
        siab: 'SIAB',
        client_side: 'Client side settings',
        real_video: 'Real video settings',
        publisher_pricing: 'Publisher Pricing Controls'
    };

    selected_ads = {
        'Pillar': '',
        'Adhesion': '',
        'In-Feed Impact': '',
        'Standard Display': ''
    };
    siteCategoryList: SelectItem[] = [];
    addNewCategoryFlag: boolean = false;
    newCategory: string = '';
    siteCateFlag: boolean = false;
    siteCategoryName: String = '';
    infeedDesktop: string = '';
    infeedPhone: string = '';
    inviewDesktop: string = '';
    inviewPhone: string = '';
    inviewTablet: string = '';
    is_clone: boolean = false;
    adUserFlag: boolean = true;
    prevNavigateRoute: string = '';

    placement_users: any[] = [];
    users: string[] = [];
    filteredUsers: any[];
    add_user: string;
    data_license_cannot_use = false;
    data_license_unrestricted = true;

    

    constructor(private siteService: SiteService, private userService: UserService, private router: Router, private route: ActivatedRoute, private infeedPassback: InfeedPassbackService, private metaDataService: MetadataService,
        private placementService: PlacementService, private broadcast: BroadcastService,
        private inviewPassback: InviewPassbackService
    ) {
        this.broadcast.broadcast('placement', true);
    }
    ngOnInit() {
        this.prevNavigateRoute = this.router.url;
        this.broadcast.broadcast('login', false);
        localStorage.setItem('prevNavigateRoute', this.prevNavigateRoute);
        this.selected_guid = this.route.snapshot.queryParamMap.get('guid');
        this.selected_sp = this.route.snapshot.queryParamMap.get('name');
        this.selected_id = this.route.snapshot.queryParamMap.get('id');
        this.new_placement = (this.route.snapshot.queryParamMap.get('new') === 'true');
        this.is_clone = (this.route.snapshot.queryParamMap.get('clone') === 'true');
        this.inviewPassback.desktopPassbackTagValue.subscribe(desktopPassbackTagValue => this.inviewDesktop = desktopPassbackTagValue);
        this.inviewPassback.phonePassbackTagValue.subscribe(phonePassbackTagValue => this.inviewPhone = phonePassbackTagValue);
        this.inviewPassback.tabletPassbackTagValue.subscribe(tabletPassbackTagValue => this.inviewTablet = tabletPassbackTagValue);
        this.infeedPassback.desktopPassbackTagValue.subscribe(desktopPassbackTagValue => this.infeedDesktop = desktopPassbackTagValue);
        this.infeedPassback.phonePassbackTagValue.subscribe(phonePassbackTagValue => this.infeedPhone = phonePassbackTagValue);
        if (!this.selected_guid) {
            this.siteService.selected_guid.subscribe(currentData => this.selected_guid = currentData);
        }
        if (!this.selected_sp) {
            this.siteService.selected_sp.subscribe(currentData => this.selected_sp = currentData);
        }
        if (!this.selected_id) {
            this.siteService.selected_id.subscribe(currentData => this.selected_id = currentData);
        }
        this.getPlacementDetails();
        this.getLanguageData();
    }

    siteCategoryChange(event) {
        this.siteCategoryList.forEach(el => {
            if (el.value === event.value) {
                this.siteCategoryName = el.label;
            }
        });
        this.display_error_messages['Site Category'] = '';
    }
    ngOnChanges() {
        this.setAdsRefresh();
        this.displayAdsSelected();
    }

    /**
     * check for data license
     */
    checkDataLicense = (type, value) =>  {
        if ( type === 'unrestricted') {
            this.data_license_cannot_use = !value;
        } 
        if ( type === 'cannotuse') {
            this.data_license_unrestricted = !value;
        }
    }
    addNewCategory = () => {
        this.addNewCategoryFlag = true;
    }
    /**
     * add new category item 
     */
    addNewCategoryItem = () => {
        const category = {
            'sic_content_type': {
                'name': this.newCategory
            }
        };
        this.placementService.saveSiteCategory(category).subscribe((result: any[]) => {
            if (result) {
                this.msgs = [];
                this.newCategory = '';
                this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Successfully created Site Category' });
                this.siteCategoryList = [];
                result.forEach((el) => {
                    this.siteCategoryList.push({ 'label': el.name, 'value': el.code });
                    if (el.value === this.siteCategory) {
                        this.siteCategoryName = el.label;
                    }
                });
                this.triggerTimeOut();
            }
        }, error => {
            this.msgs = [];
            this.newCategory = '';
            this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
            this.triggerTimeOut();
        });
    }
    /**
     * trigger time out
     */
    triggerTimeOut() {
        setTimeout(() => {
            this.msgs = [];
        }, this.timer);
    }
    /**
     * Retrieves category list and tag type list  data from metaData Api 
     */
    getMetaData = () => {
        this.metaDataService.getMetaData().subscribe((result) => {
            this.MetaData = result;
            if (this.MetaData.data.site_categories) {
                this.MetaData.data.site_categories.forEach(category => {
                    this.siteCategoryList.push({ 'label': category.name, 'value': category.code });
                    if (category.code === this.siteCategory) {
                        this.siteCategoryName = category.name;
                    }
                });
            }
            if (this.MetaData.data.tag_types) {
                this.tagList = this.MetaData.data.tag_types;
                this.tagList.forEach((tag, index) => {
                    if (tag === 'DFP') {
                        this.tagList[index] = 'Ad Server';
                    }
                });
            }
        }, error => {
            this.handleErrorMsg(error);
        });
    }

    /**
     * Retrieves language list from MetaDataService
     */
    getLanguageData = () => {
        this.metaDataService.getLanguageData().subscribe((result) => {
            this.languageList = result;
        }, error => {
            this.handleErrorMsg(error);
        });
    }
    
    /**
     * set data license as 1 : unrestricted 3: cannot use
     */
    setDatalicense = () => {
        if (this.data_license_unrestricted) {
            this.placementDetails.site_details['data_license'] = 1;
        } else if (this.data_license_cannot_use) {
            this.placementDetails.site_details['data_license'] = 3;
        }
    }

    /**
     * set passback values
     */
    setPassbackValues = () => {
        if (this.placementDetails && this.placementDetails[this.sic_site_settings]) {
            this.inviewPassback.setInviewDesktopValue(this.placementDetails[this.sic_site_settings]['inview_desktop_passback']);
            this.inviewPassback.setInviewPhoneValue(this.placementDetails[this.sic_site_settings]['inview_mobile_passback']);
            this.inviewPassback.setInviewTabletValue(this.placementDetails[this.sic_site_settings]['inview_tablet_passback']);
            this.infeedPassback.setInFeedDesktopValue(this.placementDetails[this.sic_site_settings]['infeed_desktop_passback']);
            this.infeedPassback.setInFeedPhoneValue(this.placementDetails[this.sic_site_settings]['infeed_mobile_passback']);
        }
    }
    /**
     * Retrieves placement details of selected placement if selected an existing placement
     * Retrieves a skeleton to create new placement if 'create new placement' is clicked on supply partner details page
     */
    getPlacementDetails = () => {
        this.placementDetailsLoading = true;
        // Retrieves placement details of selected placement
        if (this.new_placement) {
            this.placementService.getNewPlacementDetails(this.selected_id).subscribe((result: any) => {
                if (result) {
                    this.placementDetails = result;
                    this.placement_name = this.selected_sp;
                    this.selected_sp = this.placementDetails['supply_partner']['partner_name'];
                    this.selected_id = this.placementDetails['supply_partner']['id'];
                    this.placementDetails['sic_site_setting']['install_method'] = 'Ad Server';
                    this.placement_users = this.placementDetails['users'];
                    this.setPassbackValues();
                    this.setAdsRefresh();
                    this.displayAdsSelected();
                    // check for DFP ad type 
                    this.placementDetails.sic_site_setting.install_method = (this.placementDetails.sic_site_setting.install_method === 'DFP') ? 'Ad Server' : this.placementDetails.sic_site_setting.install_method;
                    this.siteCategory = this.placementDetails['site_details']['content_type_id'];
                    // check if no language is selected then make english as default language
                    if (!this.placementDetails['site_details']['language']) {
                        this.placementDetails['site_details']['language'] = 'English';
                    }
                    // check for data license 
                    this.setDataliceDetails();
                    setTimeout(() => {
                        this.placementDetailsLoading = false;
                    }, 500);
                    this.getMetaData();
                }
            }, error => {
                this.handleErrorMsg(error);
            });
        } else if (this.selected_id) {
            this.savePlacementBtn = 'update settings';
            this.placementService.getPlacementDetails(this.selected_id, this.selected_guid).subscribe((result: any) => {
                if (result) {
                    this.placementDetails = result;
                    this.selected_guid = result['site_details']['guid'];
                    this.placement_name = result['site_details']['placement_name'];
                    this.sp_guid = this.placementDetails['supply_partner']['partner_guid'];
                    this.placement_users = this.placementDetails['users'];
                    if (!this.placement_name) {
                        this.placement_name = this.selected_sp;
                        this.placementDetails.site_details.placement_name = this.placement_name;
                    }
                    this.selected_guid = this.placementDetails['site_details']['guid'];
                    this.selected_sp = this.placementDetails['supply_partner']['partner_name'];
                    this.selected_id = this.placementDetails['supply_partner']['id'];
                    this.setAdsRefresh();
                    this.displayAdsSelected();
                    this.setPassbackValues();
                    // check for DFP ad type 
                    this.placementDetails.sic_site_setting.install_method = (this.placementDetails.sic_site_setting.install_method === 'DFP') ? 'Ad Server' : this.placementDetails.sic_site_setting.install_method;
                    this.siteCategory = this.placementDetails['site_details']['content_type_id'];
                    this.setDataliceDetails();
                    setTimeout(() => {
                        this.placementDetailsLoading = false;
                    }, 500);
                    this.getMetaData();
                    if (this.is_clone) {
                        this.savePlacementBtn = 'save settings';
                        this.clonePlacementSettings();
                    }
                }
            }, error => {
                this.handleErrorMsg(error);
            });
        }
    }

    /**
     * set data license details while loading placement details
     */
    setDataliceDetails = () => {
        if (this.placementDetails['site_details']['data_license']) {
            const data_license = this.placementDetails['site_details']['data_license'];
            if (data_license === 1) {
                this.data_license_unrestricted = true;
                this.data_license_cannot_use = false;
            } else if (data_license === 3) {
                this.data_license_unrestricted = false;
                this.data_license_cannot_use = true;
            }
        }
    }
    /**
     *  cancel existing selected placement
     */
    viewPlacementSettings = () => {
        this.broadcast.broadcast('placement', 'true');
        this.router.navigate(['placements'], {
            queryParams: {
                'guid': this.selected_guid, 'name': this.placement_name, 'id': this.selected_id,
                'spId': this.sp_guid, 'spName': this.selected_sp
            }
        });
        this.siteService.setplacementGuid(this.selected_guid);
    }
    /**
     * handle error messages
     */
    handleErrorMsg = (error) => {
        this.placementDetailsLoading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
        if (error['status'] && error['status'] === 401) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('token');
            this.broadcast.broadcast('login', 'true');
            setTimeout(() => {
                this.msgs = [];
                this.router.navigate(['login']);
            }, this.timer);
        }
    }
    /**
     * placement change event to remove placement error messages
     */
    placementChange = (event) => {
        this.display_error_messages['placement-name'] = '';
    }
  
    /**
     * monthly change event to remove page view error message
     */
    monthlyChange = (event) => {
        this.display_error_messages['Pageview'] = '';
    }
    /**
     * url change event to remove placement error messages
     */
    urlChange = (event) => {
        this.display_error_messages['Login Message'] = '';
    }

    onHideOverlayPanel = () => {
        this.addNewCategoryFlag = false;
        this.newCategory = '';
        this.siteCateFlag = false;
    }

    siteCategoryFlagUpdate = (op, event) => {
        this.siteCateFlag = true;
        op.toggle(event);
    }

    onSiteCategoryChange = (op, event) => {
        this.siteCategoryChange(event);
        op.hide();
    }

    /**
     * check for validations
     */
    checkPlacementValidation = () => {
        this.validFlag = true;
        this.msgs = [];
        this.siabPassbackValidation();
        if (this.placementDetails.site_details) {
            if (!this.placementDetails.site_details.placement_name) {
                this.display_error_messages['placement-name'] = 'Please enter placement name';
                this.validFlag = false;
            } if (!this.placementDetails.site_details.login) {
                this.display_error_messages['Login Message'] = 'Please enter URL';
                this.validFlag = false;
            } if (!this.placementDetails.site_details.sic_monthly_pv_estimate) {
                this.display_error_messages['Pageview'] = 'Please enter monthly page views';
                this.validFlag = false;
            } if (this.siteCategory !== 0 && !this.siteCategory) {
                this.display_error_messages['Site Category'] = 'Please enter site category';
                this.validFlag = false;
            }
            if (this.placementDetails.site_details.max_content_push) {
                const maxContent = this.placementDetails.sic_site_setting.max_content_push;
                if (isNaN(maxContent) && maxContent !== 'viewport') {
                    const msg = 'Max content push max_content_push can only be a non - negative integer, or the special keyword viewport';
                    this.validFlag = false;
                    this.msgs.push({ severity: 'error', summary: 'Error', detail: msg });
                }
            }
        } if (this.halt_update_create && this.halt_update_create['Standard Display']) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Please enter SIAB passback values' });
            this.triggerTimeOut();
            this.validFlag = false;
        } if (this.halt_update_create && this.halt_update_create['Adhesion']) {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Please enter valid Adhesion bottom margin values' });
            this.triggerTimeOut();
            this.validFlag = false;
        }
        return this.validFlag;
    }
    /**
     * Creates a new placement after click on Save settings button if new_placement is true
     * Updates placement settings after click on Save Settings button if new_placement is false or null
     */
    createUpdatePlacementSettings = () => {
        this.submitted = true;
        Object.keys(this.display_error_messages).forEach((attr) => {
            this.display_error_messages[attr] = '';
        });
        this.msgs = [];
        if (this.placementDetails.hasOwnProperty(this.sic_site_settings) && this.placementDetails.sic_site_setting.install_method) {
            if (this.placementDetails.sic_site_setting.install_method === 'Ad Server') {
                this.placementDetails.sic_site_setting.install_method = 'DFP';
            }
        }
        if (this.placementDetails && this.placementDetails.hasOwnProperty(this.sic_site_settings)) {
            this.placementDetails[this.sic_site_settings]['infeed_desktop_passback'] = this.infeedDesktop;
            this.placementDetails[this.sic_site_settings]['infeed_mobile_passback'] = this.infeedPhone;
            this.placementDetails[this.sic_site_settings]['inview_desktop_passback'] = this.inviewDesktop;
            this.placementDetails[this.sic_site_settings]['inview_mobile_passback'] = this.inviewPhone;
            this.placementDetails[this.sic_site_settings]['inview_tablet_passback'] = this.inviewTablet;
        }
        // set data license
        this.setDatalicense();
        this.setPassbackValues();
        this.checkPlacementValidation();
        if (this.validFlag) {
            this.placementDetailsLoading = true;
            this.placementDetails['users'] = this.placement_users;
            if (this.placementDetails.site_details && this.placementDetails.site_details.placement_name) {
                this.placementDetails.site_details.placement_name = this.placementDetails.site_details.placement_name.trim();
            }
            if (this.placementDetails[this.sic_site_settings]) {
                ['siab_auto_refresh_enabled', 'auto_refresh_after_fill_enabled', 'auto_refresh_enabled'].forEach((attr) => {
                    this.placementDetails[this.sic_site_settings][attr] = this.ads_refresh.enabled;
                });
                this.placementDetails['site_details']['content_type_id'] = this.siteCategory;
                /** Creates new placement*/
                if (this.new_placement) {
                    this.placementService.savePlacementSettings(this.selected_id, this.placementDetails).subscribe((result) => {
                        this.new_placement = false;
                        this.handleSuccess(result, 'created');
                    }, error => {
                        this.handleErrorMessage(error);
                    });
                } else {
                    this.placementDetailsLoading = true;
                    this.placementService.updatePlacementSettings(this.selected_id, this.placementDetails).subscribe((result) => {
                        this.handleSuccess(result, 'updated');
                    }, error => {
                        this.handleErrorMessage(error);
                    });
                }
            } else {
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Sic site settings are missing' });
                this.triggerTimeOut();
            }
        }
    }

    /**
     * handle success messages
     */
    handleSuccess = (result, msgType) => {
        this.selected_guid = result['site_details']['guid'];
        this.placement_name = result['site_details']['placement_name'].trim();
        this.placementDetailsLoading = false;
        this.placementDetails = result;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Placement ' + msgType + ' successfully' });
        this.triggerTimeOut();
        this.router.navigate(['placements'], {
            queryParams: {
                'guid': this.placementDetails.site_details.guid,
                'name': (this.placementDetails.site_details.placement_name) ? this.placementDetails.site_details.placement_name : this.placementDetails.site_details.login,
                'id': this.placementDetails.supply_partner.id,
                'spId': this.placementDetails.supply_partner.partner_guid, 'spName': this.placementDetails.supply_partner.partner_name,
                'create_update': msgType
            }
        });
    }
    /**
     * handle error messages
     */
    handleErrorMessage = (error) => {
        this.placementDetailsLoading = false;
        this.msgs = [];
        if (error['status'] && error['status'] === 401) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('token');
            this.broadcast.broadcast('login', 'true');
            setTimeout(() => {
                this.msgs = [];
                this.router.navigate(['login']);
            }, this.timer);
        }
        if (Array.isArray(error['message'])) {
            error['message'].forEach(error_message => {
                this.msgs.push({ severity: 'error', summary: 'Error', detail: error_message });
                this.displayErrorMessages(error_message);
            });
        } else if (typeof (error['message']) === 'object') {
            this.msgs = [];
            Object.keys(error['message']).forEach((key) => {
                this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'][key] });
            });
        } else {
            this.msgs.push({ severity: 'error', summary: 'Error', detail: error['message'] });
            this.displayErrorMessages(error['message']);
        }
        this.triggerTimeOut();
    }
    siabPassbackValidation = () => {
        if (this.placementDetails && this.placementDetails.ad_settings && this.placementDetails.ad_settings['Standard Display']) {
            Object.keys(this.placementDetails.ad_settings['Standard Display']).forEach((device) => {
                this.placementDetails.ad_settings['Standard Display'][device].forEach((ad_unit) => {
                    if (ad_unit.enabled && ad_unit.passback_tag.length <= 0 && this.halt_update_create && this.halt_update_create['Standard Display']) {
                        this.halt_update_create['Standard Display'] = true;
                    }
                });
            });
        }
    }
    displayErrorMessages = (element: string) => {
        if ((element.indexOf('login') >= 0) || (element.indexOf('Login') >= 0)) {
            if ((element === 'Login should show correct domain') || (element === 'Login should not be blank')) {
                this.display_error_messages['Login Message'] = 'Please enter a valid URL';
            } else {
                this.display_error_messages['Login Message'] = 'URL already registered';
            }
        }
        if (element.indexOf('Tag Type') >= 0) {
            this.display_error_messages['Tag Type'] = 'Please select a Tag Type';
        }
        if (element.indexOf('Category') >= 0) {
            this.display_error_messages['Site Category'] = 'Please select a category';
        }
        if (element.indexOf('Monthly') >= 0) {
            this.display_error_messages['Pageview'] = 'Please enter monthly pageviews';
        }
        if (element.indexOf('language') >= 0 || element.indexOf('Language') >= 0) {
            this.display_error_messages['Language'] = 'Please select a language';
        }
    }
    setAdsRefresh = () => {
        if (this.placementDetails && this.placementDetails[this.sic_site_settings]) {
            this.ads_refresh = {
                enabled: this.placementDetails[this.sic_site_settings]['auto_refresh_enabled'],
                time: this.placementDetails[this.sic_site_settings]['auto_refresh_interval']
            };
        } else {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Sic site settings are missing' });
            this.triggerTimeOut();
        }
    }

    /**
     * Updates placement details of ad products when an emit is fired from child components
     * @param ad_product
     * @param ad_number
     */
    onUpdateSettings(ad_product, ad_number) {
        if (this.placementDetails && this.placementDetails[this.sic_site_settings]) {

            // Capturing pillar_content_push_settings,pillar_position and pillar_animation from pillar-component emit
            if (ad_number === 1) {
                ['max_content_push', 'tb_position', 'tb_animation'].forEach((attribute) => {
                    this.placementDetails[this.sic_site_settings][attribute] = ad_product[this.sic_site_settings][attribute];
                });
            }

            // Capturing mobile_bottom_margin,tablet_bottom_margin and desktop_bottom_margin from adhesion-component emit
            if (ad_number === 2) {
                ['mobile_bottom_margin', 'tablet_bottom_margin', 'desktop_bottom_margin'].forEach((attribute) => {
                    if (this.placementDetails[this.sic_site_settings][attribute] && ad_product[this.sic_site_settings][attribute]) { this.placementDetails[this.sic_site_settings][attribute] = ad_product[this.sic_site_settings][attribute]; }
                });
            }

            // Capturing Video Pillar ad settings valuesmah
            if (ad_number === 5) {
                this.placementDetails['ad_settings']['Video Pillar']['desktop'][0]['enabled'] = ad_product['desktop'];
                this.placementDetails[this.sic_site_settings]['video_outstream_muted'] = ad_product['video_outstream_muted'];
                this.placementDetails[this.sic_site_settings]['video_outstream_position'] = ad_product['video_outstream_position'];
            }

            // Capturing Infeed Video ad settings values
            if (ad_number === 6) {
                this.placementDetails['ad_settings']['In-Feed Video']['desktop'][0]['enabled'] = ad_product['desktop'];
                this.placementDetails['ad_settings']['In-Feed Video']['mobile'][0]['enabled'] = ad_product['mobile'];
                this.placementDetails[this.sic_site_settings]['infeed_video_desktop_muted'] = ad_product['desktop_sound'];
                this.placementDetails[this.sic_site_settings]['infeed_video_mobile_muted'] = ad_product['mobile_sound'];
            }

            // Capturing header bidding options from client-side-settings-component emit
            if (ad_number === 9) {
                this.placementDetails['header_bidding_option'] = ad_product;
            }

            // Capturing real video settings
            if (ad_number === 10) {
                ['infeed_video_mobile_muted',
                    'lkqd_enabled',
                    'video_outstream_muted',
                    'infeed_video_desktop_muted',
                    'spotx_channel_id',
                    'video_enabled',
                    'video_outstream_position',
                    'video_interstitial_muted',
                    'video_max_duration'].forEach((element) => {
                        this.placementDetails[this.sic_site_settings][element] = ad_product[element];
                    });
            }
            // 11 
            if (ad_number === 11) {
                ['tier_1' , 'tier_2' , 'tier_3'].forEach((element) => {
                    this.placementDetails[this.sic_site_settings][element] = ad_product[element];
                });
            }
            this.displayAdsSelected();
        } else {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Sic site settings are missing' });
            this.triggerTimeOut();
        }
    }

    /**
     * Displays the selected ad-sizes by total ad-sizes in a particular ad-product panel
     */
    displayAdsSelected = () => {
        let total_ads: number;
        let total_ads_selected: number;
        const selected_ads_temp = {
            'Pillar': '',
            'Adhesion': '',
            'In-Feed Impact': '',
            'Standard Display': ''
        };
        if (this.placementDetails && this.placementDetails.ad_settings) {
            Object.keys(this.placementDetails.ad_settings).forEach((ad_product) => {
                total_ads = 0;
                total_ads_selected = 0;
                if (this.placementDetails.ad_settings[ad_product]['desktop']) {
                    total_ads += this.placementDetails.ad_settings[ad_product]['desktop'].length;
                    this.placementDetails.ad_settings[ad_product]['desktop'].forEach(element => {
                        if (element.enabled) {
                            total_ads_selected += 1;
                        }
                    });
                }
                if (this.placementDetails.ad_settings[ad_product]['mobile']) {
                    total_ads += this.placementDetails.ad_settings[ad_product]['mobile'].length;
                    this.placementDetails.ad_settings[ad_product]['mobile'].forEach(element => {
                        if (element.enabled) {
                            total_ads_selected += 1;
                        }
                    });
                }
                if (this.placementDetails.ad_settings[ad_product]['tablet']) {
                    total_ads += this.placementDetails.ad_settings[ad_product]['tablet'].length;
                    this.placementDetails.ad_settings[ad_product]['tablet'].forEach(element => {
                        if (element.enabled) {
                            total_ads_selected += 1;
                        }
                    });
                }
                if (total_ads_selected > 0) {
                    this.display_selected_ads_flag = 1;
                }
                selected_ads_temp[ad_product] = total_ads_selected + '/' + total_ads;
            });
            if (this.new_placement) {
                if (this.display_selected_ads_flag) {
                    this.selected_ads = selected_ads_temp;
                }
            } else {
                this.selected_ads = selected_ads_temp;
            }
        } else {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Ad settings are missing' });
            this.triggerTimeOut();
        }
    }
    goBackToDetailPage = () => {
        this.router.navigate(['spDetail'], { queryParams: { id: this.selected_id, name: this.selected_sp, guid: this.selected_guid } });
    }

    /**
     * clone placement settings
     */
    clonePlacementSettings = () => {
        this.placementDetailsLoading = true;
        this.new_placement = true;
       // this.siteService.selected_guid.subscribe(currentData => this.selected_guid = currentData);
        this.placement_name = this.selected_sp;
        this.placementDetails['site_details']['guid'] = '';
        this.placementDetails.site_details.placement_name = 'copy_' + this.placementDetails.site_details.placement_name;
        this.placementDetails.site_details.login = 'copy_' + this.placementDetails.site_details.login;
        setTimeout(() => {
            this.placementDetailsLoading = false;
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Cloned successfully' });
            this.triggerTimeOut();
        }, 500);
    }
    
    /**
     * filtering the users
     * @param event 
     */
    filterUsers(event) {
        this.userService.getUserDetailsBySearch(event.query).subscribe(results => {
            this.users = results['data'];
            this.filteredUsers = [];
            for (let i = 0; i < this.users.length; i++) {
                const brand = this.users[i]['email'];
                // if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.filteredUsers.push(brand);
                // }
            }
        });
    }

    /**
     * add new user
     */
    addUser = (user) => {
        this.add_user = '';
        this.users.forEach(users => {
            if (users['email'] === user ) {
                this.placement_users.push({'email': user , 'user_id': users['id']});
            } 
        });
        if (this.users.length < 1 && this.validateEmail(user)) {
            this.placement_users.push({ 'email': user, 'user_id': 0 });
        }
    }
    
    /**
     * validate for email checl
     */
    validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}
