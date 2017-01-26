import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Show, ShowResponse } from './show';
import { DiskService } from '../disk/disk.service';
import { SettingsService } from '../settings';
import { UserService } from '../userinfo/user.service';
import { Logger } from '../logger';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()

export class ShowService {
  private showGetUrl = 'regularfilmshow/';

  private showVoteUrl(id: string) {
    return this.settings.api_base() + 'regularfilmshow/' + id + '/vote/';
  }

  constructor(
    private http: Http,
    private diskService: DiskService,
    private settings: SettingsService,
    private logger: Logger,
  ) {}

  getShow(index: number, limit: number): Observable<ShowResponse> {
    let params = "?limit="+limit+"&page="+index;
    let url = this.settings.api_base() + this.showGetUrl + params;

    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.logger.errorHandler);
  }

  private extractData = (res: Response) => {
    let body = res.json();
    let i: number;
    if(body.objects){
      for (i = 0; i < body.objects.length; i++) {
        body.objects[i].film_1 = this.diskService.getDiskFullUrl(body.objects[i].film_1);
        body.objects[i].film_2 = this.diskService.getDiskFullUrl(body.objects[i].film_2);
        body.objects[i].film_3 = this.diskService.getDiskFullUrl(body.objects[i].film_3);
      }
    }
    return body || {};
  }

  vote(showId: number, filmId: number): Observable<any> {
    let url = this.showVoteUrl(String(showId));
    let body = {film_id: filmId};

    return this.http.post(url, body)
                    .map(this.extractVoteResponse)
                    .catch(this.logger.errorHandler);
  }

  private extractVoteResponse = (res: Response) => {
    let body = res.json();

    return body || {};
  }
}
