import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public user: any[] = new Array();
  public loading = true;


  ngOnInit(): void {
    this.userService.getAll().then(response => {
      console.log(response);
      this.user = response.users;
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  userPage(id): void {
    this.router.navigate(['/dashboard/user/' + id]).then();
  }
}
