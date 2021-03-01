import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {GatewayIPService} from '../../service/gateway-ip.service';

@Component({
  selector: 'app-gateway-ip',
  templateUrl: './gateway-ip.component.html',
  styleUrls: ['./gateway-ip.component.scss']
})
export class GatewayIpComponent implements OnInit {

  constructor(
    private gatewayIPService: GatewayIPService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public gatewayIP: any[] = new Array();
  public loading = true;
  public gatewayInput = new FormGroup({
    gateway_id: new FormControl(),
    ip: new FormControl(),
    comment: new FormControl(),
    enable: new FormControl(),
  });

  ngOnInit(): void {
    this.gatewayIPService.getAll().then(response => {
      console.log(response);
      this.gatewayIP = response.gateway_ip;
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  add(): void {
    const json = JSON.stringify(this.gatewayInput.getRawValue());
    console.log(json);
    this.gatewayIPService.create(json).then(() => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }

  detailPage(id): void {
    this.router.navigate(['/dashboard/gateway_ip/' + id]).then();
  }

  delete(id): void {
    this.gatewayIPService.delete(id).then(() => {
      location.reload();
    });
  }
}
