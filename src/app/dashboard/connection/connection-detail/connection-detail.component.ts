import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ConnectionService} from '../../../service/connection.service';

@Component({
  selector: 'app-connection-detail',
  templateUrl: './connection-detail.component.html',
  styleUrls: ['./connection-detail.component.scss']
})
export class ConnectionDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public connectionService: ConnectionService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public connectionInput = new FormGroup({
    ID: new FormControl(),
    group_id: new FormControl(''),
    user_id: new FormControl(''),
    service: new FormControl(''),
    service_id: new FormControl(''),
    noc: new FormControl(''),
    noc_ip: new FormControl(''),
    ntt: new FormControl(''),
    term_ip: new FormControl(''),
    fee: new FormControl(''),
    link_v4_our: new FormControl(''),
    link_v4_your: new FormControl(''),
    link_v6_our: new FormControl(''),
    link_v6_your: new FormControl(''),
    open: new FormControl(),
    monitor: new FormControl()
  });
  public loading = true;
  public hide = false;
  public connection: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.connectionService.get(this.id).then(response => {
      console.log(response);
      this.connection = response.connection[0];
      this.connectionInput.patchValue({
        ID: response.connection[0].ID,
        group_id: response.connection[0].group_id,
        user_id: response.connection[0].user_id,
        open: response.connection[0].open,
        monitor: response.connection[0].monitor,
      });
      this.loading = false;
      console.log(this.connection);
      this.commonService.openBar('OK', 5000);
    });
  }

  update(): void {
    const json = JSON.stringify(this.connectionInput.getRawValue());
    console.log(json);
    this.connectionService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }
}
