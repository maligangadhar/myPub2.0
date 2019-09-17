import { Injectable, Inject } from '@angular/core';
import { ISiteService } from '.././interface/interfaces';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ISiteDetail } from '../models/viewModels';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

@Injectable({ providedIn: 'root' })
export class SiteService implements ISiteService {

  siteGuid: string;
  siteUrl = environment.siteUrl;
  setSearch: (search: string) => void;
  setReloadFlag: (reloadFlag: string) => void;
  selected_guid = new BehaviorSubject('');
  siteSearchText = new BehaviorSubject('');
  siteReloadFlag = new BehaviorSubject('');
  selected_sp = new BehaviorSubject('');
  selected_id = new BehaviorSubject('');
  placement_guid = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    const vm = this;
    vm.setSearch = (search: string) => {
      this.siteSearchText.next(search);
    };
    vm.setReloadFlag = (reloadFlag) => {
      this.siteReloadFlag.next(reloadFlag);
    };
  }

  /**
   * setting site details 
   */
  setSiteDetails = (guid: string, sp: string, id: string) => {
    this.selected_guid.next(guid);
    this.selected_sp.next(sp);
    this.selected_id.next(id);
  }
  
  /**
   * set selected supply partner
   */
  setSelectedSp = (spName) => {
    this.selected_sp.next(spName);
  }
  /**
   * set placement GUID
   */
  setplacementGuid = (placement_guid: string) => {
    this.placement_guid.next(placement_guid);
  }

  /**
   * get supply partner search details :: top 1500 records
   * @param search 
   */
  getSPList(search: Object) {
    return this.http.post(environment.siteUrl + '?per_page=1500', search );
  }

  /**
   * get site list details
   * @param pub_guid 
   */
  getSiteList(pub_guid: string) {
    return this.http.get(environment.siteDetailUrl + pub_guid);
  }
  /**
   * get site meta data details
   * @param pub_guid 
   */
  getSiteMetadata(pub_guid: string) {
    return this.http.get<ISiteDetail>(environment.siteDetailUrl + pub_guid);
  }
  
  /**
   * get tag type details
   */
  getTagTypeList() {
    return this.http.get('./assets/tagType.json');
  }

  /**
   * get country list from predefind json list
   */
  getCountryList() {
    return this.http.get('./assets/countries.json');
  }

  /**
   * get current user details
   */
  getCurrentUserDetails() {
    return this.http.get(environment.currentUserUrl);
  }
  
  /**
   * create new supply partner
   * @param siteObj 
   */
  createSupplyPartner(siteObj) {
    return this.http.post(environment.addNewSPUrl, siteObj);
  }

  /**
   * update supply partner
   * @param id 
   * @param siteObj 
   */
  updatedSupplyPartner(id, siteObj) {
    return this.http.put(environment.placementDetailUrl + id, siteObj);
  }

  /**
   * get activity list details
   * @param page 
   * @param search 
   */
  getActivityList(page, search) {
    return this.http.get(environment.activityUrl + '?page=' + page + '&per_page=100' + '&q_param=' + search);
  }

  /**
   * search activity list by search
   * @param search 
   */
  searchActivityListBy(search) {
    return this.http.get(environment.activityUrl + '?q_param=' + search);
  }

  /**
   * save dashboard message 
   * @param msg 
   */
  saveDashboardMessage(msg) {
    return this.http.put(environment.messageSaveUrl, msg);
  }

  /**
   * get dashboard message 
   */
  getDashboardMessage() {
    return this.http.get(environment.messagesDetailUrl);
  }

  /**
   * logout 
   */
  logout() {
    return this.http.delete(environment.logoutUrl);
  }

  /**
   * get job list details
   */
  getJbList() {
    return this.http.get(environment.jbListUrl);
  }

  /**
   * get metadata details
   */
  getMetaData() {
    return this.http.get(environment.metadataUrl);
  }
}
