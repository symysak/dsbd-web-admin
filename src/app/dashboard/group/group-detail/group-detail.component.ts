import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {GroupService} from '../../../service/group.service';

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
}

