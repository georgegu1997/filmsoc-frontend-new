import { Component, OnInit } from '@angular/core';

import { Exco, ExcoMeta, ExcoResponse } from './about';

import { AboutService } from './about.service';
import { Logger } from '../logger';

@Component({
  moduleId: module.id,
  selector: 'film-about',
  templateUrl: './about.component.html'
})

export class AboutComponent  {
  excos: Exco[];

  constructor(
    private aboutService: AboutService,
    private logger: Logger,
  ) {}

  getExcos(): void {
    this.aboutService.getExcos()
                     .subscribe(
                       this.getExcoOnLoad,
                       this.logger.error
                     )
  }

  getExcoOnLoad = (res: ExcoResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.excos = res.objects;
    }
  }

  ngOnInit(): void {
    this.getExcos();
  }
}
