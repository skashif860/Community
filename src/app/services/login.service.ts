import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
    // Login
    sessionDetail(uid: string, Utype: string) {
      const reqheader = new HttpHeaders({'Content-Type': 'application/json' });
      const data = { process: this.config.LAST_LOGGED_IN, userid  : uid, usertype : Utype };
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // Session Time
    sessionTime(uid: string, Utype: string) {
      const reqheader = new HttpHeaders({'Content-Type': 'application/json' });
      const data = { process: this.config.LAST_ACTIVITY_HISTORY_ON_PORTAL, userid  : uid, usertype : Utype };
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    // Login
    login(uemail: string, pass: string) {
        const reqheader = new HttpHeaders({'Content-Type': 'application/json' });
        const data = { process: this.config.USER_LOGIN, useremail : uemail, loginpassword: pass, plattype: this.config.PLATFORM_TYPE };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      } 
 // Login
 socialLogin(Id: any, Name: string) {
  const reqheader = new HttpHeaders({'Content-Type': 'application/json' });
  const data = { process: this.config.SOCIAL_SIGNUP, id : Id, name: Name, plattype: this.config.PLATFORM_TYPE };
  return this.http.post(this.config.apiUrl, data, { headers: reqheader });
}
  // Register User
  registerSocialUser(AuthToken: any, FirstName: any, LastName: any, Id: any, Name: any, Email: any, PhotoUrl: any,
    Provider: any, timeZone: any) {
    const reqheader = new HttpHeaders({ 'Content-Type': 'application/json' });
    const Data = {
      process: this.config.SOCIAL_SIGNUP, authToken: AuthToken, c: FirstName, 
      lastName: LastName, id: Id, name: Name, email: Email, photoUrl: PhotoUrl, provider: Provider,
      sub_timezone: timeZone, usertype: 1, plateformtype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
  }

    // Forgot Password
    forgotPassword(email: string) {
        const reqheader = new HttpHeaders({'Content-Type': 'application/json'});
        const data = { process: this.config.FORGET_PASSWORD, useremail : email, platformtype: this.config.PLATFORM_TYPE };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    //  reset Password
    changePassword(email: string, code: any, newpass: string, confirmpass: string) {
        const reqheader = new HttpHeaders({'Content-Type': 'application/json' });
        const data = { process: this.config.RESET_PASSWORD, useremail : email, verificationcode: code,
          newpassword: newpass, confirmpassword: confirmpass};
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

     //  Change Password Profile
     changeUserPassword(userId: any, oldPassword: any, newpass: string, confirmpass: string, token: any) {
      const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
      const data = { process: this.config.CHANGE_PASSWORD, userid : userId, oldpassword: oldPassword,
        newpassword: newpass, confirmpassword: confirmpass, plattype: this.config.PLATFORM_TYPE};
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

    logout(userId: any,userType:any) {
    
      const reqheader = new HttpHeaders({ 'Content-Type': 'application/json' });
      const data = { process: this.config.USER_LOGOUT,userid : userId,usertype :userType};
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });

    }
    verifyPhoneNumber(Useremail: any, Verificationcode: any) {
      const reqheader = new HttpHeaders({'Content-Type': 'application/json' });
      const data = { process: this.config.MOBILE_ACCOUNT_VERIFICATION, useremail : Useremail,
        verificationcode: Verificationcode, plattype: this.config.PLATFORM_TYPE };
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    } 
}


