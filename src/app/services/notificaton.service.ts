import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class NotifyService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    getNotify(token: any, userId) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.NOTIFICATION_PROC_LIST, userid: userId, plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    getToken(token: any, userId, usertype) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.FIREBASE_PROC_GET_CUSTOM_TOKEN
            , usertype: usertype, userid: userId, plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    changeNotificationStatus(token: any, userId, usertype, notifications: any) {
        // console.log('n:', notifications);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.NOTIFICATION_PROC_UPDATE
            , usertype: usertype, userid: userId, notification_ids: notifications, plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
}