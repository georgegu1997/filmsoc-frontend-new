import { Component, OnInit } from '@angular/core';

import { NewsResponse, News, NewsMeta } from './news';

import { HomeService } from './home.service';
import { Logger } from '../logger';

@Component({
  moduleId: module.id,
  selector: 'film-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  news: News[];
  maxIndex: number;
  nextIndex: number;
  pageSize: number;
  private meta: NewsMeta;

  constructor (
    private homeSerivce: HomeService,
    private logger: Logger
  ) {
    this.pageSize = 6;
    this.maxIndex = 1;
    this.nextIndex = 1;
  }

  getNews(index: number, limit: number): void {
    this.homeSerivce.getNews(index, limit)
                    .subscribe(
                      this.onGetNewsRes,
                      this.logger.error
                    )
  }

  private onGetNewsRes = (res: NewsResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.maxIndex = res.meta.total;
      this.meta = res.meta;
      this.news = this.news.concat(res.objects);
    }
  }

  private nextPage(): void {
    if(this.nextIndex > this.maxIndex) {
      return;
    }else {
      this.getNews(this.nextIndex, this.pageSize);
      this.nextIndex += 1;
    }
  }

  ngOnInit(): void {
    this.nextPage();
  }

}
