import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class DistributorService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    addDistributor(token: any, userId: any, orgId: any,distributorName: any, distributorContact: any,
        distributorEmail: any, distributorFax: any, distPocName: any, distPocEmail: any, distPocContact: any)  {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DISTRIBUTOR_PROC_ADD, plattype: this.config.PLATFORM_TYPE,
            org_id: orgId, userid: userId, distributor_name: distributorName, distributor_contact: distributorContact,
            distributor_email: distributorEmail,distributor_fax:distributorFax, dist_poc_name: distPocName,
            dist_poc_email:distPocEmail, dist_poc_contact: distPocContact
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    updareDistributor(token: any, userId: any, orgId: any,distributorName: any, distributorContact: any,
        distributorEmail: any, distributorFax: any, distPocName: any, distPocEmail: any, distPocContact: any, 
        distributorId: any)  {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DISTRIBUTOR_PROC_UPDATE, plattype: this.config.PLATFORM_TYPE,
            org_id: orgId, userid: userId, distributor_name: distributorName, distributor_contact: distributorContact,
            distributor_email: distributorEmail,distributor_fax:distributorFax, dist_poc_name: distPocName,
            dist_poc_email:distPocEmail, dist_poc_contact: distPocContact, distributor_id: distributorId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listAllDistributor(token: any, userId: any,orgId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DISTRIBUTOR_PROC_LIST, plattype: this.config.PLATFORM_TYPE,
            userid: userId, org_id: orgId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listDistributorById(token: any, userId: any, orgId: any, distributorId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DISTRIBUTOR_PROC_LIST_BY_ID, plattype: this.config.PLATFORM_TYPE,
            userid: userId,org_id:orgId, distributor_id: distributorId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    deleteDistributor(token: any, userId: any,orgId: any, distributorId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DISTRIBUTOR_PROC_DELETE, plattype: this.config.PLATFORM_TYPE,
            userid: userId,org_id: orgId, distributor_id: distributorId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

}


