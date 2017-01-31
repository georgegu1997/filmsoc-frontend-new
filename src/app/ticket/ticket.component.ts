import { Component, OnInit } from '@angular/core';

import { Ticket, TicketMeta, TicketResponse } from './ticket';
import { BaseResponse } from '../diskdetail/disk-detail';

import { TicketService } from './ticket.service';
import { Logger } from '../logger';
import { UserService } from '../userinfo/user.service';

import { TicketAnimations } from './ticket.animations';

@Component({
  moduleId: module.id,
  selector: 'film-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  animations: TicketAnimations,
})

export class TicketComponent implements OnInit {
  tickets: Ticket[];
  private meta: TicketMeta;
  private max_index: number;
  private next_page: number;
  private page_size: number;
  private toggled: boolean;
  private selectedTicket: Ticket;
  private applyNumber: number;
  private initLoading: boolean;
  private scrollLoading: boolean;

  constructor(
    private ticketService: TicketService,
    private logger: Logger,
    private user: UserService
  ) {}

  getTickets(index: number, limit: number) : void {
    this.ticketService.getTickets(index, limit)
                      .subscribe(
                        this.getTicketsOnLoad,
                        this.logger.error
                      )
  }

  getTicketsOnLoad = (res: TicketResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.max_index = res.meta.total;
      this.meta = res.meta;
      this.tickets = this.tickets.concat(res.objects);
      this.initLoading = false;
      this.scrollLoading = false;
    }
    if(this.next_page===2) {
      this.selectedTicket = this.tickets[0];
    }
  }

  nextPage(): void {
    console.log('getting next page!');
    if(this.next_page > this.max_index) {
      return;
    }else {
      if(this.next_page>1) {
        this.scrollLoading = true;
      }
      this.getTickets(this.next_page, this.page_size);
      this.next_page += 1;
    }
  }

  ngOnInit(): void {
    this.page_size = 12;
    this.next_page = 1;
    this.max_index = 1;
    this.tickets = [];
    this.nextPage();
    this.toggled = false;
    this.applyNumber = 1;
    this.initLoading = true;
    this.scrollLoading = false;
  }

  toggle(): void {
    this.toggled = !(this.toggled);
  }

  apply(): void {
    console.log(this.applyNumber);
    this.ticketService.applyForTicket(this.selectedTicket.id, this.applyNumber)
                      .subscribe(
                        this.onApplyRes,
                        this.logger.error
                      );
  }

  private onApplyRes=(res: BaseResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.logger.showNotification('success', "SUCCESS", "Ticket(s) Applied!");

    }
  }

  trackByTickets(index: number, ticket: Ticket) {
    return ticket.id;
  }
}
