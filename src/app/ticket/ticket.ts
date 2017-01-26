import { File } from '../disk/file';

export class Ticket {
  id: number;
  create_log: {
    create_at: string;
  };
  actors?: Array<string>;
  apply_deadline?: string;
  cover_url?:File;
  desc_ch?: string;
  desc_en?: string;
  language?: string;
  length?: number;
  quantity?: string;
  director_ch?: string;
  director_en?: string;
  remarks?: string;
  show_time?: string;
  state?: string;
  subtitle?: string;
  successful_applicant?: string;
  title_ch: string;
  title_en: string;
  venue: string;
};

export class TicketMeta {
  model: string;
  next: string;
  page: number;
  previous: string;
  total: number;
}

export class TicketResponse {
  errno: number;
  error: string;
  meta: TicketMeta;
  objects: Ticket[];
}
