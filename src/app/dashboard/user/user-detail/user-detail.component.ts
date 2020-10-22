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
    g_id: new FormControl(),
    name: new FormControl(),
    nameEn: new FormControl(),
    password: new FormControl(),
    mailToken: new FormControl(),
    mailVerify: new FormControl(),
    org: new FormControl(),
    orgEn: new FormControl(),
    postcode: new FormControl(),
    address: new FormControl(),
    addressEn: new FormControl(),
    dept: new FormControl(),
    deptEn: new FormControl(),
    pos: new FormControl(),
    posEn: new FormControl(),
    tel: new FormControl(),
    fax: new FormControl(),
    country: new FormControl(),
    status: new FormControl(),
    level: new FormControl(),
  });
  public loading = true;
  public hide = false;
  identificationName = new FormControl('');
  serviceCode = new FormControl('');
  public user: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).then(response => {
      console.log(response);
      if (response.status) {
        this.user = response.data[0];
        this.loading = false;
        console.log(this.user);
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  update(): void {
  }
}
