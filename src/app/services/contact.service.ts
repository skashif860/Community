import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class ContactService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    getContacts(token: any, userId: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.CONTACT_PROC_LIST_ALL, sub_id: userId, userid: userId,
            plattype: this.config.PLATFORM_TYPE,
        };
        //  console.log('req:', data);
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getContactById(token: any, userId: any, contact_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.CONTACT_PROC_BY_CONTACT_ID, sub_id: userId, userid: userId, contact_id: contact_id,
            plattype: this.config.PLATFORM_TYPE,
        };
        //  console.log('req:', data);
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    confirmContact(token: any, userId: any, contact_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.CONTACT_PROC_APPROVE, sub_id: userId, userid: userId, contact_id: contact_id,
            plattype: this.config.PLATFORM_TYPE,
        };
        //  console.log('req:', data);
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    deleteContactById(token: any, userId: any, contact_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.CONTACT_PROC_DELETE, sub_id: userId, userid: userId, contact_id: contact_id,
            plattype: this.config.PLATFORM_TYPE,
        };
        //  console.log('req:', data);
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    addContacts(token: any, userId: any, contact_name, contact_no) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.CONTACT_PROC_INVITE,
            contact_name: contact_name,
            contact_data: contact_no,
            sub_id: userId,
            userid: userId,
            plattype: this.config.PLATFORM_TYPE,
        };
        //  console.log('req:', data);
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
}
