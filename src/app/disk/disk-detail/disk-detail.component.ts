import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Disk } from '../disk';
import { DISK_TYPE,
  HALL_LIST,
  BaseResponse,
  DiskReview,
  DiskReviewMeta,
  DiskReviewResponse,
  DiskResponse,
  DiskRateResponse,
  ReservationForm,
  DiskReviewPostResponse } from './disk-detail';

import { DiskDetailService } from './disk-detail.service';
import { SettingsService } from '../../settings';
import { UserService } from '../../userinfo/user.service';
import { Logger } from '../../logger';

import '../../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'film-disk-detail',
  templateUrl: './disk-detail.component.html',
  styleUrls: ['./disk-detail.component.css']
})

export class DiskDetailComponent implements OnInit {
  disk: DiskResponse;
  id: number;
  reviews: DiskReview[];
  rate: DiskRateResponse;
  form: ReservationForm;
  HALL_LIST: any;
  reviewLoading: boolean;
  newReview: string;

  constructor (
    private diskDetailService: DiskDetailService,
    private user: UserService,
    private logger: Logger,
    private settings: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.HALL_LIST = HALL_LIST;
    this.form = new ReservationForm('Hall');
    this.diskDetailService.disk$.subscribe(this.getDiskOrHttp);
  }

  ngOnInit(): void {
    this.reviewLoading = true;
    this.diskDetailService.updateLoading(true);
    this.route.params
              .subscribe(this.getDiskInfo);
  }

  getDiskInfo = (params: Params) => {
    this.id = +params['id'];
    this.diskDetailService.sendId(this.id);

    this.diskDetailService.getDiskReview(this.id)
                          .subscribe(this.onGetReview);

    this.diskDetailService.getDiskRate(this.id)
                          .subscribe(this.onGetRate);
    //return this.diskDetailService.getDisk(+params['id']);
  }

  private getDiskOrHttp = (disk: Disk)=> {
    if(disk) {
      this.disk = disk;
      this.diskDetailService.updateLoading(false);
    }else {
      this.diskDetailService.getDisk(this.id)
                            .subscribe(this.onGetDisk);
    }
  }

  onGetDisk = (disk: DiskResponse): void => {
    if(disk.errno) {
      this.logger.customErrorHandler(disk);
    }else {
      this.diskDetailService.updateLoading(false);
      this.disk = disk;
    }
  }

  onGetReview = (res: DiskReviewResponse): void => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.reviewLoading = false;
      this.reviews = res.objects;
    }
  }

  onGetRate = (res: DiskRateResponse): void => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.rate = res;
    }
  }

  rateUp(): void {
    this.diskDetailService.rateDisk(this.id, "up")
                          .subscribe(this.onRate);
  }

  rateDown(): void {
    this.diskDetailService.rateDisk(this.id, "down")
                          .subscribe(this.onRate);
  }

  private onRate = (res: DiskRateResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.rate = res;
      this.logger.showNotification("success", "Success:", "Your rate is recorded");
    }
  }

  reserveCounter(): void {
    this.diskDetailService.reserve(this.id, new ReservationForm('Counter'))
                          .subscribe(this.onReserve);
  }

  reserveDelivery(): void {
    this.diskDetailService.reserve(this.id, this.form)
                          .subscribe(this.onReserve);
  }

  private onReserve = (res: DiskResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.disk = res;
      this.logger.showNotification('success', "Success", "Reservation succeed!")
    }
  }

  renew(): void {
    this.diskDetailService.renew(this.id, this.user.user.id)
                          .subscribe(this.onRenew);
  }

  private onRenew = (res: DiskResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.disk = res;
      this.logger.showNotification('success', "Success", "Renewal succeed!")
    }
  }

  submitReview(): void {
    let review = this.newReview;
    this.newReview = "";
    this.diskDetailService.postDiskReview(this.id, review)
                          .subscribe(this.onPostReview);
  }

  private onPostReview = (res: DiskReviewPostResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.logger.showNotification('success', "Success", "Review Recorded?");
      this.reviewLoading = true;
      this.diskDetailService.getDiskReview(this.id)
                            .subscribe(this.onGetReview);
    }
  }
}
