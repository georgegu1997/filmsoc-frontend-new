import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    this.withCredentials = true;
    this.headers.set('X-Requested-With', 'XMLHttpRequest');
    this.headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
  }
}

export const requestOptionsProvider = {
  provide: RequestOptions,
  useClass: DefaultRequestOptions,
};
