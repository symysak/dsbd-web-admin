import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayIpComponent } from './gateway-ip.component';

describe('GatewayIpComponent', () => {
  let component: GatewayIpComponent;
  let fixture: ComponentFixture<GatewayIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayIpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
