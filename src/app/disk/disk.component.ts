import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Disk, DisksResponse, DiskMeta, DiskResponse, LIST_TYPE } from './disk';

import { DiskService } from './disk.service';
import { DiskListService } from './disk-list/disk-list.service';
import { DiskDetailService } from './disk-detail/disk-detail.service';
import { DiskSearchComponent } from './disk-search/disk-search.component';
import { Logger } from '../logger';

import { DiskAnimations } from './disk.animations';

@Component({
  moduleId: module.id,
  selector: 'film-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.css'],
  providers: [DiskListService, DiskDetailService],
  animations: DiskAnimations,
})

export class DiskComponent implements OnInit  {
  private page_size: number;
  private next_page: number;
  private max_index: number;
  disks: Disk[];
  private meta: DiskMeta;
  private toggled: boolean;
  private contentLoading: boolean;
  private LIST_TYPE = LIST_TYPE;
  private listType: LIST_TYPE;


  constructor(
    private diskService: DiskService,
    private diskListService: DiskListService,
    private diskDetailService: DiskDetailService,
    private router: Router,
    private logger: Logger,
  ) {
    diskListService.index$.subscribe(
      this.getPageOrHttp
    )
    diskDetailService.loading$.subscribe(
      (bool: boolean) => {
        this.contentLoading = bool;
      }
    )
    diskDetailService.request$.subscribe(
      this.sendDisk
    )
  }

  private sendDisk = (id: number): void => {
    console.log("getting ID");
    this.diskDetailService.sendDisk(this.searchForDisk(id));
  }

  private searchForDisk = (id: number): Disk => {
    let i: number;
    for(i = 0; i < this.disks.length;i ++) {
      if(this.disks[i]){
        if(this.disks[i].id === id) {
          return this.disks[i];
        }
      }
    }
    return null;
  }

  private getPageOrHttp = (index: number): void => {
    if(this.disks[index * this.page_size]) {
      this.diskListService.updateDisks(this.disks.slice(index * this.page_size, (index+1) * this.page_size));
    }else {
      this.getDisks(index, this.page_size, this.listType);
    }
  }

  getDisks(index: number, limit: number, type: LIST_TYPE): void {
    this.contentLoading = true;
    this.diskService.getDisks(index, limit, type)
                    .subscribe(
                      this.getDisksRes,
                      this.logger.error,
                    )
  }

  getDisksRes = (diskRes: DisksResponse) => {
    if(diskRes.errno) {
      this.logger.customErrorHandler(diskRes);
    }else {
      this.max_index = diskRes.meta.total;
      this.meta = diskRes.meta;
      this.insertDisks(diskRes.objects, diskRes.meta.page * this.page_size);
      this.contentLoading = false;
      this.diskListService.updateDisks(diskRes.objects);
      this.diskListService.updateTotal(diskRes.meta.total);
    }
  }

  insertDisks(disks:Disk[], startIndex: number) {
    let i: number;
    for (i = 0; i < disks.length; i++) {
      this.disks[startIndex+i] = disks[i];
    }
  }

  goToDetail(disk: Disk): void {
    console.log("go to detail");
    this.router.navigate(['/detail', disk.id]);
  }

  ngOnInit(): void{
    this.page_size = 6;
    this.next_page = 1;
    this.max_index = 1;
    this.disks = [];
    this.toggled = false;
    this.contentLoading = true;
    this.listType = LIST_TYPE.NORMAL;
    this.diskListService.updateTotal(this.max_index);
  }

  luckyRandom(): void {
    this.contentLoading = true;
    this.diskService.random()
                    .subscribe(
                      (res: DiskResponse) => {
                        this.router.navigate(['/library', res.id])
                      },
                      this.logger.error
                    )
  }

  normal(): void {
    this.contentLoading = true;
    this.disks = [];
    this.listType = LIST_TYPE.NORMAL;
    this.diskListService.updateIndexAndGetDisk(1);
    this.router.navigate(['/library'])
  }

  topPopular(): void {
    this.contentLoading = true;
    this.disks = [];
    this.listType = LIST_TYPE.POPULAR;
    this.diskListService.updateIndexAndGetDisk(1);
    this.router.navigate(['/library'])
  }

  topRanked(): void {
    this.contentLoading = true;
    this.disks = [];
    this.listType = LIST_TYPE.RANKED;
    this.diskListService.updateIndexAndGetDisk(1);
    this.router.navigate(['/library'])
  }

  toggle(): void {
    this.toggled = !(this.toggled);
  }
}
