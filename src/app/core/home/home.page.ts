import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AlertService } from '../../services/alert/alert.service';
import { CountryModalComponent } from '../../components/country-modal/country-modal.component';
import { CountriesList, Country } from '../../models/countries.interface';
import { Holidays } from '../../models/holidays.interface';
import { HomeService } from './use-cases/home.service';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public countries: CountriesList;
  public selectedCountry: Country;
  public holidays: Holidays[];

  constructor(
    private homeService: HomeService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private loadingService: LoadingService
    ) {}

  ionViewDidEnter() {
    this.loadingService.show();
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
      this.getHolidays(this.selectedCountry.code);
      this.loadingService.hide();
    }, () => {
      this.loadingService.hide();
      this.alertService.errorAlert('Ops', 'Something went wrong, try again later');
    });
  }

  getHolidays(country) {
    this.homeService.getHolidays(country).pipe(
      take(1),
      catchError((err) => {
        return throwError(err);
      })
    )
    .subscribe(res => {
      this.holidays = res.holidays;
      this.loadingService.hide();
    }, () => {
      this.loadingService.hide();
      this.alertService.errorAlert('Ops', 'Something went wrong, try again later');
    })
  }

  async countriesModal() {
    const modal = await this.modalCtrl.create({
      component: CountryModalComponent,
      componentProps: {
        data: this.countries.countries
      }
    });

    modal.onDidDismiss().then((country) => {
      if(country.data) {
        this.loadingService.show();
        this.selectedCountry = country.data;
        this.getHolidays(this.selectedCountry.code);
      }
    });
    return await modal.present();
  }

}
