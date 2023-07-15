import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';


@Injectable()
export class PackageService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    //  add Package 
    addPackage(token: any, userId: any,orgId: any, memId: any,inv_packaging_type: any,inv_packaging_qty: any,
        inv_prod_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_PACKAGING_ADD, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_packaging_type:inv_packaging_type,
            inv_packaging_qty:inv_packaging_qty,
            inv_prod_id:inv_prod_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
        //  add Package 
        updatePackage(token: any, userId: any,orgId: any, memId: any,inv_packaging_type: any,inv_packaging_qty: any,
            inv_packaging_id: any) {
            const reqheader = new HttpHeaders({ 'x-access-token': token });
            const Data = {
                process: this.config.INV_PACKAGING_UPDATE, plattype: this.config.PLATFORM_TYPE,
                userid: userId,
                org_id: orgId,
                mem_id: memId,
                inv_packaging_type:inv_packaging_type,
                inv_packaging_qty:inv_packaging_qty,
                inv_packaging_id:inv_packaging_id
            };
            return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
        }
    //  add Package 
    listPackages(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_PACKAGING_LIST, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listPackageByID(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any, inv_pkg_id:any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_PACKAGING_LIST, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id,
            inv_packaging_id:inv_pkg_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Package 
    deletePackage(token: any, userId: any,orgId: any, memId: any,inv_packaging_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_PACKAGING_DELETE, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_packaging_id:inv_packaging_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
}


