export class News {
  content: string;
  create_log: {
    created_at: string;
  };
  id: number;
  title: string;
};

export class NewsMeta {
  model: string;
  next: string;
  page: number;
  previous: string;
  total: number;
};

export class NewsResponse {
  errno: number;
  error: string;
  meta: NewsMeta;
  objects: News[];
}
