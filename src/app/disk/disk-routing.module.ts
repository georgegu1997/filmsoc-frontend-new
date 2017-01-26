import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { DiskComponent } from './disk.component';
import { DiskDetailComponent } from './disk-detail/disk-detail.component';
import { DiskListComponent } from './disk-list/disk-list.component';

const DiskRoutes: Routes = [
  {
    path:'library',
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
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(DiskRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DiskRoutingModule { };
