import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { CountriesListMock } from '../../mocks/countries.mock';
import { CountryModalComponent } from '../../components/country-modal/country-modal.component';
import { HolidayCardComponent } from '../../components/holiday-card/holiday-card.component';

import { HomePage } from './home.page';
import { HomeService } from './use-cases/home.service';
import { HolidaysListMock } from '../../mocks/holidays.mock';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../services/loading/loading.service';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let loadingShow;
  let loadingHide;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        HolidayCardComponent,
        CountryModalComponent
      ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        HomeService,
        ModalController,
        AlertService,
        LoadingService,
      ]
    }).compileComponents();

    loadingShow = jest.spyOn(LoadingService.prototype, 'show');
    loadingHide = jest.spyOn(LoadingService.prototype, 'hide');

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries', () => {
    const fetchCountries = jest
      .spyOn(HomeService.prototype, 'getCountries')
      .mockReturnValue(of(CountriesListMock));

    const fetchHolidays = jest
      .spyOn(HomeService.prototype, 'getHolidays')
      .mockReturnValue(of(HolidaysListMock));

    component.ionViewDidEnter();
    expect(loadingShow).toBeCalled();
    expect(loadingHide).toBeCalled();
    expect(fetchCountries).toBeCalled();
    expect(fetchHolidays).toBeCalled();
    expect(component.countries).toEqual(CountriesListMock);
    expect(component.selectedCountry).toEqual(
      CountriesListMock.countries[0]
    );
    expect(component.holidays).toEqual(
      HolidaysListMock.holidays
    );
  });

  it('should open countries modal', async () => {
    const modal = jest
      .spyOn(ModalController.prototype, 'create')
      .mockResolvedValue({
        present: jest.fn(),
        onDidDismiss: jest.fn().mockResolvedValue(
          {data: CountriesListMock.countries[0]}
        )
      } as any);

    component.countries = CountriesListMock;
    component.ionViewDidEnter();
    await component.countriesModal();

    expect(modal).toBeCalled();
  });

  it('should throw error when loading countries', () => {
    jest
      .spyOn(HomeService.prototype, 'getCountries')
      .mockReturnValue(throwError('Error'));

    jest
      .spyOn(HomeService.prototype, 'getHolidays')
      .mockReturnValue(of(HolidaysListMock));

    const alert = jest
      .spyOn(AlertService.prototype, 'errorAlert')
      .mockResolvedValue();

    component.ionViewDidEnter();
    expect(loadingShow).toBeCalled();
    expect(loadingHide).toBeCalled();
    expect(alert).toBeCalledWith('Ops', 'Something went wrong, try again later');
  });

  it('should throw error when loading holidays', async () => {
    jest
      .spyOn(HomeService.prototype, 'getCountries')
      .mockReturnValue(of(CountriesListMock));

    jest
      .spyOn(HomeService.prototype, 'getHolidays')
      .mockReturnValue(throwError('Error'));

    const alert = jest
      .spyOn(AlertService.prototype, 'errorAlert')
      .mockResolvedValue();

    component.countries = CountriesListMock;
    component.ionViewDidEnter();
    expect(loadingShow).toBeCalled();
    expect(loadingHide).toBeCalled();
    expect(alert).toBeCalledWith('Ops', 'Something went wrong, try again later');
  });
});
