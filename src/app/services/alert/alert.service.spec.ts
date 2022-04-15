import { TestBed } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertController]
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open alert popup', () => {
    const alert = jest
      .spyOn(AlertController.prototype, 'create')
      .mockResolvedValue({
        present: jest.fn(),
        dismiss: jest.fn()
      } as any);
    
    service.errorAlert('title', 'message');
    expect(alert).toBeCalled();
  })
});
