import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  constructor(private http: HttpClient) {
  }

  banPlacement(siteObj) {
    return this.http.post(environment.banPlacementUrl, siteObj, httpOptions);
  }
  unbanPlacement(placementObj) {
    return this.http.post(environment.unbanPlacementUrl, placementObj);
  }
  getBannedGUIDList(pageCount) {
    return this.http.get(environment.banPlacementUrl + '?per_page=100&page=' + pageCount);
  }
  getBannedSearchList(searchText) {
    return this.http.get(environment.banPlacementUrl + '?s_param=' + searchText);
  }

  getPlacementDetails(id, guid) {
    return this.http.get(environment.placementDetailUrl + id + '/sites/' + guid);
  }

  getNewPlacementDetails(id) {
    return this.http.get(environment.placementDetailUrl + id + '/sites/new');
  }

  savePlacementSettings(id, placementDetails) {
    return this.http.post(environment.placementDetailUrl + id + '/sites', placementDetails);
  }

  updatePlacementSettings(id, placementDetails) {
    return this.http.put(environment.placementDetailUrl + id + '/sites', placementDetails);
  }
  saveSiteCategory(siteCategory) {
    return this.http.post(environment.siteCategoryUrl, siteCategory);
  }

}
