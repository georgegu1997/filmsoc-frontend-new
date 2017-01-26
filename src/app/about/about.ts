import { File } from '../disk/file';

export class Exco {
  descript: string;
  email: string;
  hall_allocate: string;
  id: number;
  img_url: File;
  name_ch: string;
  name_en: string;
  position: string;
}

export class ExcoMeta {
  model: string;
  next: string;
  page: number;
  previous: string;
  total: number;
}

export class ExcoResponse {
  errno: number;
  error: string;
  meta: ExcoMeta;
  objects: Exco[];
}
