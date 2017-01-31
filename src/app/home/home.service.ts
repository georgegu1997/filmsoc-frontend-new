import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { News, NewsResponse } from './news';

import { SettingsService } from '../settings';
import { Logger } from '../logger';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()
export class HomeService {
  private newsGetUrl = "news/";

  constructor (
    private http: Http,
    private logger: Logger,
    private settings: SettingsService,
  ) {}

  getNews(index: number, limit: number): Observable<NewsResponse> {
    let params = "?limit=" + limit + "&page=" + index;
    let url = this.settings.api_base() + this.newsGetUrl + params;

    return this.http.get(url)
                    .map(this.extractNewsRes)
                    .catch(this.logger.errorHandler);
  }

  private extractNewsRes = (res: Response) => {
    let body = res.json();
    return body || {};
  }
}
