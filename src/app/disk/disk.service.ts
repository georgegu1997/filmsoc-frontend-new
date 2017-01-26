import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Disk, DisksResponse, DiskResponse, LIST_TYPE } from './disk';
import { SettingsService } from '../settings';
import { Logger } from '../logger';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()
export class DiskService {
  private diskGetUrl = 'disk/';
  private diskRandUrl = 'disk/rand/';

  constructor(
    private http: Http,
    private settings: SettingsService,
    private logger: Logger,
  ) {}

  getDisks(index: number, limit: number, type: LIST_TYPE): Observable<DisksResponse> {
    let params: string;
    if(type === LIST_TYPE.NORMAL) {
      params = "?limit=" + limit + "&page=" + index;
    }else if (type === LIST_TYPE.POPULAR) {
      params = "?limit=" + limit + "&page=" + index + "&ordering=-borrow_cnt,-id";
    }else if (type === LIST_TYPE.RANKED) {
      params = "?limit=" + limit + "&page=" + index + "&ordering=-rank,-id";
    }

    let url = this.settings.api_base() + this.diskGetUrl + params;

    return this.http.get(url)
                    .map(this.extractDisks)
                    .catch(this.logger.errorHandler);
  }

  extractDisks = (res: Response) => {
    let body = res.json();
    let i: number;
    for(i = 0; i < body.objects.length; i++) {
      body.objects[i] = this.getDiskFullUrl(body.objects[i]);
    }
    return body || {};
  }

  random(): Observable<DiskResponse>{
    let params = '?'+new Date().getTime();
    let url = this.settings.api_base() + this.diskRandUrl + params;

    return this.http.get(url)
                    .map(this.extractDisk)
                    .catch(this.logger.errorHandler);
  }

  extractDisk = (res: Response): DiskResponse => {
    let body = res.json();
    body = this.getDiskFullUrl(body);
    return body || {};
  }

  getDiskFullUrl(disk: Disk) {
    if(disk.cover_url && disk.cover_url.url) {
      disk.cover_url.full_url = this.settings.resource_base() + 'upload/' + disk.cover_url.url;
    }else {
      disk.cover_url.full_url = this.settings.resource_base() + 'img/qustion.png';
    }
    return disk;
  }
}
