import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Userinfo } from './userinfo';
import { SettingsService } from '../settings';
import { Logger } from '../logger';


@Injectable()
export class UserService {
  private currentUserUrl = 'user/current_user';
  user: Userinfo;
  isLogin: boolean;
  isMember: boolean;
  isAdmin: boolean;

  constructor(
    private http: Http,
    private settings: SettingsService,
    private logger: Logger,
    private location: Location,
  ) {
    this.user = {};
    this.user.full_name = "Guest";
    this.isLogin = false;
    this.isMember = false;
    this.isAdmin = false;
  }

  getCurrentUser(): Promise<any>  {
    let params = "/?" + new Date().getTime();
    let url = this.settings.api_base() + this.currentUserUrl + params;

    return this.http.get(url)
               .toPromise()
               .then(res => {
                 this.user = res.json();
                 this.isLogin = !(this.user.itsc === undefined);
                 this.isMember = !(this.user.id === undefined);
                 this.isAdmin = this.user.admin;
               })
               .catch(this.logger.handleError);
  }

  login(): void {
    let next = this.location.path(true);
    let url = this.settings.login_url() + (next? "?next=" + next: '');
    let redirect = 'https://cas.ust.hk/cas/login?service=' + encodeURIComponent(url);
    location.href = redirect;
  }

  logout(): void {
    if(!(this.isLogin)) {return;}
    let next = this.location.path(true);
    let url = this.settings.logout_url() + (next? "?next=" + next: '');
    location.href = url;
  }
}
