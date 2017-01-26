import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { NotificationService } from './notification/notification.service';

@Injectable()

export class Logger {
  constructor(
    private noti: NotificationService,
  ) {}

  error(err:any) {
    console.log(err);
  }

  log(content:any) {
    console.log(content);
  }

  handleError(error: any): Promise<any> {
    console.log('Error: ', error);
    return Promise.reject(error.message || error);
  }

  errorHandler(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  customErrorHandler(res: any) {
    let errno = res.errno,
        error = res.error || 'Connection Failed';
    switch(errno) {
      case 0: //Client Network Problem
      case 1: //Format Error
      case 2: //Authentication Error
      case 3: //Procedure Error
        //cr.ui.showNotification(error, 'dismiss');
        this.noti.show("danger", "Error", error);
        console.log(error);
        break;
      case 404: //Not Found Error
        //notFoundHandler();
        console.log("404 not found");
        break;
      default: //Other Server Error
        //cr.ui.showNotification('Server: ' + error, 'try again later');
        this.noti.show("danger", "Error", 'Server: '+ error+' try again later');
        console.log('Server: ' + error, 'try again later');
    }
  }

  showNotification(type: string, title: string, content: string) {
    this.noti.show(type, title, content);
  }
}
