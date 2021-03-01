import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {GatewayIPService} from '../../../service/gateway-ip.service';

@Component({
  selector: 'app-gateway-ip-detail',
  templateUrl: './gateway-ip-detail.component.html',
  styleUrls: ['./gateway-ip-detail.component.scss']
})
export class GatewayIpDetailComponent implements OnInit {

  constructor(
    private gatewayIPService: GatewayIPService,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {
  }

  public gatewayIP: any;
  public loading = true;
  public id: string;
  public gatewayIPInput = new FormGroup({
    gateway_id: new FormControl(),
    ip: new FormControl(),
    enable: new FormControl(),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.gatewayIPService.get(this.id).then(response => {
      console.log(response);
      this.gatewayIPInput.patchValue({
        gateway_id: response.gateway_ip[0].gateway_id,
        enable: response.gateway_ip[0].enable
      });
      this.gatewayIP = response.gateway_ip[0];
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  update(): void {
    const json = JSON.stringify(this.gatewayIPInput.getRawValue());
    console.log(json);
    this.gatewayIPService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }
}
