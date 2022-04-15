import { TestBed } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingController]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loading', () => {
    const loading = jest
      .spyOn(LoadingController.prototype, 'create')
      .mockResolvedValue({
        present: jest.fn(),
        dismiss: jest.fn()
      } as any);
    
    service.show();
    expect(loading).toBeCalled();
  });

  it('should hide loading', () => {
    const loading = jest
      .spyOn(LoadingController.prototype, 'create')
      .mockResolvedValue({
        present: jest.fn(),
        dismiss: jest.fn()
      } as any);
    
    service.show();
    service.hide();
    expect(loading).toBeCalled();
  });
});
