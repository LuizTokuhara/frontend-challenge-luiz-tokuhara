import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesList } from '../../../models/countries.interface';
import { environment } from '../../../../environments/environment';

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
}
