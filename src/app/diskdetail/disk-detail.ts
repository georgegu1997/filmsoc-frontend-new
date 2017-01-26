import { SimpleUserinfo } from '../userinfo/simple-userinfo';
import { Disk } from '../disk/disk';

export class BaseResponse {
  errno: number;
  error: string;
}

export class ReservationForm {
  constructor(
    public form: string,
    public hall?: number,
    public room?: string,
    public remarks?: string,
  ){}
}

export const DISK_TYPE = {
  "A": "VCD",
  "B": "DVD",
  "C": "BD",
  "D": "Drive"
}

export const HALL_LIST = [
  {str:'Hall I', number:1},
  {str:'Hall II', number:2},
  {str:'Hall III', number:3},
  {str:'Hall IV', number:4},
  {str:'Hall V', number:5},
  {str:'Hall VI', number:6},
  {str:'Hall VII', number:7},
  {str:'Hall VII', number:8},
  {str:'Hall IX', number:9},
]

export class DiskResponse extends Disk {
  errno: number;
  error: string;
}

export class DiskReview {
  content: string;
  create_log: {
    create_at: string;
  };
  disk: number;
  id: number;
  poster: SimpleUserinfo;
}

export class DiskReviewMeta {
  model: string;
  next: string;
  page: number;
  previous: string;
  total: number;
}

export class DiskReviewResponse {
  errno: number;
  error: string;
  meta: DiskReviewMeta;
  objects: DiskReview[];
}

export class DiskRateResponse {
  errno: number;
  error: string;
  rated: boolean;
  ups: number;
  downs: number;
}
