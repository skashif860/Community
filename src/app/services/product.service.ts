import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpHandler } from '@angular/common/http';

import { AppGlobal } from '../shared/app.global';



@Injectable()
export class ProductService {
    
    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
    
    //  add Category 
    addCategory(token: any, userId: any,orgId: any, memId: any,invCatName: any,invPCatId: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_CATEGORY_ADD, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_cat_name:invCatName,
            inv_p_cat_id: invPCatId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Product 
    addProduct(token: any, userId: any,orgId: any, memId: any,inv_prod_sku: any, inv_prod_name: any,
        inv_prod_barcode: any, inv_prod_uom: any, inv_prod_desc:any,inv_cat_id: any,foreign_type: any,
        foreign_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_PRODUCT_ADD, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_sku: inv_prod_sku,
            inv_prod_name:inv_prod_name,
            inv_prod_barcode: inv_prod_barcode,
            inv_prod_uom:inv_prod_uom,
            inv_prod_desc:inv_prod_desc,
            inv_cat_id: inv_cat_id,
            foreign_type:foreign_type,
            foreign_id: foreign_id

        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  add Product 
    updateProduct(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any,inv_prod_sku: any, inv_prod_name: any,
        inv_prod_barcode: any, inv_prod_uom: any, inv_prod_desc:any,inv_cat_id: any,foreign_type: any,
        foreign_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_PRODUCT_UPDATE, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_prod_id:inv_prod_id,
            inv_prod_sku: inv_prod_sku,
            inv_prod_name:inv_prod_name,
            inv_prod_barcode: inv_prod_barcode,
            inv_prod_uom:inv_prod_uom,
            inv_prod_desc:inv_prod_desc,
            inv_cat_id: inv_cat_id,
            foreign_type:foreign_type,
            foreign_id: foreign_id

        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  list Product 
    listAllProduct(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_PRODUCT_LIST, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_cat_id:'',
            inv_prod_id:inv_prod_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  List All Category 
    listAllCategory(token: any, userId: any,orgId: any, memId: any,invPCatId: any) {
        console.log(memId);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_CATEGORY_LIST, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_p_cat_id: invPCatId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  List All Category 
    updateCategory(token: any, userId: any,orgId: any, memId: any,inv_cat_id: any, inv_cat_name: any,
        inv_p_cat_id: any) {
               console.log(memId);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_CATEGORY_UPDATE, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_cat_id: inv_cat_id,
            inv_cat_name:inv_cat_name,
            inv_p_cat_id:inv_p_cat_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
//  delete Product By Id
deleteProductById(token: any, userId: any,orgId: any, memId: any, inv_prod_id: any) {
    
    const reqheader = new HttpHeaders({ 'x-access-token': token });
    const Data = {
        process: this.config.INV_PRODUCT_DELETE, plattype: this.config.PLATFORM_TYPE,
        userid: userId,
        org_id: orgId,
        mem_id: memId,
        inv_prod_id: inv_prod_id
    };
    return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
}
    //  List All Category 
    deleteCategoryById(token: any, userId: any,orgId: any, memId: any,invCatId: any) {
        console.log(memId);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_CATEGORY_DELETE, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
            inv_cat_id: invCatId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    //  List All Category 
    listAllUOM(token: any, userId: any,orgId: any, memId: any) {
        console.log(memId);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.INV_UOM_LIST, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            org_id: orgId,
            mem_id: memId,
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
}
