import { Component, OnInit, HostBinding} from '@angular/core';
import { Router } from '@angular/router';

import { Show, ShowResponse, ShowMeta } from './show';

import { ShowService } from './show.service';
import { SettingsService } from '../settings';
import { UserService } from '../userinfo/user.service';
import { Logger } from '../logger';

import { ShowAnimations } from './show.animations';

@Component({
  moduleId: module.id,
  selector: 'film-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  animations: ShowAnimations,
})

export class ShowComponent implements OnInit {
  
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  show: Show;
  meta: ShowMeta;
  private totalVotes: number;
  private initLoading: boolean;

  constructor (
    private showService: ShowService,
    private settings: SettingsService,
    private user: UserService,
    private logger: Logger,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initLoading = true;
    this.getShow();
  }

  getShow() {
    this.showService.getShow(1, 1)
                    .subscribe(
                      this.onShowRes,
                      this.logger.error
                    )
  }

  onShowRes = (showRes:ShowResponse) => {
    if(showRes.errno) {
      this.logger.customErrorHandler(showRes);
    }else {
      this.meta = showRes.meta;
      this.show = showRes.objects[0];
      this.totalVotes = this.show.vote_cnt_1 + this.show.vote_cnt_2 + this.show.vote_cnt_3;
      this.initLoading = false;
    }
  }

  vote(filmId: number) {
    this.showService.vote(this.show.id, filmId)
                    .subscribe(
                      this.onVoteRes,
                      this.logger.error
                    )
  }

  onVoteRes = (res: any) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      console.log(res);
    }
  }

  goToDetail(id: number): void {
    this.router.navigate(['/detail', id]);
  }
}
