import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Document, DocumentMeta, DocumentResponse } from './document';
import { SettingsService } from '../settings';
import { Logger } from '../logger';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()

export class DocumentService {
  private documentGetUrl = 'document/';

  constructor(
    private http: Http,
    private settings: SettingsService,
    private logger: Logger,
  ) {}

  getDocuments(): Observable<DocumentResponse> {
    let url = this.settings.api_base() + this.documentGetUrl;

    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.logger.errorHandler);
  }

  private extractData = (res: Response) => {
    let body = res.json();
    return body || {};
  }
}
