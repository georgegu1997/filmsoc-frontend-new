import { File } from '../disk/file';

export class Document {
  create_log: {
    create_at: string
  };
  doc_url: File;
  id: number;
  title: string;
}

export class DocumentMeta {
  model: string;
  next: string;
  page: number;
  previous: string;
  total: number;
}

export class DocumentResponse {
  errno: number;
  error: string;
  meta: DocumentMeta;
  objects: Document[];
}
