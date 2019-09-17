import { IAppConfig } from '../app/models/viewModels';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
let gatewayEndPoint = 'https://platform.33across.com';

// Production GC Token - By default 
let appToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOjEwfQ.T-vLy9sb_7W3anWq1B-8ZvvnakN75b56eHE3kv2i1qk';

if (window.location.hostname.indexOf('-') !== -1) {
  const currentURL = window.location.hostname.split('-')[0];
  if (currentURL) {
    gatewayEndPoint = 'https://' + currentURL + '-platform.33across.com';
    if (currentURL === 'demo') {
      appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOjh9.8cVJoqlvePcGMVwvRe4RVW73sJslqU6I2_HNT5aVeIQ';
    } else if (currentURL === 'staging') {
      appToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOjd9._dS7jGi14A-tucXcK6L2LcyMFUvn_L7P-FTAlqlDmMo';
    } else if (currentURL === 'qap') {
      appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOjEwfQ.bqDaYPtbEQntSf9EPbX05FgK8bTPgK78T76_y_RTHxw';
    }
  }
} else if (window.location.hostname === 'localhost' ) {
  // Local Token
  appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOjh9.8cVJoqlvePcGMVwvRe4RVW73sJslqU6I2_HNT5aVeIQ';
}

export const environment: IAppConfig = {
  isProduction: true,
  currentUserUrl: gatewayEndPoint + '/api/admin_metadata',
  metadataUrl: gatewayEndPoint + '/api/supply_partners/metadata',
  siteDetailUrl: gatewayEndPoint + '/api/supply_partners/',
  siteUrl: gatewayEndPoint + '/api/supply_partners/search/',
  newPlacementDetailUrl: gatewayEndPoint + '/api/supply_partners/',
  placementDetailUrl: gatewayEndPoint + '/api/supply_partners/',
  activityUrl: gatewayEndPoint + '/api/activities',
  messagesDetailUrl: gatewayEndPoint + '/api/messages',
  messageSaveUrl: gatewayEndPoint + '/api/messages/update_messages',
  addNewSPUrl: gatewayEndPoint + '/api/supply_partners',
  banPlacementUrl: gatewayEndPoint + '/api/supply_partners/ban_placements',
  unbanPlacementUrl: gatewayEndPoint + '/api/supply_partners/unban_placements',
  authUrl: gatewayEndPoint + '/gc_admin_home',
  siteCategoryUrl: gatewayEndPoint + '/api/sic_content_types',
  udUrl: gatewayEndPoint,
  appToken: appToken,
  logoutUrl: gatewayEndPoint + '/api/gc_logout',
  jbListUrl: gatewayEndPoint + '/api/job_functions',
  userListUrl: gatewayEndPoint + '/api/users/search',
  userCreateUrl: gatewayEndPoint + '/api/users'
};



