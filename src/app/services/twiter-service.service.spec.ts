import { TestBed } from '@angular/core/testing';

import { TwiterServiceService } from './twiter-service.service';

describe('TwiterServiceService', () => {
  let service: TwiterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwiterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
