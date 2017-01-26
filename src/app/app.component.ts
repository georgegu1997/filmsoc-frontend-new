import { Component } from '@angular/core';
import { UserService } from './userinfo/user.service';
import { SettingsService } from './settings';

@Component({
  moduleId: module.id,
  selector: 'film-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent  {

  constructor (
    private userService: UserService,
    private settings: SettingsService,
  ) {
    userService.getCurrentUser()
  }

  title = "Film Society, HKUSTSU";
}
