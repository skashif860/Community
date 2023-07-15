import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpHandler } from '@angular/common/http';

import { AppGlobal } from '../shared/app.global';



@Injectable()
export class VisitService {
    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
    addVisit(token: any, userId: any, orgId: any, foreignId: any, foreignType: any, locId: any, visitTitle: any,
        visitDesc: any, memberIds: any, agendaTitle: any, agendaDesc: any, schedType: any, schedValue: any,
        fromdatetime: any, todatetime: any, scheddt: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ADD_VISIT, plattype: this.config.PLATFORM_TYPE,
            org_id: orgId, userid: userId, foreign_id: foreignId, foreign_type: foreignType,
            loc_id: locId, visit_title: visitTitle, visit_desc: visitDesc, member_ids: memberIds,
            agenda_title: agendaTitle, agenda_desc: agendaDesc, whichapp: 'security',
            sched_type: schedType, sched_value: schedValue, fromdate_time: fromdatetime,
            todate_time: todatetime, sched_dt: scheddt
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    addVisitAgenda(token: any, userId: any, visit_id: any, agenda_title: any, agenda_desc: any, mem_id: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ADD_AGENDA, plattype: this.config.PLATFORM_TYPE,
            userid: userId, visit_id: visit_id, agenda_title: agenda_title, agenda_desc: agenda_desc, mem_id: mem_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listVisitByVisitID(token: any, userId: any, visit_id: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.GET_VISIT_DETAILS_BY_ID, plattype: this.config.PLATFORM_TYPE,
            userid: userId, visit_id: visit_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    getVisit(token: any, userId: any, org_id: any, mem_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.VIEW_VISIT_BY_MEMBER_ID, plattype: this.config.PLATFORM_TYPE,
            userid: userId, org_id: org_id, mem_id: mem_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    //  function to update basic visit info
    updateVisitBasicInfo(token: any, userId: any, visit_id: any, formData: any, days: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.UPDATE_SCHEDULE, plattype: this.config.PLATFORM_TYPE,
            userid: userId, visit_id: visit_id,
            visit_title: formData.visitTitle,
            visit_desc: formData.visitDesc,
            sched_type: formData.visitRepeat,
            sched_value: days,
            sched_dt: formData.VisitrepeatEndDate,
            todate_time: formData.visitEdt,
            fromdate_time: formData.visitSdt,
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    //  function to update AGenda
    updateAgenda(token: any, userId: any, agenda_id: any, agenda_title: any, memberId: any, visit_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.UPDATE_AGENDA, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            visit_agenda_id: agenda_id,
            agenda_title: agenda_title,
            mem_id: memberId,
            visit_id: visit_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    //  function to add agenda again from internal form edit
    addAgendaAgain(token: any, userId: any, visit_id: any, agenda_title: any, memberId: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ADD_AGENDA, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            visit_id: visit_id,
            agenda_desc: agenda_title,
            agenda_title: agenda_title,
            mem_id: memberId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  function to delete AGenda
    deleteAgenda(token: any, userId: any, agenda_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DELETE_AGENDA, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            visit_agenda_id: agenda_id,
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    //  function to update team lead in attendee list
    updateTeamLead(token: any, userId: any, attendeeID: any, isTeamLead: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.UPDATE_ATTENDEE, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            attend_id: attendeeID,
            mem_type: isTeamLead
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    // function to delete Attendee
    deleteAttende(token: any, userId: any, attendeeID: any, visit_id: any, mem_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DELETE_ATTENDEES, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            attend_id: attendeeID,
            mem_id: mem_id,
            visit_id: visit_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    //  add attendee 
    addAttendee(token: any, userId: any, attendeeID: any, isTeamLead: any, visit: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ADD_ATTENDEES, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            visit_id: visit,
            mem_id: attendeeID,
            mem_type: isTeamLead
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    //  update doctor
    updateVisitDoc(token: any, userId: any, doc_id: any, loc_id: any, visit: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.UPDATE_VISIT_DOCTOR_LOC, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            visit_id: visit,
            loc_id: loc_id,
            foreign_id: doc_id,
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    getOrgVisit(token: any, userId: any, org_id: any, mem_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.VIEW_ALL_ORGANIZATION_VISIT, plattype: this.config.PLATFORM_TYPE,
            userid: userId, org_id: org_id, mem_id: mem_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    // delete visit
    deleteVisit(token: any, userId: any, visit_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DELETE_VISIT, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            visit_id: visit_id,
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    visitNote(token: any, userId: any, visit_id: any, mem_id: any, visit_agenda_id: any, comment: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ADD_NOTE, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            visit_id: visit_id,
            mem_id: mem_id,
            visit_agenda_id: visit_agenda_id,
            note_desc: comment
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    getMemberVisits(token: string, userId: string, orgid: any, member_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
          process: this.config.VIEW_VISIT_BY_MEMBER_ID, userid: userId, org_id: orgid,
          mem_id: member_id, plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      }
}
