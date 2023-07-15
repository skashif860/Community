import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';


@Injectable()
export class InventoryService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    //  add Batch 
    addInventory(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any, inv_batch_id:any,
        inv_stock_move_qty: any,inv_stock_move_type: any,inv_stock_move_issued_to:any,inv_stock_move_issued_by:any,
        foreign_type:any,foreign_id:any,inv_stock_move_dtm:any, inv_stock_move_invoice_no:any,
        inv_stock_move_price:any,inv_stock_move_notes:any ) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_STOCK_MOVEMENT_ADD,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id: inv_prod_id,
            inv_batch_id:inv_batch_id,
            inv_stock_move_qty:inv_stock_move_qty,
            inv_stock_move_type:inv_stock_move_type,
            inv_stock_move_issued_to:inv_stock_move_issued_to,
            inv_stock_move_issued_by:inv_stock_move_issued_by,
            foreign_type:foreign_type,
            foreign_id:foreign_id,
            inv_stock_move_dtm: inv_stock_move_dtm,
            inv_stock_move_invoice_no:inv_stock_move_invoice_no,
            inv_stock_move_price:inv_stock_move_price,
            inv_stock_move_notes:inv_stock_move_notes
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Batch 
    listAllInventory(token: any, userId: any,orgId: any, memId: any,inv_batch_id: any,inv_prod_id: any,
        inv_stock_move_invoice_no:any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_STOCK_MOVEMENT_LIST,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_batch_id:inv_batch_id,
            inv_prod_id:inv_prod_id,
            inv_stock_move_invoice_no:inv_stock_move_invoice_no
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Batch 
    deleteInventory(token: any, userId: any,orgId: any, memId: any,inv_batch_id: any,inv_prod_id: any,
        inv_stock_move_id:any, inv_stock_move_qty: any,
        inv_stock_move_type: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_STOCK_MOVEMENT_DELETE,
             plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_batch_id:inv_batch_id,
            inv_prod_id:inv_prod_id,
            inv_stock_move_id:inv_stock_move_id,
            inv_stock_move_qty: inv_stock_move_qty,
            inv_stock_move_type:inv_stock_move_type
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }

}


