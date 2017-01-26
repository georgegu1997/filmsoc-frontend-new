import { Disk } from "../disk/disk";

export class Show {
  create_log: {
    create_at: string;
  };
  film_1: Disk;
  film_2: Disk;
  film_3: Disk;
  id: number;
  participant_list: Array<string>;
  remarks?: string;
  state: string;
  vote_cnt_1: number;
  vote_cnt_2: number;
  vote_cnt_3: number;
};

export class ShowMeta {
  model: string;
  next: string;
  page: number;
  previous: string;
  total: number;
}

export class ShowResponse {
  errno: number;
  error: string;
  meta: ShowMeta;
  objects: Show[];
}
