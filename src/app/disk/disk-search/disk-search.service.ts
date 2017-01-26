import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Disk, DiskResponse, DiskMeta } from '../disk';
import { SettingsService} from '../../settings';

@Injectable()
export class DiskSearchService {
  private diskSearchUrl = "disk/search/";

  constructor(
    private http: Http,
    private settings: SettingsService,
  ) {}

  search(term: string, engine: string, limit: number): Observable<Disk[]> {
    let url = `${this.settings.api_base()}${this.diskSearchUrl}?limit=${limit}&query=${term}&engine=${engine}`;
    console.log(url);

    return this.http
               .get(url)
               .map(this.extractData);
  }

  extractData = (res: Response): Disk[] => {
    let body = res.json();
    let i: number;
    for(i = 0; i < body.objects.length; i++) {
      if(body.objects[i].cover_url.url){
        body.objects[i].cover_url.full_url = this.settings.resource_base() + 'upload/' + body.objects[i].cover_url.url;
      }else {
        body.objects[i].cover_url.full_url = this.settings.resource_base() + 'img/qustion.png';
      }
    }
    return body.objects || [];
  }
}
