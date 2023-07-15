import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

  // Register User
  registerUser(data) {
    const reqheader = new HttpHeaders({ 'Content-Type': 'application/json' });
    const Data = {
      process: this.config.ADD_USER, loginusername: data.Uname, useremail: data.Email,
      plateformtype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
  }

  // Verify User
  verifyUser(User: any) {
    console.log(User);
    const reqheader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    const data = {
      process: this.config.NEW_ACCOUNT_VERIFICATION, useremail: User.email,
      verificationcode: User.code
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // Set Password
  setPassword(email: string, newpass: string, confirmpass: string, timezone) {
    console.log(timezone);
    const reqheader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'application/json' });
    const data = {
      process: this.config.SET_PASSWORD, useremail: email,
      newpassword: newpass, confirmpassword: confirmpass, usertimezone: timezone
    };
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
}


