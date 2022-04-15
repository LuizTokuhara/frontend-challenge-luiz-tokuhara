import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Country } from 'src/app/models/countries.interface';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent {

  @Input()
  data: Country[];

  constructor(
    private modalCtrl: ModalController
  ) { }

  select(country: Country) {
    this.modalCtrl.dismiss(country);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
