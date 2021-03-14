import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ServiceService} from '../../../service/service.service';

@Component({
  selector: 'app-network-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public networkService: ServiceService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public networkInput = new FormGroup({
    ID: new FormControl(),
    asn: new FormControl(''),
    group_id: new FormControl(''),
    org: new FormControl(''),
    org_en: new FormControl(''),
    postcode: new FormControl(''),
    address: new FormControl(''),
    address_en: new FormControl(''),
    pi: new FormControl(''),
    route_v4: new FormControl(''),
    v4: new FormControl(''),
    v4_name: new FormControl(''),
    route_v6: new FormControl(''),
    v6: new FormControl(''),
    v6_name: new FormControl(''),
    lock: new FormControl(),
    open: new FormControl()
  });
  public loading = true;
  public hide = false;
  public servicek: any;
  public users: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.networkService.get(this.id).then(response => {
      console.log(response);
      this.servicek = response.network[0];
      this.users = response.user;
      this.networkInput.patchValue({
        ID: response.network[0].ID,
        group_id: response.network[0].group_id,
        lock: response.network[0].lock,
        pi: response.network[0].pi,
        open: response.network[0].open,
      });
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  update(): void {
    const json = JSON.stringify(this.networkInput.getRawValue());
    console.log(json);
    this.networkService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }

  getUser(id: number): string {
    const user = this.users.find(e => e.ID === id);
    return user.ID + ':' + user.name + ' ';
  }

  linkUser(id: number): void {
    this.router.navigate(['/dashboard/user/' + id]).then();
  }
}
