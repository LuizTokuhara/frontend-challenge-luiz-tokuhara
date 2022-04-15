import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HolidayCardComponent } from 'src/app/components/holiday-card/holiday-card.component';
import { CountryModalComponent } from 'src/app/components/country-modal/country-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [
    HomePage,
    HolidayCardComponent,
    CountryModalComponent
  ]
})
export class HomePageModule {}
