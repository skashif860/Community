import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpHandler } from '@angular/common/http';

import { AppGlobal } from '../shared/app.global';



@Injectable()
export class RoutesService {
s
    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
    // Get Routes
    getRoutes(token: string, userId: string, orgId: string, memids: any, fromdate: any, todate: any, fromtime: any, totime: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.UL_PROC_GET_ROUTE_VIEW, userid: userId, plattype: this.config.PLATFORM_TYPE
            , org_id: orgId, mem_ids: memids, from_date: fromdate, to_date: todate, from_time: fromtime, to_time: totime
        };

        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // SITUATION_REPORT_LIST
    getSituationRport(token: string, userId: string, orgId: string) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.SITUATION_REPORT_LIST, userid: userId, plattype: this.config.PLATFORM_TYPE
            , orgid: orgId
        };

        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }


}
