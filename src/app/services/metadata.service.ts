import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  constructor(private http: HttpClient) {
  }
  getMetaData = () => {
    return this.http.get(environment.metadataUrl);
  }
  getLanguageData = () => {
    return this.http.get('./assets/language.json');
  }
}

