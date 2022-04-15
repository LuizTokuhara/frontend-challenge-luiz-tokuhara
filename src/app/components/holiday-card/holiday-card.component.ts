import { Component, Input, OnInit } from '@angular/core';
import { Holidays } from 'src/app/models/holidays.interface';

@Component({
  selector: 'app-holiday-card',
  templateUrl: './holiday-card.component.html',
  styleUrls: ['./holiday-card.component.scss'],
})
export class HolidayCardComponent implements OnInit {

  @Input()
  holidays: Holidays[];
  
  constructor() { }

  ngOnInit() {}

}
