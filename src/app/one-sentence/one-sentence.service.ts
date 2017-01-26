import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SettingsService } from '../settings';
import { OneSentence } from './one-sentence';

@Injectable()
export class OneSentenceService {
  private oneSentenceGetUrl = 'onesentence/rand/';

  constructor(
    private http: Http,
    private settings: SettingsService
  ) {}

  getOneSentence(): Promise<OneSentence> {
    let params = "?" + new Date().getTime();
    let url = this.settings.api_base() + this.oneSentenceGetUrl + params;

    return this.http.get(url)
               .toPromise()
               .then(res => {return res.json()})
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error: ', error);
    return Promise.reject(error.message || error);
  }
}
