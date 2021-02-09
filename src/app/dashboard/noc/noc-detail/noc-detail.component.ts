import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NocService} from '../../../service/noc.service';

@Component({
  selector: 'app-noc-detail',
  templateUrl: './noc-detail.component.html',
  styleUrls: ['./noc-detail.component.scss']
})
export class NocDetailComponent implements OnInit {

  constructor(
    private nocService: NocService,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {
  }

  public noc: any;
  public loading = true;
  public id: string;
  public nocInput = new FormGroup({
    name: new FormControl(),
    location: new FormControl(),
    bandwidth: new FormControl(),
    enable: new FormControl(),
    comment: new FormControl(),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.nocService.get(this.id).then(response => {
      console.log(response);
      this.nocInput.patchValue({
        ID: response.noc[0].ID,
        enable: response.noc[0].enable
      });
      this.noc = response.noc[0];
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  update(): void {
    const json = JSON.stringify(this.nocInput.getRawValue());
    console.log(json);
    this.nocService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }
}
