import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';




@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private config: AppGlobal) { }


    isAuthenticated(userID: any, token: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = { process: this.config.CHECK_SESSION_STATUS, userid: userID, plattype: this.config.PLATFORM_TYPE };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });


    }


}