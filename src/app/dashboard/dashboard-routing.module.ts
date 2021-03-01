import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../guard/auth.guard';
import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {GroupComponent} from './group/group.component';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {TokenComponent} from './token/token.component';
import {SupportComponent} from './support/support.component';
import {ChatComponent} from './support/chat/chat.component';
import {ConnectionDetailComponent} from './connection/connection-detail/connection-detail.component';
import {ConnectionComponent} from './connection/connection.component';
import {NetworkDetailComponent} from './network/network-detail/network-detail.component';
import {NetworkComponent} from './network/network.component';
import {NoticeComponent} from './notice/notice.component';
import {NoticeDetailComponent} from './notice/notice-detail/notice-detail.component';
import {RouterComponent} from './router/router.component';
import {NocComponent} from './noc/noc.component';
import {RouterDetailComponent} from './router/router-detail/router-detail.component';
import {NocDetailComponent} from './noc/noc-detail/noc-detail.component';
import {GatewayComponent} from './gateway/gateway.component';
import {GatewayDetailComponent} from './gateway/gateway-detail/gateway-detail.component';
import {GatewayIpComponent} from './gateway-ip/gateway-ip.component';
import {GatewayIpDetailComponent} from './gateway-ip/gateway-ip-detail/gateway-ip-detail.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'user', pathMatch: 'full'},
      {path: 'notice', component: NoticeComponent},
      {path: 'notice/:id', component: NoticeDetailComponent},
      {path: 'token', component: TokenComponent},
      {path: 'group', component: GroupComponent},
      {path: 'group/:id', component: GroupDetailComponent},
      {path: 'connection', component: ConnectionComponent},
      {path: 'connection/:id', component: ConnectionDetailComponent},
      {path: 'network', component: NetworkComponent},
      {path: 'network/:id', component: NetworkDetailComponent},
      {path: 'support', component: SupportComponent},
      {path: 'support/:id', component: ChatComponent},
      {path: 'user', component: UserComponent},
      {path: 'user/:id', component: UserDetailComponent},
      {path: 'noc', component: NocComponent},
      {path: 'noc/:id', component: NocDetailComponent},
      {path: 'router', component: RouterComponent},
      {path: 'router/:id', component: RouterDetailComponent},
      {path: 'gateway', component: GatewayComponent},
      {path: 'gateway/:id', component: GatewayDetailComponent},
      {path: 'gateway_ip', component: GatewayIpComponent},
      {path: 'gateway_ip/:id', component: GatewayIpDetailComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
