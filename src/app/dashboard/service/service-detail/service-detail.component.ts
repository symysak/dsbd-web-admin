import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ServiceService} from '../../../service/service.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConnectionService} from '../../../service/connection.service';
import {UserService} from '../../../service/user.service';
import {GroupService} from '../../../service/group.service';
import {IpService} from '../../../service/ip.service';

export interface DialogData {
  service: any;
}

@Component({
  selector: 'app-network-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public serviceService: ServiceService,
    private commonService: CommonService,
    public dialog: MatDialog,
  ) {
  }

  public id: string;
  public serviceInput = new FormGroup({
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
  public service: any;
  public ips: any[] = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.serviceService.get(this.id).then(response => {
      console.log(response);
      this.service = response.service[0];
      this.serviceInput.patchValue({
        ID: response.service[0].ID,
        group_id: response.service[0].group_id,
        lock: response.service[0].lock,
        open: response.service[0].open,
      });
      for (const tmpIP of response.service[0].ip) {
        if (tmpIP.plan !== null || tmpIP.plan !== 0) {
          const tmp = {
            ID: tmpIP.ID,
            After: 0,
            HalfYear: 0,
            OneYear: 0,
          };
          for (const tmpPlan of tmpIP.plan) {
            tmp.After += tmpPlan.after;
            tmp.HalfYear += tmpPlan.half_year;
            tmp.OneYear += tmpPlan.one_year;
          }
          this.ips.push(tmp);
        }
      }
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  update(): void {
    const json = JSON.stringify(this.serviceInput.getRawValue());
    console.log(json);
    this.serviceService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }

  getPlanAfter(id: number): any {
    const result = this.ips.find(item => item.ID === id);
    return result.After;
  }

  getPlanHalfYear(id: number): any {
    const result = this.ips.find(item => item.ID === id);
    return result.HalfYear;
  }

  getPlanOneYear(id: number): any {
    const result = this.ips.find(item => item.ID === id);
    return result.OneYear;
  }

  linkUser(id: number): void {
    this.router.navigate(['/dashboard/user/' + id]).then();
  }

  openProcess() {
    const dialogRef = this.dialog.open(ServiceDetailOpenProcess, {
      data: {
        service: this.service,
      },
      height: '600px',
      width: '900px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }
}


// 開通に関するフィールド
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'service-detail-open-process',
  templateUrl: 'service-detail-open-process.html',
  styleUrls: ['./service-detail.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ServiceDetailOpenProcess {

  public ntt: string;
  public noc: string;
  public termIP = new FormControl();
  public monitor: boolean;
  public user: any[] = [];
  public termUser: any;
  public connections: any[] = [];
  public connectionType: string;
  public connectionComment = new FormControl();
  public nocs: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ServiceDetailOpenProcess>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceService: ServiceService,
    private connectionService: ConnectionService,
    private ipService: IpService,
    private commonService: CommonService,
  ) {
  }

  requestServiceOpen(open: boolean) {
    this.serviceService.update(this.data.service.ID, {open}).then(() => {
        this.commonService.openBar('OK', 5000);
        location.reload();
      }
    );
  }

  requestConnectionOpen(id: string, open: boolean) {
    this.connectionService.update(id, {open}).then(() => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }

  requestIPOpen(id: string, open: boolean) {
    this.ipService.updateIP(id, {ID: id, open}).then(() => {
        this.commonService.openBar('OK', 5000);
        location.reload();
      }
    );
  }
}
