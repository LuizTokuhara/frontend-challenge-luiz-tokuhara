import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ]
    });
    router = TestBed.inject(Router);
    router.navigateByUrl = jest.fn();
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should block access to home without login', () => {
    service.canLoad().subscribe(res => {
      expect(res).toBe(false);
      expect(router.navigateByUrl).toBeCalledWith('/login');
    });
  });

  it('should authorize access to home after login', () => {
    service.login();
    service.canLoad().subscribe(res => {
      expect(res).toBe(true);
    });
  })
});
