import {IAppConfig} from '../app/models/viewModels';

const gatewayEndPoint = 'https://platform.33across.com';
// const gatewayEndPoint = 'http://localhost:3000';
const appToken: string = '';
export const environment: IAppConfig = {
  isProduction: true,
  currentUserUrl: gatewayEndPoint + '/api/admin_metadata',
  metadataUrl: gatewayEndPoint + '/api/supply_partners/metadata',
  siteUrl: gatewayEndPoint + '/api/supply_partners/search/',
  siteDetailUrl: gatewayEndPoint + '/api/supply_partners/',
  addNewSPUrl: gatewayEndPoint + '/api/supply_partners',
  newPlacementDetailUrl: gatewayEndPoint + '/api/supply_partners/',
  placementDetailUrl: gatewayEndPoint + '/api/supply_partners/',
  activityUrl: gatewayEndPoint + '/api/activities',
  messagesDetailUrl: gatewayEndPoint + '/api/messages',
  messageSaveUrl: gatewayEndPoint + '/api/messages/update_messages',
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


