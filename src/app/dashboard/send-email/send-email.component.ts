import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonService} from "../../service/common.service";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private commonService: CommonService,
    private dataService: DataService,
  ) {
  }

  auth = new FormGroup({
    user: new FormControl(''),
    pass: new FormControl(''),
  });
  content = new FormControl('')
  subject = new FormControl('');
  mail: string;
  genre: number;

  //1:question 2:agreement 3:contract1 4:contract2

  ngOnInit(): void {
    this.mail = this.route.snapshot.paramMap.get('mail');
    this.genre = parseInt(this.route.snapshot.paramMap.get('genre'));
    this.dataService.getMailData().then(d => {
      if (this.genre === 1) {
        this.content.setValue(d.data().question + '\n' + d.data().contact)
      } else if (this.genre === 2) {
        this.content.setValue(d.data().agreement + '\n' + d.data().contact)
      } else if (this.genre === 3) {
        this.content.setValue(d.data().contract1 + '\n' + d.data().contact)
      } else if (this.genre === 4) {
        this.content.setValue(d.data().contract2 + '\n' + d.data().contact)
      } else {
        this.content.setValue('\n' + d.data().contact)
      }
      this.subject.setValue(d.data().subject)
    })
  }

  sendMail() {
    const url: string = 'http://admin.local.bgp.ne.jp:8080/api/v1/mail';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        User: this.auth.value.user,
        Pass: this.auth.value.pass,
        // 'Accept': '*/*',
      })
    };
    const body: any = {
      to: this.mail,
      content: this.content.value,
      subject: this.subject.value
    };

    this.http.post<any>(url, body, httpOptions)
      .toPromise()
      .then();
  }

  sendTestMail() {
    const url: string = 'http://localhost:8080/api/v1/mail';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        User: this.auth.value.user,
        Pass: this.auth.value.pass,
        // 'Accept': '*/*',
      })
    };
    const body: any = {
      to: this.mail,
      content: this.content.value,
      subject: this.subject.value
    };

    this.http.post<any>(url, body, httpOptions)
      .toPromise()
      .then(d => this.commonService.openBar(d, 3000));
  }
}
