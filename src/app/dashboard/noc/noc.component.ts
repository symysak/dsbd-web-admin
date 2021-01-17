import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {NocService} from '../../service/noc.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-noc',
  templateUrl: './noc.component.html',
  styleUrls: ['./noc.component.scss']
})
export class NocComponent implements OnInit {

  constructor(
    private nocService: NocService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public noc: any[] = new Array();
  public loading = true;
  public nocInput = new FormGroup({
    name: new FormControl(),
    location: new FormControl(),
    bandwidth: new FormControl(),
    enable: new FormControl(),
    comment: new FormControl(),
  });


  ngOnInit(): void {
    this.nocService.getAll().then(response => {
      console.log(response);
      if (response.status) {
        this.noc = response.noc;
        this.loading = false;
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }


  add(): void {
    const json = JSON.stringify(this.nocInput.getRawValue());
    console.log(json);
    this.nocService.create(json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
        location.reload();
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }

  detailPage(id): void {
    this.router.navigate(['/dashboard/noc/' + id]).then();
  }

  delete(id): void {
    this.nocService.delete(id).then(response => {
      location.reload();
    });
  }
}
