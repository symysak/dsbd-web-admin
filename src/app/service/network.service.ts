import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from './common.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    public router: Router,
    private commonService: CommonService,
    private http: HttpClient
  ) {
  }

  create(id, body): Promise<any> {
    return this.http.post(environment.api.url + environment.api.path + '/group/' + id + '/network',
      body, {
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

  get(uid): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/network/' + uid, {
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

  getAll(): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/network', {
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

  update(uid, data): Promise<any> {
    return this.http.put(environment.api.url + environment.api.path + '/network/' + uid,
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
}

