import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';
import { TEMPLATE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  // Get member tree
  getTeamsTree(token: string, user_id: any, orgID: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.VIEW_TEAMS_TREE_LISTING,
      userid: user_id, orgid: orgID, plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
  // Get list of org's  Teams
  getOrgTeams(token: string, userId: string, orgid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = { process: this.config.VIEW_ALL_TEAMS, userid: userId, orgid: orgid, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // Modify Team
  editTeam(token: string, userId: string, orgid: any, team_data) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.UPDATE_TEAM, userid: userId, orgid: orgid,
      teamid: team_data.team_id, teamname: team_data.team_name, teamdesc: team_data.team_desc,
      plattype: this.config.PLATFORM_TYPE, loc_lat: team_data.lat, loc_lng: team_data.long
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // Modify Team
  deleteTeam(token: string, userId: string, orgid: any, team_data: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.DELETE_TEAM, userid: userId, orgid: orgid,
      teamid: team_data, plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // get Team Members
  getTeamMembers(token: string, userId: string, orgid: any, team_id: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.VIEW_TEAM_MEMBERS, userid: userId, orgid: orgid,
      teamid: team_id, plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // remove specific team member from team
  deleteTeamMember(token: string, userId: string, member_id: any, team_id: any, subid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.REMOVE_TEAM_MEMBER, userid: userId, sub_id: subid,
      teamid: team_id, teammemberid: member_id, plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // get detail of  specific  team
  getTeamDetail(token: string, userId: string, team_id: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.VIEW_TEAM, userid: userId,
      teamid: team_id, plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // add team
  addTeam(token: string, userId: string, orgid: any, team_data: any, memId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.ADD_TEAM,
      userid: userId,
      orgid: orgid,
      loc_lat: team_data.lat,
      loc_lng: team_data.long,
      teamname: team_data.team_name,
      teamdesc: team_data.team_desc,
      teamcreatorid: memId,
      teamadminid: memId,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // add Sub team
  adSubTeam(token: string, userId: string, orgid: any, team_data: any, parentteamid: any, memId: any
  ) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.ADD_TEAM,
      userid: userId,
      orgid: orgid,
      loc_lat: team_data.lat,
      loc_lng: team_data.long,
      teamname: team_data.team_name,
      teamdesc: team_data.team_desc,
      teamcreatorid: memId,
      teamadminid: memId,
      parent_team_id: parentteamid,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // View Sub team
  viewSubTeam(token: string, userId: string, orgId: any, parentteamid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.VIEW_ORG_TEAMS, userid: userId, parent_team_id: parentteamid, orgid: orgId,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // View Sub team
  viewChaildTeam(token: string, userId: string, orgId: any, parentteamid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.VIEW_CHILD_TEAMS, userid: userId, parent_team_id: parentteamid, orgid: orgId,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // add team
  addMembertoTeam(token: string, userId: string, team_id: any, mem_id: any, subid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.ADD_TEAM_MEMBER, userid: userId, teamid: team_id, teammemberid: mem_id,
      plattype: this.config.PLATFORM_TYPE, sub_id: subid
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
      shiftlocradius: shiftlocRadiuss, enforceloc: enforceLoc, fromdat: fromDate, todate: toDate, shiftdays: shiftDays,
      shiftappliedto: 2, shiftappliedtoid: shiftappliedtoId, plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  //
  viewApplyShift(token: string, userId: string, orgId: any, teamid: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.VIEW_APPLIED_SHIFT, userid: userId, orgid: orgId, team_id: teamid,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // get detail of  specific  team
  detachShift(token: string, userId: string, shiftId: any, orgId: any, teamId: any) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    const data = {
      process: this.config.DETACH_TEAM_SHIFT, userid: userId, shiftid: shiftId, orgid: orgId, team_id: teamId,
      plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }
  // Get User's time
  getUserTime(token: string, userId: string) {
    const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.GET_USER_CURRENT_TIME, userid: userId, plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }




}
