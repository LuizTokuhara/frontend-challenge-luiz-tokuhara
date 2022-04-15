export interface HolidaysList {
  holidays: Holidays[];
}

export interface Holidays {
  date: string;
  name: string;
  local_name: string;
  country_code: string;
  regions: string[];
  types: string[];
}
