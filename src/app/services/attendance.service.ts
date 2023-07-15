import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class AttendanceService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    getStats(token: any, userId: any, org_Id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.GET_EVENTS_COUNTS, userid: userId, orgid: org_Id,
            plattype: this.config.PLATFORM_TYPE,
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    getAttendanceLog(token: any, userId: any, org_Id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.VIEW_ORG_ATTENDANCE_LOG, userid: userId, orgid: org_Id,
            plattype: this.config.PLATFORM_TYPE,
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getEventDetail(token: any, userId: any, org_Id: any, type: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.GET_EVENTS_DETAILS, userid: userId, orgid: org_Id, eventtype: type,
            plattype: this.config.PLATFORM_TYPE,
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
}
