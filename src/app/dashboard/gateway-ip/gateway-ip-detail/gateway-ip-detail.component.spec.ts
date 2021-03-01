import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayIpDetailComponent } from './gateway-ip-detail.component';

describe('GatewayIpDetailComponent', () => {
  let component: GatewayIpDetailComponent;
  let fixture: ComponentFixture<GatewayIpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayIpDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayIpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
