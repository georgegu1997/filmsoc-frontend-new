import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { AboutComponent } from './about/about.component';
import { DiskComponent } from './disk/disk.component';
import { DiskSearchComponent } from './disk/disk-search/disk-search.component';
import { DiskDetailComponent } from './disk/disk-detail/disk-detail.component';
import { DiskListComponent } from './disk/disk-list/disk-list.component';
//import { DiskDetailComponent } from './diskdetail/disk-detail.component';
import { DocumentComponent } from './document/document.component';
import { HomeComponent } from  './home/home.component';
import { PublicationComponent } from './publication/publication.component';
import { ShowComponent } from './show/show.component';
import { TicketComponent } from './ticket/ticket.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { OneSentenceComponent } from './one-sentence/one-sentence.component';
import { NotificationComponent } from './notification/notification.component';
import { PageNotFoundComponent } from './util/page-not-found.component';

import { SettingsService } from './settings';
import { Logger } from './logger';
import { UserService } from './userinfo/user.service';
import { HomeService } from './home/home.service';
import { DiskService } from './disk/disk.service';
import { DiskSearchService } from './disk/disk-search/disk-search.service';
//import { DiskDetailService } from './diskdetail/disk-detail.service';
import { ShowService } from './show/show.service';
import { TicketService } from './ticket/ticket.service';
import { DocumentService } from './document/document.service';
import { NotificationService } from './notification/notification.service';

import { requestOptionsProvider } from './util/default-request-options.service';

import { InfiniteScroll } from './util/infinite-scroll.directive';
import { LoadersCssModule } from 'angular2-loaders-css';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    LoadersCssModule,
    //NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    DiskComponent,
    DiskSearchComponent,
    DiskDetailComponent,
    DiskListComponent,
    DocumentComponent,
    HomeComponent,
    PublicationComponent,
    ShowComponent,
    TicketComponent,
    UserinfoComponent,
    OneSentenceComponent,
    PageNotFoundComponent,
    NotificationComponent,
    InfiniteScroll,
  ],
  providers: [
    SettingsService,
    HomeService,
    DiskService,
    DiskSearchService,
    //DiskDetailService,
    UserService,
    ShowService,
    TicketService,
    DocumentService,
    Logger,
    NotificationService,
    requestOptionsProvider
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
