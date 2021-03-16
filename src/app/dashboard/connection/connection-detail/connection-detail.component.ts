import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConnectionService} from '../../../service/connection.service';

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
  ) {
  }

  public id: string;
  public connectionInput = new FormGroup({
    ID: new FormControl(),
    service_id: new FormControl(''),
    connection_template_id: new FormControl(Validators.pattern('^[0-9]*$')),
    connection_number: new FormControl(),
    noc_id: new FormControl(''),
    router_id: new FormControl(''),
    ntt_template_id: new FormControl(''),
    bgp_router_id: new FormControl(''),
    tunnel_endpoint_router_ip_id: new FormControl(''),
    term_ip: new FormControl(''),
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
  public services: any;
  public connections: any;
  public nocs: any;
  public templateTunnelEndPointRouterIP: any[] = [];
  public templates: any;
  public serviceCode: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.connectionService.get(this.id).then(response => {
      console.log(response);
      this.connection = response.connection[0];
      this.connectionInput.patchValue({
        ID: response.connection[0].ID,
        service_id: response.connection[0].service_id,
        connection_template_id: Number(response.connection[0].connection_template_id),
        connection_number: Number(response.connection[0].connection_number),
        noc_id: Number(response.connection[0].noc_id),
        router_id: response.connection[0].router_id,
        ntt_template_id: response.connection[0].ntt_template_id,
        bgp_router_id: response.connection[0].bgp_router_id,
        tunnel_endpoint_router_ip_id: response.connection[0].tunnel_endpoint_router_ip_id,
        open: response.connection[0].open,
        lock: response.connection[0].lock,
        monitor: response.connection[0].monitor,
      });
      this.loading = false;

      this.commonService.getTemplate().then(template => {
        this.templates = template;
        console.log(this.templates);
        for (const tmpNOC of this.templates.nocs) {
          for (const tmpEndPoint of tmpNOC.tunnel_endpoint_router) {
            for (const tmpEndPointIP of tmpEndPoint.tunnel_endpoint_router_ip) {
              console.log(tmpNOC.ID, tmpNOC.name);
              if (tmpNOC.enable && tmpEndPoint.enable && tmpEndPointIP.enable) {
                this.templateTunnelEndPointRouterIP.push({
                  ID: Number(tmpEndPointIP.ID),
                  noc: tmpNOC.name,
                  hostname: tmpEndPoint.hostname,
                  ip: tmpEndPointIP.ip,
                });
              }
            }
          }
        }
      });
      this.serviceCode = this.connection.service.group_id + '-' + this.connection.service.service_template.type +
        ('000' + this.connection.service.service_number).slice(-3);
    });
  }

  linkNOC(id: number): void {
    this.router.navigate(['/dashboard/noc/' + id]).then();
  }

  linkRouter(id: number): void {
    this.router.navigate(['/dashboard/gateway/' + id]).then();
  }

  linkGateway(id: number): void {
    this.router.navigate(['/dashboard/gateway/' + id]).then();
  }

  update(): void {
    console.log(this.connectionInput.value);
    const json = JSON.stringify(this.connectionInput.getRawValue());
    console.log(json);
    this.connectionService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }


}
