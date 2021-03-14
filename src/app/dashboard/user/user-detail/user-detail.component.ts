import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public userInput = new FormGroup({
    ID: new FormControl(),
    group_id: new FormControl(),
    name: new FormControl(),
    name_en: new FormControl(),
    email: new FormControl(),
    pass: new FormControl(),
    expired_status: new FormControl(),
    level: new FormControl(),
    tech: new FormControl(false)
  });
  public loading = true;
  public hide = false;
  public user: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).then(response => {
      console.log(response);
      this.user = response.users[0];
      this.userInput.patchValue({
        ID: response.users[0].ID,
        expired_status: response.users[0].expired_status,
        level: response.users[0].level,
        group_id: response.users[0].group_id,
      });
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  update(): void {
    const json = JSON.stringify(this.userInput.getRawValue());
    console.log(json);
    this.userService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }
}
