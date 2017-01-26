import { Component, OnInit } from '@angular/core';

import { Document, DocumentMeta, DocumentResponse } from './document';

import { DocumentService } from './document.service';
import { Logger } from '../logger';

@Component({
  moduleId: module.id,
  selector: 'film-document',
  templateUrl: './document.component.html'
})

export class DocumentComponent  {
  documents: Document[];

  constructor(
    private documentService: DocumentService,
    private logger: Logger,
  ) {}

  getDocuments(): void {
    this.documentService.getDocuments()
                        .subscribe(
                          this.getDocumentOnLoad,
                          this.logger.error
                        )
  }

  getDocumentOnLoad = (res: DocumentResponse) => {
    if(res.errno) {
      this.logger.customErrorHandler(res);
    }else {
      this.documents = res.objects;
    }
  }

  ngOnInit(): void {
    this.getDocuments();
  }
}
