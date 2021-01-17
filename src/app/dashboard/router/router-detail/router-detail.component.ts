import {Component, OnInit} from '@angular/core';
import {RouterService} from '../../../service/router.service';
import {CommonService} from '../../../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-router-detail',
  templateUrl: './router-detail.component.html',
  styleUrls: ['./router-detail.component.scss']
})
export class RouterDetailComponent implements OnInit {

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {
  }

  public routers: any;
  public loading = true;
  public id: string;
  public routerInput = new FormGroup({
    ID: new FormControl(),
    noc: new FormControl(),
    hostname: new FormControl(),
    address: new FormControl(),
    enable: new FormControl(),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.routerService.get(this.id).then(response => {
      console.log(response);
      this.routerInput.patchValue({
        ID: response.router[0].ID,
        noc: response.router[0].noc,
        enable: response.router[0].enable
      });
      if (response.status) {
        this.routers = response.router[0];
        this.loading = false;
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  update(): void {
    const json = JSON.stringify(this.routerInput.getRawValue());
    console.log(json);
    this.routerService.update(this.id, json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
        location.reload();
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }
}
