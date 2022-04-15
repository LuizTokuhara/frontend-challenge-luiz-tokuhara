import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { CountriesListMock } from '../../mocks/countries.mock';

import { CountryModalComponent } from './country-modal.component';

describe('CountryModalComponent', () => {
  let component: CountryModalComponent;
  let fixture: ComponentFixture<CountryModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryModalComponent ],
      imports: [IonicModule.forRoot()],
      providers: [ModalController]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the countries modal', () => {
    component.data = CountriesListMock.countries;
    expect(component.data).not.toBe(null);
  });

  it('should select a country', () => {
    const modal = jest.spyOn(ModalController.prototype, 'dismiss');
    component.select(CountriesListMock.countries[0]);

    expect(modal).toBeCalled();
  });

  it('should close the modal', () => {
    const modal = jest.spyOn(ModalController.prototype, 'dismiss');
    component.close();

    expect(modal).toBeCalled();
  });
});
