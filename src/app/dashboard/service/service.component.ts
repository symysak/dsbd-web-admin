import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-network',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  constructor(
    private serviceService: ServiceService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public service: any[] = new Array();
  public loading = true;


  ngOnInit(): void {
    this.serviceService.getAll().then(response => {
      console.log(response);
      this.service = response.service;
      this.loading = false;
      this.commonService.openBar('OK', 5000);
    });
  }

  detailPage(id): void {
    this.router.navigate(['/dashboard/service/' + id]).then();
  }
}
