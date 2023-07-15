import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable({
  providedIn: 'root'
})
export class TeamlocationService {

  constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
  // Get organization teams member locations
  getTeamLocation(token: string, userId: string, teamid: any, orgId: any) {
    const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.UL_PROC_GET_LAST_LOC_BY_TEAMID, userid: userId, team_id: teamid,  org_id: orgId , plattype: this.config.PLATFORM_TYPE};
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // Get list of organization teams
  getOrgTeams(token: string, userId: string, orgId: any ) {
    const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.VIEW_ORG_TEAMS, userid: userId, orgid: orgId , plattype: this.config.PLATFORM_TYPE};
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // Get User's time
  getUserTime(token: string, userId: string) {
    const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.GET_USER_CURRENT_TIME, userid: userId , plattype: this.config.PLATFORM_TYPE};
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  // ONLY Reruired
  // Get all members of organizations
  getAllOrgMembers(token: string, userId: string,  orgId: any) {
    const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
    // tslint:disable-next-line:max-line-length
    const data = { process: this.config.ALL_TEAM_MEMBERS, userid: userId , orgid: orgId, plattype: this.config.PLATFORM_TYPE};
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

}
