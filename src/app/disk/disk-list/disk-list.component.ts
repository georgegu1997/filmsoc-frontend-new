import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DiskListService } from './disk-list.service';
import { DiskDetailService } from '../disk-detail/disk-detail.service';

import { Disk } from '../disk';

@Component({
  moduleId: module.id,
  selector: 'film-disk-list',
  templateUrl: './disk-list.component.html',
  styleUrls: ['./disk-list.component.css'],
})

export class DiskListComponent implements OnInit {
  disks: Disk[];
  index: number;
  total: number;

  constructor (
    private diskListService: DiskListService,
    private router: Router,
  ) {
    this.index = this.diskListService.getIndex();
    if(!(this.index)) {
      this.index = 1;
    }
    this.total = this.diskListService.getTotal();
    if(!(this.total)) {
      this.total = 1;
    }
    diskListService.disk$.subscribe(
      this.onGetDisks
    )
    diskListService.total$.subscribe(
      (num: number) => {
        this.total = num;
      }
    )
  }

  private onGetDisks = (disks: Disk[]) => {
    this.index = this.diskListService.getIndex();
    if(!(this.index)) {
      this.index = 1;
    }
    this.total = this.diskListService.getTotal();
    if(!(this.total)) {
      this.total = 1;
    }
    this.disks = disks;
  }

  nextPage() {
    if(this.index >= this.total) {
      return;
    }
    this.index += 1;
    this.diskListService.updateIndexAndGetDisk(this.index);
  }

  prevPage() {
    if(this.index <= 1) {
      return;
    }
    this.index -= 1;
    this.diskListService.updateIndexAndGetDisk(this.index);
  }

  changePage(index: number) {
    this.index = index;
    this.diskListService.updateIndexAndGetDisk(this.index);
  }

  ngOnInit() {
    this.diskListService.updateIndexAndGetDisk(this.index);
  }

  goToDetail(disk: Disk) {
    console.log("go to detail");
    this.router.navigate(['/library', disk.id]);
  }

}
