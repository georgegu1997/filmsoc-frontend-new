import { Component } from '@angular/core';

import { NotificationService } from './notification.service';

import { Notification } from './notification';

import { NotificationAnimations } from './notification.animations';

@Component({
  moduleId: module.id,
  selector: 'film-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: NotificationAnimations,
})

export class NotificationComponent {
  private currentNotification: Notification;
  private isShow: boolean;

  constructor(
    private notificationService: NotificationService
  ) {
    this.currentNotification = new Notification();
    this.isShow = false;
    notificationService.emitter.subscribe(this.show);
  }

  show = (note: Notification) => {
    console.log(note.type);
    this.currentNotification = note;
    this.isShow = true;
  }

  setClass() {
    let classes = {
      'alert-success': this.currentNotification.type === 'success',
      'alert-info': this.currentNotification.type === 'info',
      'alert-warning': this.currentNotification.type === 'warning',
      'alert-danger': this.currentNotification.type === 'danger',
    }

    return classes;
  }

  close() {
    this.isShow = false;
  }
}
