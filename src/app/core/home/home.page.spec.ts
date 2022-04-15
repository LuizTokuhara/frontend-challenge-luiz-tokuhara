import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { CountriesListMock } from '../../mocks/countries.mock';
import { CountryModalComponent } from '../../components/country-modal/country-modal.component';
import { HolidayCardComponent } from '../../components/holiday-card/holiday-card.component';

import { HomePage } from './home.page';
import { HomeService } from './use-cases/home.service';
import { HolidaysListMock } from '../../mocks/holidays.mock';

class modalCtrlSpy {
  public presentableRef = {
    present: () => Promise.resolve(),
    dismiss: (data?: any) => {
      if (this.dismissCallbackFn) {
        this.dismissCallbackFn(data);
      }
      return Promise.resolve(CountriesListMock.countries[0]);
    },
    onDidDismiss: (fn) => {
      this.dismissCallbackFn = fn;
    },
  };

  public dismissCallbackFn = null;

  public create(options?) {
    return Object.assign(this.presentableRef, options);
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

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
        { provide: ModalController, useClass: modalCtrlSpy },
      ]
    }).compileComponents();

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
      .spyOn(ModalController.prototype, 'dismiss')
      .mockResolvedValue(true)
    component.countries = CountriesListMock;
    component.ionViewDidEnter();
    await component.countriesModal();

    expect(modal).toBeCalled();
  })
});
