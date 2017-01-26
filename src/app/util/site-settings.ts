export class SiteSetting {
  id: number;
  key: string;
  value: string;
}

export class SiteSettingsMeta {
  model: string;
  next: string;
  page: number;
  previous: string;
  total: number;
}

export class SiteSettingsResponse {
  errno: number;
  error: string;
  meta: SiteSettingsMeta;
  objects: SiteSetting[];
}
