import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
  }

  public openBar(message: string, time: number) {
    this.snackBar.open(message, 'done', {
      duration: time,
    });
  }

  // status information
  public getStatus(status: number) {
    let info = '';
    if (status === 0) {
      info = '新規申請中';
    } else if (status === 1) {
      info = '初期審査中';
    } else if (status === 2) {
      info = '初期審査完了';
    } else if (10 < status && status < 500) {
      if (status / 100 === 0) {
        info = '[新規]';
      } else if (status % 100 === 1) {
        info = '[追加]';
      } else if (status % 100 === 2) {
        info = '[変更]';
      }
      if (status % 100 / 10 === 1) {
        info += '(当団体から割当) ';
      } else if (status % 100 / 10 === 2) {
        info += '(PIアドレス) ';
      } else if (status % 100 / 10 === 5) {
        info += '(イレギュラー) ';
      }
      if (status % 10 === 1) {
        info += 'ユーザ記入段階';
      } else if (status % 10 === 2) {
        info += '審査';
      } else if (status % 10 === 3) {
        info += 'ユーザ側接続記入段階';
      } else if (status % 10 === 4) {
        info += '開通作業';
      }
    } else if (status === 500) {
      info = '開通';
    } else if (status === 1000) {
      info = 'Userによる廃止申請';
    } else if (status === 1100) {
      info = '運営委員による廃止申請';
    } else if (status === 1150) {
      info = '審査落ち';
    } else {
      info = '不明 (Status: ' + status + ')';
    }
    return info;
  }


  getService(): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/service', {
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

  getTemplate(): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/template', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      console.log(r);
      return response;
    }).catch(error => {
      console.log(error);
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }
}
