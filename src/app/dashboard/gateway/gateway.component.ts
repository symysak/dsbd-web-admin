import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {GatewayService} from '../../service/gateway.service';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  constructor(
    private gatewayService: GatewayService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public gateway: any[] = new Array();
  public loading = true;
  public gatewayInput = new FormGroup({
    router_id: new FormControl(),
    hostname: new FormControl(),
    v4: new FormControl(),
    v6: new FormControl(),
    capacity: new FormControl(),
    enable: new FormControl(),
    comment: new FormControl(),
  });

  ngOnInit(): void {
    this.gatewayService.getAll().then(response => {
      console.log(response);
      this.gateway = response.gateway;
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  add(): void {
    const json = JSON.stringify(this.gatewayInput.getRawValue());
    console.log(json);
    this.gatewayService.create(json).then(() => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }

  detailPage(id): void {
    this.router.navigate(['/dashboard/gateway/' + id]).then();
  }

  delete(id): void {
    this.gatewayService.delete(id).then(() => {
      location.reload();
    });
  }
}
