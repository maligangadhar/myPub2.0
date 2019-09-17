import { Injectable, EventEmitter } from '@angular/core';
import { ICacheService } from '../interface/interfaces';

@Injectable({
	providedIn: 'root'
})
export class CacheStorageService implements ICacheService {
	constructor() {
	}
	public _cacheSPSearchData: any;
	public _cacheSPDetailData: any;
	get cacheSPSearchData() {
		return this._cacheSPSearchData;
	}

	set cacheSPSearchData(response) {
		this._cacheSPSearchData = response;
	}

	get cacheSPDetailMetaData() {
		return this._cacheSPDetailData;
	}
	set cacheSPDetailMetaData(response) {
		this._cacheSPDetailData = response;
	}
}
