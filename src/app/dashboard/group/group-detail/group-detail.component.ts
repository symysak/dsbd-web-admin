import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {GroupService} from '../../../service/group.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {UserService} from '../../../service/user.service';
import {NetworkService} from '../../../service/network.service';

export interface DialogData {
  groupID: string;
  users: any;
}

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public groupService: GroupService,
    public commonService: CommonService,
    public dialog: MatDialog,
  ) {
  }

  public id: string;
  public org = '';
  public groupInput = new FormGroup({
    ID: new FormControl(),
    org: new FormControl(),
    status: new FormControl(),
    lock: new FormControl(),
  });
  public statusInfo = '';
  public loading = true;
  public hide = false;
  public group: any;
  public users: any;
  public networks: any;
  public connections: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.groupService.get(this.id).then(response => {
      console.log(response);
      if (response.status) {
        this.group = response.group[0];
        this.groupInput.patchValue({
          ID: response.group[0].ID,
          status: response.group[0].status,
          lock: response.group[0].lock,
        });
        this.org = response.group[0].org;
        this.loading = false;
        console.log(this.group);

        this.users = response.user;

        // エラー処理の検証必要
        if (response.network === null) {
          this.networks = null;
        } else {
          this.networks = response.network;
        }

        if (response.connection === null) {
          this.connections = null;
        } else {
          this.connections = response.connection;
        }

        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
        return;
      }
      this.statusInfo = this.commonService.getStatus(this.group.status);
    });
  }

  updatePlusStatus(): void {
    let status = this.group.status;
    status++;
    this.groupInput.patchValue({
      ID: this.group.ID,
      status,
      lock: this.group.lock,
    });
    this.update();
  }

  updateStatus(status: number): void {
    this.groupInput.patchValue({
      ID: this.group.ID,
      status,
      lock: this.group.lock,
    });
    this.update();
  }

  update(): void {
    const json = JSON.stringify(this.groupInput.getRawValue());
    console.log(json);
    this.groupService.update(this.id, json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
        location.reload();
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }

  userPage(id): void {
    this.router.navigate(['/dashboard/user/' + id]).then();
  }

  connectionPage(id): void {
    this.router.navigate(['/dashboard/connection/' + id]).then();
  }

  networkPage(id): void {
    this.router.navigate(['/dashboard/network/' + id]).then();
  }

  getUser(id: number): string {
    const user = this.users.find(e => e.ID === id);
    return user.ID + ':' + user.name + ' ';
  }

  createNetworkInfo() {
    const dialogRef = this.dialog.open(GroupDetailCreateNetwork, {
      data: {
        groupID: this.id,
        users: this.users
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

// network情報の追加フィールド
@Component({
  selector: 'group-detail-create-network',
  templateUrl: 'group-detail-create-network.html',
})
export class GroupDetailCreateNetwork {
  public ip: FormGroup;
  public routeV4: string;
  public routeV4Etc = new FormControl();
  public routeV6: string;
  public routeV6Etc = new FormControl();
  public routeV4Check = false;
  public routeV6Check = false;
  public pi = false;
  public asn = new FormControl();
  public plan = new FormControl();
  private planJa = '      [Subnet Number1]\n' +
    '      目的: \n\n' +
    '      ----使用IPアドレス----\n' +
    '      契約後: 4\n' +
    '      半年後: 5\n' +
    '      １年後: 6\n\n' +
    '      ----IPアドレスの使用率----\n' +
    '      * この使用率はネットワークアドレスとブロードキャストアドレスも含めて計算します。\n' +
    '      契約後: 75%\n' +
    '      半年後: 87.5%\n' +
    '      １年後: 100%\n\n' +
    '      ----Other----\n' +
    '      一時接続 :\n\n\n' +
    '      ----デバイス一覧----\n' +
    '      デバイス　　 契約後/半年後/１年後\n' +
    '      ----------------------------------------------\n' +
    '      Router     1/1/1\n' +
    '      FW         1/1/1\n' +
    '      WebServer  1/2/2\n' +
    '      MailServer 1/1/2\n' +
    '      ----------------------------------------------\n' +
    '      全デバイス   4/5/6';
  private planEn = '      [Subnet Number1]\n' +
    '      Purpose of use: \n\n' +
    '      ----Use number of ip addresses----\n' +
    '      immediately after contract : 4\n' +
    '      immediately after half year : 5\n' +
    '      immediately after one year : 6\n\n' +
    '      ----Utilization rate of ip addresses----\n' +
    '      * The utilization rate is calculated by including the network address and broadcast address.\n' +
    '      immediately after contract : 75%\n' +
    '      immediately after half year : 87.5%\n' +
    '      immediately after one year : 100%\n\n' +
    '      ----Other----\n' +
    '      temporary connection :\n\n\n' +
    '      ----Device List----\n' +
    '      device 　　after contract/half year/one year\n' +
    '      ----------------------------------------------\n' +
    '      Router     1/1/1\n' +
    '      FW         1/1/1\n' +
    '      WebServer  1/2/2\n' +
    '      MailServer 1/1/2\n' +
    '      ----------------------------------------------\n' +
    '      total Device      4/5/6\n' +
    '    Please copy and complete the format for each subnet , if you use divided subnets of IPv4 address.\n' +
    '    According to JPNIC\'s rules, users must meet the following conditions.\n' +
    '        immediately after contract\n' +
    '        Over 25%\n\n' +
    '        immediately after half year\n' +
    '        Over 25%\n\n' +
    '        immediately after one year\n' +
    '        Over 50%\n\n' +
    '     ---How to calculate the utilization rate---\n' +
    '                                    Number of IP addresses to be used\n' +
    '      Utilization rate = ------------------------------------------------------------------------ x100\n' +
    '                                    Number of IP addresses to be allocated\n' +
    '    \n' +
    '    Please do not include private addresses in the utilization rate.\n' +
    '    temporary connection means that the always IP address is not used. (ex Assign IP Address by DHCP.\n' +
    '    The utilization rate is calculated by including the network address and broadcast address.\n';
  jpnicJa = new FormGroup({
    org: new FormControl(''),
    postcode: new FormControl(''),
    address: new FormControl(''),
  });
  jpnicEn = new FormGroup({
    org: new FormControl(''),
    address: new FormControl(''),
  });
  checkV4 = false;
  checkV6 = false;
  jpnicV4 = new FormGroup({
    name: new FormControl(''),
    subnet: new FormControl(''),
  });
  jpnicV6 = new FormGroup({
    name: new FormControl(''),
    subnet: new FormControl(''),
  });
  // public users =number {data: []};
  public admin: any;
  dateStart: string;
  dateEnd: string;
  dateEndUnlimited = false;

  constructor(
    public dialogRef: MatDialogRef<GroupDetailCreateNetwork>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,
    private commonService: CommonService,
    private networkService: NetworkService,
  ) {
  }

  addEventStart(event: MatDatepickerInputEvent<Date>) {
    this.dateStart = event.value.getFullYear() + '/' + (event.value.getMonth() + 1) + '/' + event.value.getDate();
  }

  addEventEnd(event: MatDatepickerInputEvent<Date>) {
    this.dateEnd = event.value.getFullYear() + '/' + (event.value.getMonth() + 1) + '/' + event.value.getDate();
  }

  request() {
    // TODO: #1 Issue
    console.log(this.data.users);
    if (this.routeV4 === '' || this.routeV6 === '') {
      this.commonService.openBar('invalid..', 5000);
      return;
    }
    if (this.pi) {
      if (this.asn.value === '') {
        this.commonService.openBar('asn invalid..', 5000);
        return;
      }
    } else {
      if (this.admin === '') {
        this.commonService.openBar('no select (operation staff)', 5000);
      }
    }

    const tech: any[] = new Array();

    for (const u of this.data.users) {
      if (u.select) {
        tech.push(u.ID);
      }
    }

    // date定義
    let date: string;
    if (this.dateEndUnlimited) {
      date = '接続開始日: ' + this.dateStart + '\n接続終了日: 未定';
    } else {
      date = '接続開始日: ' + this.dateStart + '\n接続終了日: ' + this.dateEnd;
    }

    const body = {
      admin_id: parseInt(this.admin, 10),
      tech_id: tech,
      org: this.jpnicJa.value.org,
      org_en: this.jpnicEn.value.org,
      postcode: this.jpnicJa.value.postcode,
      address: this.jpnicJa.value.address,
      address_en: this.jpnicEn.value.address,
      route_v4: this.routeV4,
      route_v6: this.routeV6,
      pi: this.pi,
      asn: this.asn.value,
      v4: this.jpnicV4.value.subnet,
      v6: this.jpnicV6.value.subnet,
      v4_name: this.jpnicV4.value.name,
      v6_name: this.jpnicV6.value.name,
      date,
      plan: this.plan.value,
    };

    console.log(body);

    this.networkService.create(this.data.groupID, body).then(response => {
      console.log('---response---');
      console.log(response);
      if (response.status) {
        this.commonService.openBar('申請完了', 5000);
        this.router.navigate(['/dashboard/group/' + this.data.groupID]).then();
      } else {
        this.commonService.openBar('登録エラー。詳しくはconsoleを参照してください。', 5000);
        console.log(response.error);
        return;
      }
    });
  }
}

// connection情報の追加フィールド
// @Component({
//   selector: 'group-detail-create-connection',
//   templateUrl: 'group-detail-create-connection.html',
// })
// export class GroupDetailCreateConnection {
// }
