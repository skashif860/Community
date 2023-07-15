import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class RescueService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    getReports(token: string, user_id: any, org_id: any) {
        // console.log('inside reports');
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LIST_TRANSACTIONS, userid: user_id, orgid: org_id,
            plattype:this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getItemList(token: string, user_id: any) {
        // console.log('inside reports');
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config. LIST_ITEMS, userid: user_id,
            plattype:this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getTeamReport(token: string, user_id: any, team_id: any, org_id: any, from_date: any , to_date: any) {
        // console.log('inside reports');
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.GET_TEAM_ATTENDANCE_REPORT, userid: user_id, team_id: team_id,
            orgid:  org_id,
            fromdate: from_date, todate: to_date, plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
}


