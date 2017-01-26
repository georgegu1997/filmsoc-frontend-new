import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AboutComponent } from './about/about.component';
import { DiskComponent } from './disk/disk.component';
import { DiskDetailComponent } from './disk/disk-detail/disk-detail.component';
import { DiskListComponent } from './disk/disk-list/disk-list.component';
import { DocumentComponent } from './document/document.component';
import { HomeComponent } from  './home/home.component';
import { PublicationComponent } from './publication/publication.component';
import { ShowComponent } from './show/show.component';
import { TicketComponent } from './ticket/ticket.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { PageNotFoundComponent } from './util/page-not-found.component';


const routes:Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'show', component: ShowComponent},
  { path: 'library',
    component: DiskComponent,
    children: [
      {
        path: ':id',
        component: DiskDetailComponent,
      },
      {
        path: '',
        component: DiskListComponent,
      }
    ]
  },
  { path: 'ticket', component: TicketComponent},
  { path: 'document', component: DocumentComponent},
  { path: 'publication', component: PublicationComponent},
  { path: 'about', component: AboutComponent},
  { path: 'userinfo', component: UserinfoComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
