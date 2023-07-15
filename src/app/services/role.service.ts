import { debug } from 'util';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    getRoleAccess(token: string, userId: string, orgID: any, orgMmberid:  any) {
        console.log('hello:');
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = { process: this.config.GET_MEMBER_MODULE_ACCESS, userid: userId, orgid: orgID, orgmemberid: orgMmberid,
           plattype: this.config.PLATFORM_TYPE };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      }
}
