import { Injectable, EventEmitter } from '@angular/core';

import { Notification } from './notification';

@Injectable()
export class NotificationService {
  public emitter: EventEmitter<Notification>;

  constructor() {
    this.emitter = new EventEmitter();
  }

  public show(type: string, title: string, content: string) {
    let note = new Notification(type, title, content);
    this.emitter.emit(note);
  }
}
