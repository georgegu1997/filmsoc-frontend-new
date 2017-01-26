import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { SettingsService } from '../settings';

import { Userinfo, MEMBERSHIP_TABLE } from './userinfo';
import { SimpleDisk } from '../disk/disk';

@Component({
  moduleId: module.id,
  selector: 'film-userinfo',
  templateUrl:'./userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})

export class UserinfoComponent implements OnInit  {
  user: Userinfo;
  user_borrow: SimpleDisk[];
  user_reserve: SimpleDisk[];
  user_history: SimpleDisk[];
  MEMBERSHIP_TABLE: {};

  constructor(
    private userService: UserService,
    private settings: SettingsService,
    private router: Router,
  ) {}

  ngOnInit():void {
    this.user = this.userService.user;
    this.MEMBERSHIP_TABLE = MEMBERSHIP_TABLE;
    this.user_borrow = this.user.borrowed;
    this.user_reserve = this.user.reserved;
    this.user_history = this.user.borrow_history;
    console.log(this.user_reserve);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/library', id]);
  }
}
