import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {DataService} from "../../service/data.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  constructor(
    private dataService: DataService) {
  }

  data = new FormGroup({
    question: new FormControl(''),
    agreement: new FormControl(''),
    contract1: new FormControl(''),
    contract2: new FormControl(''),
    contact: new FormControl(''),
    subject: new FormControl(''),
  });

  ngOnInit(): void {
    this.dataService.getMailData().then(d => {
      this.data.setValue({
        question: d.data().question,
        agreement: d.data().agreement,
        contract1: d.data().contract1,
        contract2: d.data().contract2,
        contact: d.data().contact,
        subject: d.data().subject,
      })
    })
  }


  registrationMailData() {
    const doc = {}
    doc['question'] = this.data.value.question;
    doc['agreement'] = this.data.value.agreement;
    doc['contract1'] = this.data.value.contract1;
    doc['contract2'] = this.data.value.contract2;
    doc['contact'] = this.data.value.contact;
    doc['subject'] = this.data.value.subject;

    this.dataService.registrationMailData(doc).then();
  }

}
