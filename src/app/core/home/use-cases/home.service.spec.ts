import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { Observable, of } from 'rxjs';
import { CountriesListMock } from '../../../mocks/countries.mock';
import { HolidaysListMock } from '../../../mocks/holidays.mock';
import { CountriesList } from '../../../models/countries.interface';
import { HolidaysList } from '../../../models/holidays.interface';

describe('HomeService', () => {
  
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService, HttpClient]
    });
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve countries', (done) => {
    jest
      .spyOn(HttpClient.prototype, 'get')
      .mockImplementation(
        () =>
          new Observable<CountriesList>((observer) => observer.next(CountriesListMock))
      );

    service.getCountries()
      .subscribe((res) => {
        expect(res).toEqual(CountriesListMock);
        done();
      },
        () => {
          done.fail('it should not fail');
        }
      )
  });

  it('should retrieve holidays', (done) => {
    jest
      .spyOn(HttpClient.prototype, 'get')
      .mockImplementation(
        () =>
          new Observable<HolidaysList>((observer) => observer.next(HolidaysListMock))
      );

    service.getHolidays('GB')
      .subscribe((res) => {
        expect(res).toEqual(HolidaysListMock);
        done();
      },
        () => {
          done.fail('it should not fail');
        }
      );
  });
});
