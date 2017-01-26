import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { SettingsService } from '../settings';
import { Logger } from '../logger';

import { SiteSetting, SiteSettingsResponse, SiteSettingsMeta } from './site-settings';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()

export class SiteSettingsService {
  siteSettings: SiteSetting[];
  private siteSettingsUrl = 'sitesettings/';

  constructor (
    private http: Http,
    private settings: SettingsService,
    private logger: Logger,
  ) {}

  getSiteSettings(): void {
    let params = "?" +new Date().getTime();
    let url = this.settings.api_base() + this.siteSettingsUrl + params;

    this.http.get(url)
             .map(res => res.json())
             .subscribe(
               this.getOnLoad,
               this.logger.error
             )
  }

  getOnLoad = (res: SiteSettingsResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.siteSettings = res.objects;
    }
  }

  getSettings(key: string) {
    let i: number;
    for(i = 0; i < this.siteSettings.length; i++){
      if(this.siteSettings[i].key === key) {
        return this.siteSettings[i].value;
      }
    }
    console.log('Site Settings: Wrong key!');
    return '';
  }
}
