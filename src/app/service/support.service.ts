import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  websocket: WebSocket;
  chatMessage: any[] = [];

  constructor(
    public router: Router,
    private commonService: CommonService,
    private http: HttpClient) {
  }

  public openWebSocket(id) {
    this.websocket = new WebSocket(environment.websocket.url + environment.websocket.path + '/support' +
      '?id=' + id + '&user_token=' + sessionStorage.getItem('ClientID') + '&access_token=' +
      sessionStorage.getItem('AccessToken'));
    this.websocket.onopen = (event) => {
      console.log(event);
      this.chatMessage = [];
    };

    this.websocket.onmessage = (event) => {
      console.log(event);
      console.log(event.data);
      const json = JSON.parse(event.data);
      this.chatMessage.push({
        time: json.time,
        user_id: json.user_id,
        username: json.username,
        group_id: json.group_id,
        admin: json.admin,
        message: json.message
      });
    };
    this.websocket.onclose = (event) => {
      console.log(event);
    };
  }

  public sendMessage(message: string) {
    console.log(message);
    this.websocket.send(message);
  }

  public closeWebSocket() {
    this.websocket.close();
  }


  create(data): Promise<any> {
    return this.http.post(environment.api.url + environment.api.path + '/support',
      data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
        }),
      }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }

  update(id, data): Promise<any> {
    return this.http.put(environment.api.url + environment.api.path + '/support/' + id,
      data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
        }),
      }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }

  get(id): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/support/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      })
    }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }


  getAll(): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/support', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }
}
