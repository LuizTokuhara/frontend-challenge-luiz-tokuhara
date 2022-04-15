import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesList } from '../../../models/countries.interface';
import { environment } from '../../../../environments/environment';
import { HolidaysList } from 'src/app/models/holidays.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<CountriesList> {
    return this.http.get<CountriesList>(
      environment.api.baseUrl + environment.api.countries
    );
  }

  getHolidays(countryCode: string): Observable<HolidaysList> {
    const currentYear = new Date();
    const params = new HttpParams()
      .set('country_code', countryCode)
      .set('year', currentYear.getFullYear());
    return this.http.get<HolidaysList>(
      environment.api.baseUrl + environment.api.holidays, {params}
    );
  }
}
