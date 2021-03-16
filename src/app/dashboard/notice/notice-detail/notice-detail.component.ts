import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NoticeService} from '../../../service/notice.service';
import * as moment from 'moment';
import {ThemePalette} from '@angular/material/core';
import {GroupService} from '../../../service/group.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public noticeService: NoticeService,
    public groupService: GroupService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public loading = true;
  public hide = false;
  public notice: any;
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.noticeService.get(this.id).then(response => {
      console.log(response);
      this.notice = response.notice[0];
      this.noticeInput.patchValue({
        ID: response.notice[0].ID,
        title: response.notice[0].title,
        data: response.notice[0].data,
        everyone: response.notice[0].everyone,
        fault: response.notice[0].fault,
        important: response.notice[0].important,
        info: response.notice[0].info,
        start_time: response.notice[0].start_time,
        end_time: response.notice[0].end_time,
        user_id: response.notice[0].user_id,
        group_id: response.notice[0].group_id,
        noc_id: response.notice[0].noc_id,
      });
      this.dateStartControl.setValue(new Date(response.notice[0].start_time));
      this.dateEndControl.setValue(new Date(response.notice[0].end_time));
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
      this.loading = false;
    });
  }

  update(): void {
    const tmp = this.noticeInput;

    tmp.patchValue({
      start_time: Math.floor(+new Date(this.noticeInput.value.start_time) / 1000),
      ending_time: Math.floor(+new Date(this.noticeInput.value.ending_time) / 1000)
    });

    if (tmp.value.start_time === 0) {
      this.commonService.openBar('開始時刻が書かれていません。', 5000);
    }
    if (tmp.value.ending_time === 0) {
      this.commonService.openBar('終了時刻が書かれていません。', 5000);
    }
    if (tmp.value.start_time < tmp.value.ending_time) {
      this.commonService.openBar('終了時間が開始時間よりも後になっています。', 5000);
    }

    const json = JSON.stringify(this.noticeInput.getRawValue());
    console.log(json);

    this.noticeService.update(this.id, json).then(() => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }
}
