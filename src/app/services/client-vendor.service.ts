import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class ClientVendorService {

    constructor(private http: HttpClient, private config: AppGlobal) { }


    addClientVendor(userID: any, token: any, Client_Orgid, Vendor_Orgid, Client_Name, Vendor_Name, Extra_Info) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.ADD_CLIENT_VENDOR,
            userid: userID,
            plattype: this.config.PLATFORM_TYPE,
            client_orgid: Client_Orgid,
            vendor_orgid: Vendor_Orgid,
            client_name: Client_Name,
            vendor_name: Vendor_Name,
            extra_info: Extra_Info,
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    listClientVendor(token: any, userID: any, org_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LIST_ALL_CV_ORG,
            userid: userID,
            orgid: org_id,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });

    }

    getClientVendorById(token: any, userID: any, CV_Id: any, org_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LIST_CV_BY_ID,
            userid: userID,
            cv_id: CV_Id,
            orgid: org_id,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });

    }
    updateClientVendor(userID: any, token: any, ID: any, Client_Orgid, Vendor_Orgid, Client_Name, Vendor_Name, Extra_Info) {
        const reqheader = new HttpHeaders({ 'x-access-token': token, 'Content-Type': 'application/json' });
        const data = {
            process: this.config.UPDATE_CLIENT_VENDOR,
            userid: userID,
            plattype: this.config.PLATFORM_TYPE,
            client_orgid: Client_Orgid,
            vendor_orgid: Vendor_Orgid,
            client_name: Client_Name,
            vendor_name: Vendor_Name,
            extra_info: Extra_Info,
            cv_id: ID,
            debug: true
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    deleteClientVendor(token: any, userID: any, CV_Id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.DELETE_CLIENT_VENDOR,
            userid: userID,
            cv_id: CV_Id,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
}