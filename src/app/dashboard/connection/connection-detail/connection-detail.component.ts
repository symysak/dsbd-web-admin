import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ConnectionService} from '../../../service/connection.service';
import {RouterService} from '../../../service/router.service';
import {GatewayIPService} from '../../../service/gateway-ip.service';

@Component({
  selector: 'app-connection-detail',
  templateUrl: './connection-detail.component.html',
  styleUrls: ['./connection-detail.component.scss']
})
export class ConnectionDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public connectionService: ConnectionService,
    private commonService: CommonService,
    private routerService: RouterService,
    private gatewayIPService: GatewayIPService,
  ) {
  }

  public id: string;
  public connectionInput = new FormGroup({
    ID: new FormControl(),
    group_id: new FormControl(''),
    user_id: new FormControl(''),
    connection_type: new FormControl(''),
    connection_number: new FormControl(''),
    network_id: new FormControl(''),
    router_id: new FormControl(''),
    gateway_ip_id: new FormControl(''),
    noc: new FormControl(''),
    ntt: new FormControl(''),
    term_ip: new FormControl(''),
    fee: new FormControl(''),
    link_v4_our: new FormControl(''),
    link_v4_your: new FormControl(''),
    link_v6_our: new FormControl(''),
    link_v6_your: new FormControl(''),
    open: new FormControl(),
    lock: new FormControl(),
    monitor: new FormControl()
  });
  public loading = true;
  public hide = false;
  public connection: any;
  public routers: any;
  public gatewayIPs: any;
  public routerID: any;
  public gatewayIPID: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.connectionService.get(this.id).then(response => {
      console.log(response);
      this.connection = response.connection[0];
      this.routerID = response.connection[0].router_id;
      this.gatewayIPID = response.connection[0].gateway_ip_id;
      console.log(this.routerID);
      this.connectionInput.patchValue({
        ID: response.connection[0].ID,
        group_id: response.connection[0].group_id,
        user_id: response.connection[0].user_id,
        network_id: response.connection[0].network_id,
        connection_number: response.connection[0].connection_number,
        router_id: response.connection[0].router_id,
        gateway_ip_id: response.connection[0].gateway_ip_id,
        open: response.connection[0].open,
        lock: response.connection[0].lock,
        monitor: response.connection[0].monitor,
      });
      console.log(this.connection);

      this.routerService.getAll().then((res1) => {
        console.log(res1);
        this.routers = res1.router;
        this.gatewayIPService.getAll().then((res2) => {
          console.log(res2);
          this.gatewayIPs = res2.gateway_ip;
          this.loading = false;
        });
      });
      this.commonService.openBar('OK', 5000);
    });
  }

  linkRouter(id: number): void {
    this.router.navigate(['/dashboard/gateway/' + id]).then();
  }

  linkGateway(id: number): void {
    this.router.navigate(['/dashboard/gateway/' + id]).then();
  }

  getRouterHostName(id: number): string {
    const tmp = this.routers.find(item => item.ID === id);
    return tmp.hostname;
  }

  getRouterEnable(id: number): string {
    const tmp = this.routers.find(item => item.ID === id);
    return tmp.enable;
  }

  getTunnelEndpointIP(id: number): string {
    const tmp = this.gatewayIPs.find(item => item.ID === id);
    return tmp.ip;
  }

  getTunnelEndpointEnable(id: number): string {
    const tmp = this.gatewayIPs.find(item => item.ID === id);
    return tmp.enable;
  }

  update(): void {
    console.log(this.routerID);
    console.log(this.gatewayIPID);
    this.connectionInput.patchValue({
      router_id: parseInt(this.routerID, 10),
      gateway_ip_id: parseInt(this.gatewayIPID, 10),
    });
    const json = JSON.stringify(this.connectionInput.getRawValue());
    console.log(json);
    this.connectionService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }
}
