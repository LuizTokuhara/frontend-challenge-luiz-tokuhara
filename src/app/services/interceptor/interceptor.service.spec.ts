import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HomeService } from '../../core/home/use-cases/home.service';
import { environment } from '../../../environments/environment';

import { InterceptorService } from './interceptor.service';

describe('InterceptorService', () => {
  let service: InterceptorService;
  let httpMock: HttpTestingController;
  let homeService: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true,
        },
        HomeService,
      ],
    });
    service = TestBed.inject(InterceptorService);
    homeService = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    homeService.getCountries().subscribe(res => {
      expect(res).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(environment.api.baseUrl + environment.api.countries);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });
});
