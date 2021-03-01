import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {GatewayService} from '../../../service/gateway.service';

@Component({
  selector: 'app-gateway-detail',
  templateUrl: './gateway-detail.component.html',
  styleUrls: ['./gateway-detail.component.scss']
})
export class GatewayDetailComponent implements OnInit {

  constructor(
    private gatewayService: GatewayService,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {
  }

  public gateway: any;
  public loading = true;
  public id: string;
  public gatewayInput = new FormGroup({
    name: new FormControl(),
    location: new FormControl(),
    bandwidth: new FormControl(),
    enable: new FormControl(),
    comment: new FormControl(),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.gatewayService.get(this.id).then(response => {
      console.log(response);
      this.gatewayInput.patchValue({
        ID: response.gateway[0].ID,
        enable: response.gateway[0].enable
      });
      this.gateway = response.gateway[0];
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  update(): void {
    const json = JSON.stringify(this.gatewayInput.getRawValue());
    console.log(json);
    this.gatewayService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }
}
