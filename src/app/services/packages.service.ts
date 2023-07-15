import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import 'rxjs/add/operator/map'
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class PackageService {
  public addplace = false;
  public editplace = false;
  public viewplace = true;
  public placeForm: any = {};
  public placeDelete: any = {};
  public addEditOpen: boolean = false;
  public poilatitude: number;
  public poilongitude: number;


  constructor(private http: HttpClient, private config: AppGlobal) { }


  AddPackage(userId: any, token: any, orgid: any, packagename: any, packagedesc: any, familyCovered: any, price: any, validity: any,
  ) {
    var reqheader = new HttpHeaders({ 'x-access-token': token });
    const data = {
      process: this.config.ADD_PACKAGE, userid: userId,  orgid: orgid,
      packagename: packagename, packagedesc: packagedesc, familyCovered: familyCovered, price: price,
      validity: validity, plattype: this.config.PLATFORM_TYPE
    };
    console.log('package_req:',data)
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }

  UpdatePackage(userId: any, token: any, orgid: any, packageid: any, packagename: any, packagedesc: any, familyCovered: any, price: any, validity: any) {
    var reqheader = new HttpHeaders({ 'x-access-token': token });
    const data = {
      process: this.config.UPDATE_PACKAGE, userid: userId, orgid: orgid, packageid: packageid,
      packagename: packagename, packagedesc: packagedesc, familyCovered: familyCovered, price: price,
      validity: validity, plattype: this.config.PLATFORM_TYPE
    };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });
  }


  getPackageItem(userId: any, userType: any) {

    var reqheader = new HttpHeaders({ 'content': "application/json" });
    const data = { process: this.config.LIST_ITEMS, userid: userId };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });

  }

  getPackageList(userId: any, token: any,org_id:any) {

    var reqheader = new HttpHeaders({ 'x-access-token': token });
    const data = { process: this.config.LIST_PACKAGES_FOR_NGO, userid: userId,orgid:org_id,
      plattype: this.config.PLATFORM_TYPE };
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });

  }

  deletePackage(userId: any, token: any, orgid: any, packageid: any) {

    var reqheader = new HttpHeaders({ 'x-access-token': token });
    const data = { process: this.config.DELETE_PACKAGE, userid: userId, orgid: orgid, packageid: packageid
      , plattype: this.config.PLATFORM_TYPE};
    return this.http.post(this.config.apiUrl, data, { headers: reqheader });

  }




}
