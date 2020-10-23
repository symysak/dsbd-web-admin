import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../guard/auth.guard';
import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {MailComponent} from './mail/mail.component';
import {SendEmailComponent} from './send-email/send-email.component';
import {GroupComponent} from './group/group.component';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {TokenComponent} from './token/token.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'user', pathMatch: 'full'},
      {path: 'mail', component: MailComponent},
      {path: 'sendmail/:mail/:genre', component: SendEmailComponent},
      {path: 'token', component: TokenComponent},
      {path: 'group', component: GroupComponent},
      {path: 'group/:id', component: GroupDetailComponent},
      {path: 'user', component: UserComponent},
      {path: 'user/:id', component: UserDetailComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
