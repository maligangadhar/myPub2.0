import { EventEmitter } from '@angular/core';
export interface ISiteService {
  getSiteList: (search: string) => any;
  getSiteMetadata: (guid: string) => any;
  setSiteDetails: (guid: string, login: string, id: string) => void;
  setSearch: (search: string) => void;
  getTagTypeList: () => any;
  getCountryList: () => any;
 }


export interface IBroadcastService {
  broadcast: (key: string, data: any) => void;
  DataChange: EventEmitter<any>;
  clear: () => void;
}

export interface ICacheService {
  _cacheSPSearchData: any;
  _cacheSPDetailData: any;
}
