import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';


@Injectable()
export class BatchService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    //  add Batch 
    addBatch(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any,
        inv_packaging_id: any,inv_batch_no: any, inv_batch_name: any, inv_batch_price_unit:any,
        inv_batch_price_dist:any, inv_batch_price_reseller: any, inv_batch_sro: any,
        inv_batch_date_prod: any, inv_batch_date_exp: any, inv_batch_qty: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_BATCH_ADD,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id,
            inv_packaging_id:inv_packaging_id,
            inv_batch_no:inv_batch_no,
            inv_batch_name:inv_batch_name,
            inv_batch_price_unit: inv_batch_price_unit,
            inv_batch_price_dist:inv_batch_price_dist,
            inv_batch_price_reseller:inv_batch_price_reseller,
            inv_batch_sro: inv_batch_sro,
            inv_batch_date_prod:inv_batch_date_prod,
            inv_batch_date_exp:inv_batch_date_exp,
            inv_batch_qty: inv_batch_qty
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
     //  add Batch 
     updateBatch(token: any, userId: any,orgId: any, memId: any,inv_batch_id: any,
        inv_packaging_id: any,inv_batch_no: any, inv_batch_name: any, inv_batch_price_unit:any,
        inv_batch_price_dist:any, inv_batch_price_reseller: any, inv_batch_sro: any,
        inv_batch_date_prod: any, inv_batch_date_exp: any, inv_batch_qty: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_BATCH_UPDATE,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_batch_id:inv_batch_id,
            inv_packaging_id:inv_packaging_id,
            inv_batch_no:inv_batch_no,
            inv_batch_name:inv_batch_name,
            inv_batch_price_unit: inv_batch_price_unit,
            inv_batch_price_dist:inv_batch_price_dist,
            inv_batch_price_reseller:inv_batch_price_reseller,
            inv_batch_sro: inv_batch_sro,
            inv_batch_date_prod:inv_batch_date_prod,
            inv_batch_date_exp:inv_batch_date_exp,
            inv_batch_qty: inv_batch_qty
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

    //  add Batch 
    listAllBatch(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_BATCH_LIST,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listBatchByID(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any,inv_batch_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_BATCH_LIST,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id,
            inv_batch_id:inv_batch_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Package 
    deleteBatch(token: any, userId: any,orgId: any, memId: any,inv_batch_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_BATCH_DELETE, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_batch_id:inv_batch_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

}


