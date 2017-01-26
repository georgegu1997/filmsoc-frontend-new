import {File} from './file';
import {SimpleUserinfo} from '../userinfo/simple-userinfo'

export class Disk {
  actors: Array<string>;
  avail_type: string;
  borrow_cnt: number;
  category?: string;
  cover_url?: File;
  create_log?: {
    created_at: string;
  };
  desc_ch?: string;
  desc_en?: string;
  director_ch?: string;
  director_en?: string;
  disk_type: string;
  due_at?: string;
  hold_by?: SimpleUserinfo;
  id: number;
  imdb_url?: string;
  length?: number;
  reserved_by?: SimpleUserinfo;
  show_year?: number;
  tags?: Array<string>;
  title_ch: string;
  titlr_ch: string;
  user_held: boolean;

  disk_type_string?: string;
};

export class DiskMeta {
  model: string;
  next: string;
  page: number;
  previous: string;
  total: number;
};

export class DisksResponse {
  errno: number;
  error: string;
  meta: DiskMeta;
  objects: Disk[];
};

export class SimpleDisk {
  cover_url: string;
  id: number;
  title_ch: string;
  title_en: string;
};

export class DiskResponse extends Disk {
  errno: number;
  error: string;
}

export enum LIST_TYPE {
  NORMAL,
  RANKED,
  POPULAR,
}
