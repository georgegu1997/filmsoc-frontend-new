import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Ticket, TicketMeta, TicketResponse } from './ticket';
import { BaseResponse } from '../diskdetail/disk-detail';
import { SettingsService } from '../settings';
import { Logger } from '../logger';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()

export class TicketService {
  private ticketGetUrl = 'previewshowticket/';

  private ticketApplyUrl(id: string): string {
    return this.settings.api_base() + 'previewshowticket/' + id + '/application/';
  }

  constructor(
    private http: Http,
    private settings: SettingsService,
    private logger: Logger,
  ) {}

  getTickets(index: number, limit: number): Observable<TicketResponse> {
    let params = "?limit=" + limit + "&page=" + index;
    let url = this.settings.api_base() + this.ticketGetUrl + params;

    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.logger.errorHandler);
  }

  private extractData = (res: Response) => {
    let body = res.json();
    let i: number;
    for (i = 0; i < body.objects.length; i++) {
      body.objects[i] = this.getFullUrl(body.objects[i]);
    }
    return body || {};
  }

  private getFullUrl(ticket: Ticket) {
    if(ticket.cover_url && ticket.cover_url.url) {
      ticket.cover_url.full_url = this.settings.resource_base() + 'upload/' + ticket.cover_url.url;
    }else {
      ticket.cover_url.full_url = this.settings.resource_base() + 'img/qustion.png';
    }
    return ticket;
  }

  applyForTicket(id: number, num: number): Observable<BaseResponse> {
    let url = this.ticketApplyUrl(String(id));
    console.log(url);

    return this.http.post(url, {number: num})
                    .map(this.extractApplyRes)
                    .catch(this.logger.errorHandler);
  }

  extractApplyRes = (res: Response) => {
    console.log("Get Response");
    let body = res.json();
    return body||{};
  }
}
