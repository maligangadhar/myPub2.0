import {
  messageType
} from './enum';

export interface IAppConfig {
  siteUrl: string;
  isProduction: boolean;
  currentUserUrl: string;
  metadataUrl: string;
  siteDetailUrl: string;
  newPlacementDetailUrl: string;
  placementDetailUrl: string;
  activityUrl: string;
  messagesDetailUrl: string;
  messageSaveUrl: string;
  addNewSPUrl: string;
  banPlacementUrl: string;
  unbanPlacementUrl: string;
  authUrl: string;
  siteCategoryUrl: string;
  udUrl: string;
  appToken: string;
  logoutUrl: string;
  jbListUrl: string;
  userListUrl: string;
  userCreateUrl: string;
}
export interface ISPCreate {
  partner_name: string;
  partner_guid: string;
  first_name: string;
  last_name: string;
  payout_curency: string;
  street_address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  email: string;
  job_function_id: number;
  url: string;
  seller_type: string;
}
export interface ISiteDetail {
  salesforce_url: string;
  supply_partner: {
    partner_name: string,
    partner_guid: string,
    sfdc_lead_id: string,
    first_name: string,
    last_name: string,
    payout_currency: string,
    street_address: string,
    city: string,
    country: string,
    state: string,
    postal_code: string
    contact_name: string,
    contact_address: string
    phone: string,
    status: string,
    url: string,
    email: string,
    job_function_id: number,
    seller_type: string;
  };
  placements: IPlacement[];
}
export interface IPlacement {
  guid: string;
  login: string;
  placement_name: string;
}
export interface IKeyValue {
  id: number;
  name: string;
}

export interface IAppParams {
  getParams: () => IAppConfig;
}

export interface IMessage {
  showMessage: boolean;
  message: string;
}

export interface ISiteSearch {
  partner_type: string;
  id: string;
  partner_guid: string;
  partner_name: string;
}
export interface IKeyData {
  key: string;
  data: any;
}
export class Passback {
  device: string;
  ad_size: string;
  passback_tag: string;
  passback_tag_enabled: boolean;
}

export class InViewPassback {
  desktopPassback: boolean;
  phonePassback: boolean;
  tabletPassback: boolean;
}
export class InFeedPassback {
  desktopPassback: boolean;
  phonePassback: boolean;
  tabletPassback: boolean;
}

export class CurrentUserDetails {
  email: string;
  name: string;
}

export class MetaData {
  data: PlacementMetaData;
}

export class PlacementMetaData {
  site_categories: any;
  tag_types: any;
  ad_products: any;
  real_video_settings: any;
}

export class SiteCategory {
  id: number;
  name: string;
  code: number;
}

// export class Ad_prdocuts_size {
//   device_id: number;
//   product_id: number;
//   selected: boolean;
//   size: string;
// }

export class AdsRefresh {
  enabled: boolean;
  time: number;
}

export class Pillar {
  ads_refresh: boolean;
  ads_refresh_timer: number;
  enable_passback_tag: boolean;
  desktop: string[];
  pillar_position: string;
  pillar_animation: string;
  pillar_content_push_settings: boolean;
  tablet: string[];
  passback: Array<Passback>;
}

export class Adhesion {
  desktop: string[];
  tablet: string[];
  phone: string[];
  ads_refresh: boolean;
  ads_refresh_timer: number;
  adhesion_bottom_margin: {
    desktop: number,
    tablet: number,
    phone: number
  };
  enable_passback_tag: boolean;
  passback: Array<Passback>;
}

export class AdhesionBottomMarginFlag {
  desktop: boolean;
  tablet: boolean;
  phone: boolean;
}
export class Interstitial {
  desktop: string[];
  tablet: string[];
  phone: string[];
  ads_refresh: boolean;
  ads_refresh_timer: number;
  enable_passback_tag: boolean;
  passback: Array<Passback>;
}

export class VideoInterstitial {
  desktop: boolean;
  sound: boolean;
}

export class VideoPillar {
  desktop: boolean;
  video_outstream_muted: boolean;
  video_outstream_position: string;
  page_left: boolean;
  page_right: boolean;
}

export class InfeedVideo {
  desktop: boolean;
  desktop_sound: boolean;
  mobile: boolean;
  mobile_sound: boolean;
}


export class InfeedImpact {
  desktop: string[];
  phone: string[];
  ads_refresh: boolean;
  ads_refresh_timer: number;
  enable_passback_tag: boolean;
  passback: Passback[];
}


export class SIAB {
  desktop: string[];
  tablet: string[];
  phone: string[];
  ads_refresh: boolean;
  ads_refresh_timer: number;
  enable_passback_tag: boolean;
  passback: Passback[];
}

export class ClientSide {
  real_impact: {
    appNexus: boolean,
    openX: boolean,
    criteo: boolean,
    aol: boolean
  };
  real_display: {
    appNexus: boolean,
    openX: boolean,
    criteo: boolean,
    aol: boolean
  };
  infeed_impact: {
    appNexus: boolean,
    openX: boolean,
    criteo: boolean,
    aol: boolean
  };
}

export class RealVideo {
  lkqd_enabled: boolean;
  spotx_channel: number;
  maximum_duration: number;
}

export class PlacementDetail {
  placement_name: string;
  true_url: string;
  tag_type: string;
  monthly_page_views: string;
  site_language: string;
  pillar: Pillar;
  adhesion: Adhesion;
  interstitial: Interstitial;
  video_interstitial: VideoInterstitial;
  video_pillar: VideoPillar;
  infeed_video: InfeedVideo;
  infeed_impact: InfeedImpact;
  siab: SIAB;
  client_side: ClientSide;
  real_video: RealVideo;
}

export class Size {
  id: string;
  enabled: boolean;
  size: string;
  selected: boolean;
}

export class IMessageDetail {
  id: string;
  location: string;
  message_type: string;
  sort_index: string;
  html: string;
  message: string;
  size: string;
  enabled: boolean;
  selected: boolean;
}
export interface IMessage {
  showMessage: boolean;
  message: string;
  type: messageType;
}
export interface ILanguage {
  name: string;
  code: string;
}

export interface IActivity {
  email: string;
  site_url: string;
  guid: string;
  updated: JSON;
  created_at: string;
}

export interface IBanGuid {
  login: string;
  guid: string;
  supply_partner_id: string;
}

export interface IUserDetails {
  email: string;
}
