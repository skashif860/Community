import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';


@Injectable()
export class MetaService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    //  add Batch 
    addMeta(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any, inv_packaging_id:any,
        inv_batch_id: any, inv_meta_value: any,
        lu_meta_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_META_ADD,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id,
            inv_packaging_id:inv_packaging_id,
            inv_batch_id: inv_batch_id,
            inv_meta_value: inv_meta_value,
            lu_meta_id:lu_meta_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Batch 
    addMetaHead(token: any, userId: any,orgId: any, memId: any,module_id: any,
        lu_meta_head: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ADD_LU_META,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            orgid: orgId,
            mem_id: memId,
            module_id:module_id,
            lu_meta_head: lu_meta_head

        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Batch 
    listMetaHead(token: any, userId: any,orgId: any, memId: any,module_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ALL_LU_META,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            orgid: orgId,
            mem_id: memId,
            module_id:module_id,

        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Batch 
    listMetaAlls(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_META_LIST,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Batch 
    updateMetaOfProduct(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any, inv_packaging_id:any,
        inv_batch_id: any, inv_meta_value: any,
        lu_meta_id: any, inv_meta_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_META_UPDATE,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id,
            inv_packaging_id:inv_packaging_id,
            inv_batch_id: inv_batch_id,
            inv_meta_value: inv_meta_value,
            lu_meta_id:lu_meta_id,
            inv_meta_id: inv_meta_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Batch 
    deleteMetaOfProduct(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any,
        inv_meta_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_META_DELETE,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id,
            inv_meta_id: inv_meta_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Package 
    // deleteBatch(token: any, userId: any,orgId: any, memId: any,inv_batch_id: any) {
    //     const reqheader = new HttpHeaders({ 'x-access-token': token });
    //     const Data = {
    //         process: this.config.INV_BATCH_DELETE, plattype: this.config.PLATFORM_TYPE,
    //         userid: userId,
    //         org_id: orgId,
    //         mem_id: memId,
    //         inv_batch_id:inv_batch_id
    //     };
    //     return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    // }

}


