import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

  // Get member tree
  getMemberTree(token: string, userId: string, orgID: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = { process: this.config.GET_MEMBERS_TREE, userid: userId, org_id: orgID, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // Get list of org's  members
  getSubMembers(token: string, userId: string, orgID: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = { process: this.config.LIST_ALL_ORG_MEMBERS, userid: userId, org_id: orgID, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // get detail of org's member
  getMemberDetailByid(token: string, userId: string, memberId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.LIST_ORG_MEMBERS_BY_ID, userid: userId, org_member_id: memberId, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // get detail of Member's Teams
  getMemberTeams(token: string, userId: string, memberId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.TEAMS_BY_MEMBER_ID, userid: userId, teammemberid: memberId, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // remove member from the team
  removeTeamMember(token: string, userId: string, memberId: any, teamId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.REMOVE_TEAM_MEMBER, userid: userId, teammemberid: memberId, teamid: teamId, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // remove member from the org
  removeOrgMember(token: string, userId: string, memberId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.REMOVE_ORG_MEMBERS_BY_ID, userid: userId, org_member_id: memberId, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // View Org Roles
  getOrgRoles(token: string, userId: string, orgId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });

    const data = { process: this.config.VIEW_ORG_ROLES, userid: userId, orgid: orgId, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  updateOrgRoles(token: string, userId: string, memberid: any, memdesignation: any, memberroleid: any,
     memname: any, reportingto: any, employeid: any, cvId: any, cityID:any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.UPDATE_ORG_MEMBER, userid: userId, member_id: memberid,reporting_to: reportingto,employe_id:employeid, 
      mem_designation: memdesignation, member_role_id: memberroleid, mem_name: memname, cv_id: cvId,
      city_id:cityID, plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // sendInvite(token: string, userId: string, invitedemail: any, inviteeorgid: any, inviteesubid: any, addedbyid: any,
  //   memname: any, memdesignation: any, reportingto: any, memberroleid: any) {
  //   const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
  //   const data = {
  //     process: this.config.SEND_INVITATION, userid: userId, invited_email: invitedemail,
  //     invitee_org_id: inviteeorgid, invitee_sub_id: inviteesubid, added_by_id: addedbyid,
  //     mem_name: memname, mem_designation: memdesignation, reporting_to: reportingto, member_role_id: memberroleid,
  //     plattype: this.config.PLATFORM_TYPE
  //   };
  //   return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  // }

  sendInvite(token: string, userId: string, invitedemail: any, inviteeorgid: any, inviteesubid: any, addedbyid: any,
    memname: any, memdesignation: any, reportingto: any, memberroleid: any, employe_Id: any, cvId: any, city_id:any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.SEND_INVITATION, userid: userId, invited_email: invitedemail, cv_id: cvId,
      invitee_org_id: inviteeorgid, invitee_sub_id: inviteesubid, added_by_id: addedbyid,
      mem_name: memname, mem_designation: memdesignation, reporting_to: reportingto, member_role_id: memberroleid,
      employe_id: employe_Id, city_id:city_id,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // View Sub team
  updateMemeberRole(token: string, userId: string, issupervisor: any, teammemberId: any, teamId:any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.UPDATE_TEAM_MEMBER_ROLE, userid: userId, teammemberid: teammemberId,teamid:teamId,  
       is_supervisor: issupervisor,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  accptInvite(verifiCationcode: any) {
    const reqheader = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      process: this.config.ACCEPT_INVITATION, verificationcode: verifiCationcode,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  rejectInvite(verifiCationcode: any) {
    const reqheader = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      process: this.config.REJECT_INVITATION, verificationcode: verifiCationcode
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  resendInvite(userId: any, token: any, invitedemail: any, memberid: any, org_id: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.RESEND_INVITATION, member_id: memberid,
      invited_email: invitedemail, userid: userId, plattype: this.config.PLATFORM_TYPE, invitee_org_id: org_id
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  addInviteSubscriber(verifiCationcode: any, subusername: any, subfullname: any, newpass: any, cpass: any) {
    const reqheader = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      process: this.config.ADD_INVITED_SUBSCRIBER, verificationcode: verifiCationcode, sub_username: subusername,
      sub_fullname: subfullname, plattype: this.config.PLATFORM_TYPE, confirmpassword: cpass, newpassword: newpass
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  listInvitationMem(token: string, userId: string) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.LIST_MEM_INVITATIONS, userid: userId, usertype: 0,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  acceptMemIvitation(token: string, userId: string, invite_Id: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.ACCEPT_INVITATION, userid: userId, usertype: 0, invite_id: invite_Id,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  rejectMemIvitation(token: string, userId: string, invite_Id: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.REJECT_INVITATION, userid: userId, usertype: 0, invite_id: invite_Id,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // APPLY_SHIFT
  applyShift(token: string, userId: string, orgId: any, shiftappliedtoId: any, shiftlocId: any,
    shiftlocRadiuss: any, enforceLoc: any, fromDate: any,
    toDate: any, shiftDays: any) {
   console.log(shiftlocRadiuss);
   const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
   const data = {
     process: this.config.APPLY_SHIFT, userid: userId, orgid: orgId, shiftlocid: shiftlocId,
     shiftlocradius: shiftlocRadiuss, enforceloc: enforceLoc, fromdate:fromDate, todate: toDate, shiftdays: shiftDays,
     shiftappliedto: 3, shiftappliedtoid: shiftappliedtoId, plattype: this.config.PLATFORM_TYPE
   };
   return this.http.post(this.config.apiUrl, data, { headers: reqheader });
 }

  viewApplyShift(token: string, userId: string, orgId: any, memberId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.VIEW_APPLIED_SHIFT, userid: userId, orgid: orgId, memberid: memberId,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  detachShift(token: string, userId: string, shiftgroupId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.DETACH_SHIFT, userid: userId, shiftgroupid: shiftgroupId,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  listInvitationMemContact(token: string, userId: string) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.CONTACT_PROC_LIST_ALL, sub_id: userId, userid: userId,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  approveContact(token: string, userId: string, contactsubid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.CONTACT_PROC_APPROVE, sub_id: userId, userid: userId, contact_sub_id: contactsubid,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  rejectContact(token: string, userId: string, contactsubid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.CONTACT_PROC_REJECT, sub_id: userId, userid: userId, contact_sub_id: contactsubid,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  deleteContact(token: string, userId: string, contactsubid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.CONTACT_PROC_DELETE, sub_id: userId, userid: userId, contact_sub_id: contactsubid,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  getRoleAccess(token: string, userId: string, orgID: any, orgMmberid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.GET_MEMBER_MODULE_ACCESS, userid: userId, orgid: orgID, orgmemberid: orgMmberid,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
}
