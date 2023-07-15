import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';


@Injectable()
export class ShiftsService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
    // ADD_ORG_SHIFT
    addUserShift(token: string, userId: string, orgId: string, shiftName: string, shiftDesc: string,
        shiftStart: any, shiftEnd: any, shiftWriter: string, shiftDays: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.ADD_ORG_SHIFT, userid: userId, plattype: this.config.PLATFORM_TYPE
            , orgid: orgId, shiftname: shiftName, shiftdesc: shiftDesc,
            shiftstart: shiftStart, shiftend: shiftEnd, shiftwriter: shiftWriter
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // VIEW_ORG_SHIFTS ALL
    viewOrgShift(token: string, userId: string, orgId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.VIEW_ORG_SHIFTS, userid: userId, plattype: this.config.PLATFORM_TYPE, orgid: orgId
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // View Specific Shift
    viewShift(token: string, userId: string, shiftId: string) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.VIEW_SHIFT, userid: userId, plattype: this.config.PLATFORM_TYPE, shiftid: shiftId
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // Update_ORG_SHIFT
    updateOrgShift(token: string, userId: string, orgId: string, shiftName: string, shiftDesc: string,
        shiftStart: any, shiftEnd: any, shiftWriter: string,  shiftId: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.UPDATE_ORG_SHIFT, userid: userId, plattype: this.config.PLATFORM_TYPE
            , orgid: orgId, shiftname: shiftName, shiftdesc: shiftDesc,
            shiftstart: shiftStart, shiftend: shiftEnd, shiftwriter: shiftWriter,
            shiftid: shiftId
        };

        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // DELETE ORGNIZATION SHIFT
    deleteOrganizationShift(orgId: any, token: any, userId: any, ShiftId: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.DELETE_ORG_SHIFT, shiftid: ShiftId,
            userid: userId, orgid: orgId, plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    // ADD BREAK
    addBreak(token: string, userId: string, orgId: any, breakName: string, breakDesc: any,
        breakStart: any, breakEnd: any, timeDuration: any, breakShiftId: string, isPaid: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.ADD_BREAK, userid: userId, plattype: this.config.PLATFORM_TYPE
            , orgid: orgId, breakname: breakName, breakdesc: breakDesc,
            breakstart: breakStart, breakend: breakEnd, breakshiftid: breakShiftId, ispaid: isPaid, breakduration: timeDuration
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // View BREAK All
    viewBreakAll(token: string, userId: string, shiftId: string) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.VIEW_SHIFT_BREAKS, userid: userId, plattype: this.config.PLATFORM_TYPE, breakshiftid: shiftId
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // Delete BREAK
    deleteBreak(token: string, userId: string, orgId: string, breakId: string) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.DELETE_BREAK, userid: userId, plattype: this.config.PLATFORM_TYPE, orgid: orgId, breakid: breakId
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // View Specific Break
    viewBreakOne(token: string, userId: string, breakId: string) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.VIEW_BREAK, userid: userId, plattype: this.config.PLATFORM_TYPE, breakid: breakId
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // UPDATE SPECIFIC BREAK
    updateBreak(token: string, userId: string, breakId: any, breakName: string, breakDesc: any,
        breakStart: string, breakEnd: string, breakShiftId: string, isPaid: any, breakDuration: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.UPDATE_BREAK, userid: userId, plattype: this.config.PLATFORM_TYPE
            , breakid: breakId, breakname: breakName, breakdesc: breakDesc,
            breakstart: breakStart, breakend: breakEnd, breakshiftid: breakShiftId, ispaid: isPaid, breakduration: breakDuration
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // LIst Teams By shift Id , Apply on Teams
    listTeamsOfShift(token: string, userId: string, shiftid:any ) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.TEAMS_BY_SHIFT_ID, userid: userId, plattype: this.config.PLATFORM_TYPE
            , shiftid: shiftid
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // LIst Teams By shift Id , Apply on Teams
    listMembersOfShift(token: string, userId: string, shiftid:any ) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.MEMBERS_BY_SHIFT_ID, userid: userId, plattype: this.config.PLATFORM_TYPE
            , shiftid: shiftid
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
}


