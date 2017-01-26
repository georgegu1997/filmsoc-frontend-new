import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Disk } from '../disk';

@Injectable()

export class DiskListService {
  private diskSource = new Subject<Disk[]>();
  private totalSource = new Subject<number>();
  private indexSource = new Subject<number>();
  private total: number;
  private index: number;

  disk$ = this.diskSource.asObservable();
  total$ = this.totalSource.asObservable();
  index$ = this.indexSource.asObservable();

  updateDisks(disks: Disk[]) {
    this.diskSource.next(disks);
  }

  updateTotal(total: number) {
    this.total = total
    this.totalSource.next(total);
  }

  updateIndexAndGetDisk(index: number) {
    this.index = index;
    this.indexSource.next(index);
  }

  getIndex(): number {
    return this.index;
  }

  getTotal(): number {
    return this.total;
  }
}
