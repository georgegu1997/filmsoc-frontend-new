import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Disk } from '../disk';
import { ReservationForm,
  DiskReviewResponse,
  DiskResponse,
  DiskRateResponse,
  BaseResponse,
  DISK_TYPE,
  DiskReviewPostResponse } from './disk-detail';

import { SettingsService } from '../../settings';
import { Logger } from '../../logger';

import { Observable } from 'rxjs/Observable';
import '../../rxjs-operators';

@Injectable()
export class DiskDetailService {
  private loadingSource = new Subject<boolean>();
  loading$ = this.loadingSource.asObservable();

  updateLoading(bool: boolean) {
    this.loadingSource.next(bool);
  }

  private requestSource = new Subject<number>();
  request$ = this.requestSource.asObservable();

  sendId(id: number) {
    console.log("sending ID");
    this.requestSource.next(id);
  }

  private diskSource = new Subject<Disk>();
  disk$ = this.diskSource.asObservable();

  sendDisk(disk: Disk) {
    this.diskSource.next(disk);
  }

  constructor(
    private settings: SettingsService,
    private logger: Logger,
    private http: Http,
  ) {}

  private diskGetUrl(id: string): string {
    return this.settings.api_base() + 'disk/' + id +'/';
  }

  private diskRateUrl(id: string): string {
    return this.settings.api_base() + 'disk/' + id  +'/rate/';
  }

  private diskReviewUrl(id: string): string {
    return this.settings.api_base() + 'diskreview/?disk=' + id;
  }

  private diskReviewPostUrl(): string {
    return this.settings.api_base() + 'diskreview/';
  }

  private diskReserveUrl(id: string): string {
    return this.settings.api_base() + 'disk/' + id + '/reservation/';
  }

  private diskRenewUrl(id: string): string {
    return this.settings.api_base() + 'disk/' + id + '/borrow/';
  }

  getDisk(id: number): Observable<DiskResponse> {
    let url = this.diskGetUrl(String(id));

    return this.http.get(url)
                    .map(this.extractDisk)
                    .catch(this.logger.errorHandler);
  }

  extractDisk = (res: Response): DiskResponse => {
    let body = res.json();
    body.disk_type_string = DISK_TYPE[body.disk_type];
    if(body.cover_url && body.cover_url.url) {
      body.cover_url.full_url = this.settings.resource_base() + 'upload/' + body.cover_url.url;
    }else {
      body.cover_url = {};
      body.cover_url.full_url = this.settings.resource_base() + 'img/qustion.png';
    }
    return body || {};
  }

  getDiskReview(id: number): Observable<DiskReviewResponse> {
    let url = this.diskReviewUrl(String(id));

    return this.http.get(url)
                    .map(this.extractReview)
                    .catch(this.logger.errorHandler);
  }

  postDiskReview(id: number, review: string): Observable<DiskReviewPostResponse> {
    let url = this.diskReviewPostUrl();
    let options = {content: review, disk: String(id)}

    return this.http.post(url, options)
                    .map(this.extractReviewPostRes)
                    .catch(this.logger.errorHandler);
  }

  private extractReview = (res: Response): DiskReviewResponse => {
    let body = res.json();
    return body || {};
  }

  private extractReviewPostRes = (res: Response): DiskReviewPostResponse => {
    let body = res.json();
    return body || {};
  }

  getDiskRate(id: number): Observable<DiskRateResponse> {
    let url = this.diskRateUrl(String(id));

    return this.http.get(url)
                    .map(this.extractRate)
                    .catch(this.logger.errorHandler);
  }

  private extractRate = (res: Response): DiskRateResponse => {
    let body = res.json();
    return body || {};
  }

  rateDisk(id: number, direction: string): Observable<DiskRateResponse> {
    let url = this.diskRateUrl(String(id));

    return this.http.post(url, {rate: direction})
                    .map(this.extractRate)
                    .catch(this.logger.errorHandler);
  }

  reserve(id: number, options: ReservationForm): Observable<DiskResponse> {
    let url = this.diskReserveUrl(String(id));
    if(options.form !== 'Counter') {
      options.hall = Number(options.hall);
    }

    return this.http.post(url, options)
                    .map(this.extractDisk)
                    .catch(this.logger.errorHandler);
  }

  renew(id: number, userID: number): Observable<DiskResponse> {
    let url = this.diskRenewUrl(String(id));
    let body = {'id': userID};

    return this.http.post(url, body)
                    .map(this.extractDisk)
                    .catch(this.logger.errorHandler);
  }
}
