import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Exco, ExcoMeta, ExcoResponse } from './about';
import { SettingsService } from '../settings';
import { Logger } from '../logger';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()

export class AboutService {
  private aboutGetUrl = 'exco/';

  constructor(
    private http: Http,
    private settings: SettingsService,
    private logger: Logger,
  ) {}

  getExcos(): Observable<ExcoResponse> {
    let url = this.settings.api_base() + this.aboutGetUrl;

    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.logger.errorHandler);
  }

  private extractData = (res: Response) => {
    let body = res.json();
    return body || {};
  }
}
