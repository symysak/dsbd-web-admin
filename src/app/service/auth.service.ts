import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {CommonService} from "./common.service";
import {auth} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    private userService: UserService,
    private commonService: CommonService,
  ) {
    this.afAuth.authState
      .subscribe(user => this.user = user);
  }


  loginWithGoogle() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(r => {
        console.log('ID: ' + r.user.uid);
        this.loginProcess(r.user.uid);
      })
      .catch(error => this.loginFailedProcess(error));
  }

  loginFailedProcess(error): void {
    console.log(error);
    this.commonService.openBar('Failed login process... Error: ' + error, 4000);
  }


  loginProcess(uid: string): void {
    localStorage.clear();
    localStorage.setItem('authID', uid);
    this.router.navigate(['/dashboard']).then();
  }


  logOut(status: boolean): void {
    localStorage.clear();
    this.afAuth.signOut().then(() => {
      if (status) {
        this.commonService.openBar('Logout!。', 4000);
      }
      this.router.navigate(['/']).then();
    });
  }
}
