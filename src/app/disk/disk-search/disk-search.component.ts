import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { DiskSearchService } from './disk-search.service';
import { Disk, DiskResponse, DiskMeta } from '../disk';
import { Logger } from '../../logger';
import '../../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'film-disk-search',
  templateUrl: 'disk-search.component.html',
  styleUrls: ['disk-search.component.css']
})
export class DiskSearchComponent implements OnInit {
  private disks: Observable<Disk[]>
  private searchTerms = new Subject<string>();
  private searchLimit = 5;

  constructor(
    private diskSearchService: DiskSearchService,
    private router: Router,
    private logger: Logger,
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
    console.log(term);
  }

  ngOnInit(): void {
    this.disks = this.searchTerms
                     .debounceTime(300)
                     .distinctUntilChanged()
                     .switchMap(term => term
                       ?this.diskSearchService.search(term, "default", this.searchLimit)
                       :Observable.of<Disk[]>([])
                     )
                     .catch(error => {
                        console.log(error);
                        return Observable.of<Disk[]>([]);
                      });
  }


}
