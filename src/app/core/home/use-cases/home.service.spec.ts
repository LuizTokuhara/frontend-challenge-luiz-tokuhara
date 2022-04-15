import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { of } from 'rxjs';
import { CountriesListMock } from '../../../mocks/countries.mock';
import { HolidaysListMock } from '../../../mocks/holidays.mock';

describe('HomeService', () => {
  
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve countries', () => {
    const countries = jest
      .spyOn(service, 'getCountries')
      .mockReturnValue(of(CountriesListMock));
    service.getCountries().subscribe(res => {
      expect(countries).toBeCalled();
      expect(res).toEqual(CountriesListMock);
    })
  });

  it('should retrieve holidays', () => {
    const holidays = jest
      .spyOn(service, 'getHolidays')
      .mockReturnValue(of(HolidaysListMock));
    service.getHolidays('GB').subscribe(res => {
      expect(holidays).toBeCalled();
      expect(res).toEqual(HolidaysListMock);
    })
  });
});
