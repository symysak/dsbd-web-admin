import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SupportService} from '../../../service/support.service';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {


  public comment = new FormControl();
  public ticketID: number;
  public ticket: any;
  public chat: any[] = [];
  public user: any[] = [];
  public loading = true;
  public myName = sessionStorage.getItem('name');

  constructor(
    public supportService: SupportService,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.supportService.chatMessage = null;
    this.ticketID = +this.route.snapshot.paramMap.get('id');
    this.supportService.openWebSocket(this.ticketID);
    this.supportService.get(this.ticketID).then(response => {
      this.ticket = response.ticket;
      this.chat = response.ticket[0].chat;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.supportService.closeWebSocket();
  }

  getStringFromDate(before: string): string {
    const dateJST = new Date(Date.parse(before));
    return dateJST.getFullYear() + '-' + ('0' + (1 + dateJST.getMonth())).slice(-2) + '-' +
      ('0' + dateJST.getDate()).slice(-2) + ' ' + ('0' + dateJST.getHours()).slice(-2) + ':' +
      ('0' + dateJST.getMinutes()).slice(-2) + ':' + ('0' + dateJST.getSeconds()).slice(-2);
  }

  public sendMessage() {
    const body = {
      user_token: sessionStorage.getItem('ClientID'),
      access_token: sessionStorage.getItem('AccessToken'),
      message: this.comment.value
    };
    this.supportService.sendMessage(JSON.stringify(body));
    this.comment.setValue('');
  }
}
