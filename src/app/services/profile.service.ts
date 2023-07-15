import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';


@Injectable()
export class ProfileService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    // Update Profile
    // , files: File
    //  file: files,
    updateProfile(token: string, formData: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        // const data = {
        //     process: this.config.UPDATE_USER_PROFILE, userid: uid, userdob: userDOB, usergender: userGender,
        //     usermsisdn: userMsisdn, file: userImage, plattype: this.config.PLATFORM_TYPE
        // };
        return this.http.post(this.config.apiUrl, formData, { headers: reqheader });
    }

    // View User Profile
    viewProfile(token: string, uid: string) {
        console.log(token, uid);
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = { process: this.config.VIEW_USER_PROFILE, userid: uid, plattype: this.config.PLATFORM_TYPE };
        console.log(data);
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getTimeZones(userId: any, token: any) {
        const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
        const data = { process: this.config.ALL_TIMEZONE, userid: userId, plattype: this.config.PLATFORM_TYPE};
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      }
}


