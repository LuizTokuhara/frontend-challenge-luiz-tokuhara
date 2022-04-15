import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Country } from 'src/app/models/countries.interface';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent implements OnInit {

  @Input()
  data: Country[];

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  select(country) {
    console.log(country)
    this.modalCtrl.dismiss(country);
  }

}
