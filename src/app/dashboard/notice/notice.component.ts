import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {NoticeService} from '../../service/notice.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {ThemePalette} from '@angular/material/core';
import {GroupService} from '../../service/group.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
})
export class NoticeComponent implements OnInit {

  constructor(
    private noticeService: NoticeService,
    private commonService: CommonService,
    private groupService: GroupService,
    private router: Router,
  ) {
  }

  public notice: any[] = new Array();
  public loading = true;
  public noticeInput = new FormGroup({
    title: new FormControl(),
    data: new FormControl(),
    start_time: new FormControl(),
    end_time: new FormControl(),
    everyone: new FormControl(false),
    fault: new FormControl(false),
    important: new FormControl(false),
    info: new FormControl(false),
    user_id: new FormControl(),
    group_id: new FormControl(),
    noc_id: new FormControl(),
  });
  public showSpinners = true;
  public showSeconds = false;
  public touchUI = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public dateStartControl = new FormControl(new Date());
  public dateEndControl = new FormControl(new Date());
  public endTimeForever = false;
  public nocs: any[] = [];
  public users: any[] = [];
  public groups: any[] = [];
  public now: Date;

  ngOnInit(): void {
    this.now = new Date();
    this.noticeService.getAll().then(response => {
      console.log(response);
      this.notice = response.notice;
      this.loading = false;

      this.commonService.getTemplate().then(template => {
        this.nocs = template.nocs;
      });
      this.groupService.getAll().then(grp => {
        console.log(grp);
        for (const tmpGrp of grp.group) {
          this.groups.push({ID: tmpGrp.ID, org: tmpGrp.org});

          for (const tmpUser of tmpGrp.users) {
            this.users.push({ID: tmpUser.ID, name: tmpUser.name, org: tmpGrp.org});
          }
        }
      });
      this.commonService.openBar('OK', 5000);
    });
  }

  toDate(date: any): Date {
    return new Date(date);
  }

  add(): void {
    console.log(this.dateStartControl.value);
    console.log(this.dateEndControl.value);

    const startTime = this.timeToString(this.dateStartControl.value);

    let endTime = null;

    if (!this.endTimeForever) {
      endTime = this.timeToString(this.dateEndControl.value);
    }

    const json = this.noticeInput.getRawValue();
    if (endTime !== null && startTime > endTime) {
      this.commonService.openBar('終了時間が開始時間よりも後になっています。', 5000);
      return;
    }
    json.start_time = startTime;
    json.end_time = endTime;

    console.log(json);

    this.noticeService.create(json).then(() => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }

  timeToString(date: any): string {
    return date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2) + ' ' +
      ('0' + date.getHours()).slice(-2) + ':' +
      ('0' + date.getMinutes()).slice(-2) + ':' +
      ('0' + date.getSeconds()).slice(-2);
  }

  detailPage(id): void {
    this.router.navigate(['/dashboard/notice/' + id]).then();
  }

  delete(id): void {
    this.noticeService.delete(id).then(response => {
      console.log(response);
      this.notice = this.notice.filter(item => item.ID !== id);
      this.commonService.openBar('OK', 5000);
    });
  }

}
