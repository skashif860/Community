import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class OrgService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    // Add Org
    addOrganization(token: string, Data: any) {
        const reqheader = new HttpHeaders({'x-access-token': token });
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
      }

    editOrganization(token: string, formData: any) {
      const reqheader = new HttpHeaders({ 'x-access-token': token});
      return this.http.post(this.config.apiUrl, formData, { headers: reqheader });
    }

    // View User Organization
    viewUserOrganization(token: string, userId: string) {
        // console.log(token, userId);
        const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
        const data = { process: this.config.LIST_ALL_MEMBER_ORG, sub_id: userId,userid: userId, plattype: this.config.PLATFORM_TYPE};
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      }

    // View Organization
    getOrgById(orgId: any, token: any, userId: any) {
        // console.log('service:' + orgId + '|' + token  + '|' + userId);
        const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
        const data = { process: this.config.VIEW_ORG, userid: userId , orgid: orgId, plattype: this.config.PLATFORM_TYPE};
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      }

    // Edit Organization
    deleteOrganization(orgId: any, token: any, userId: any) {
        const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
        const data = { process: this.config.DELETE_ORG, userid: userId , orgid: orgId, plattype: this.config.PLATFORM_TYPE};
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      }

    // get countryList
    getCountryList(userId: any, token: any) {
      const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
      const data = { process: this.config.ALL_COUNTRIES, userid: userId, plattype: this.config.PLATFORM_TYPE};
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    // get timezones
    getTimeZones() {
      const reqheader = new HttpHeaders({'Content-Type': 'application/json' });
      const data = { process: this.config.ALL_TIMEZONE, plattype: this.config.PLATFORM_TYPE};
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

       // get timezones
    getUserTimeZones(userId: any, token: any) {
      const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
      const data = { process: this.config.ALL_TIMEZONE, userid: userId, plattype: this.config.PLATFORM_TYPE};
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    // get timezones
    getIndustry(userId: any, token: any) {
      const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
      const data = { process: this.config.ALL_INDUSTRIES, userid: userId, plattype: this.config.PLATFORM_TYPE};
      return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
       // get timezones
       addMeta(userId: any, token: any, extrainfo: any, orgId: any) {
        const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
        const data = { process: this.config.ADD_ORG_META, userid: userId, plattype: this.config.PLATFORM_TYPE
          ,extra_info: extrainfo, orgid: orgId};
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
      }
        // get timezones
        getMeta(userId: any, token: any, orgId: any) {
          const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
          const data = { process: this.config.GET_ORG_META, userid: userId, plattype: this.config.PLATFORM_TYPE
            ,orgid: orgId};
          return this.http.post(this.config.apiUrl, data, { headers: reqheader });
        }
        // get stats
        getStats(userId: any, token: any, orgId: any) {
          const reqheader = new HttpHeaders({'x-access-token': token, 'Content-Type': 'application/json' });
          const data = { process: 'TRANSACTION_STATS', userid: userId, plattype: this.config.PLATFORM_TYPE
            ,orgid: orgId};
          return this.http.post(this.config.apiUrl, data, { headers: reqheader });
        }
}


