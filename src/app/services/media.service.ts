import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';


@Injectable()
export class MediaService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    //  add Batch 
    // addMeta(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any, inv_packaging_id:any,
    //     inv_batch_id: any, inv_media_type: any,
    //     inv_media_name: any, inv_media_notes: any) {
    //     const reqheader = new HttpHeaders({ 'x-access-token': token });
    //     const Data = {
    //         process: this.config.INV_MEDIA_ADD,
    //          plattype: this.config.PLATFORM_TYPE,
    //         userid: userId,
    //         org_id: orgId,
    //         mem_id: memId,
    //         inv_prod_id:inv_prod_id,
    //         inv_packaging_id:inv_packaging_id,
    //         inv_batch_id: inv_batch_id,
    //         inv_media_type: inv_media_type,
    //         inv_media_name: inv_media_name,
    //         inv_media_notes: inv_media_notes
    //     };
    //     return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    // }
    addMedia(token: string, Data: any) {
        const reqheader = new HttpHeaders({'x-access-token': token });
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
      }
//  add Batch 
listMediaAll(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any) {
  const reqheader = new HttpHeaders({ 'x-access-token': token });
  const Data = {
      process: this.config.INV_MEDIA_LIST,
       plattype: this.config.PLATFORM_TYPE,
      userid: userId,
      org_id: orgId,
      mem_id: memId,
      inv_prod_id:inv_prod_id
  };
  return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
}


deleteMedia(token: any, userId: any,orgId: any, memId: any,inv_prod_id: any,inv_media_id:any) {
  const reqheader = new HttpHeaders({ 'x-access-token': token });
  const Data = {
      process: this.config.INV_MEDIA_DELETE,
       plattype: this.config.PLATFORM_TYPE,
      userid: userId,
      org_id: orgId,
      mem_id: memId,
      inv_prod_id:inv_prod_id,
      inv_media_id: inv_media_id
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


