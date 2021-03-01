import { TestBed } from '@angular/core/testing';

import { GatewayIPService } from './gateway-ip.service';

describe('GatewayIPService', () => {
  let service: GatewayIPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatewayIPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
