import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { CountriesList, Country } from 'src/app/models/countries.interface';
import { HomeService } from './use-cases/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public countries: CountriesList;
  public selectedCountry: Country;

  constructor(private homeService: HomeService) {}

  ionViewDidEnter() {
    this.getCountries();
  }

  getCountries(): void {
    this.homeService.getCountries().pipe(
      take(1),
      catchError((err) => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.countries = res;
      this.selectedCountry = res.countries[0];
      console.log(this.selectedCountry)
    });
  }

}
