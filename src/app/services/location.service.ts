import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class LocationService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }

    getMember(token: any, userId: any, org_Id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.GET_MEMBER_BY_SUB_ID, org_id: org_Id, sub_id: userId, userid: userId,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }


    addLocation(token: any, userId: any, org_Id: any, memid: any, title: any, type: any, desc: any, lat: any, lng: any,
         loc_city: any, loc_area: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_SET_LOC_BY_MEMID, 
            userid: userId, 
            org_id: org_Id, 
            org_member_id: memid,
            loctext: title, 
            loctype: type,
             locdesc: desc,
              lat: lat,
               lon: lng,
               loc_area: loc_area,
               loc_city: loc_city,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    addDistLocation(token: any, userId: any, org_Id: any, memid: any, title: any, type: any, desc: any, lat: any, lng: any,
        f_type: any, f_key: any, loc_area: any, loc_city: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_SET_LOC_BY_MEMID,
            userid: userId,
            org_id: org_Id,
            org_member_id: memid,
            loctext: title,
            loctype: type,
            locdesc: desc,
            lat: lat,
            lon: lng,
            f_type: f_type,
            f_key: f_key,
            loc_area: loc_area,
            loc_city: loc_city,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    updateDistLocation(token: any, userId: any, locId: any, title: any, type: any, desc: any, lat: any, 
        lng: any,loc_area: any, loc_city: any,f_type: any,f_key ) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_UPDATE_LOC_BY_LOCID,
            userid: userId,
            loc_id: locId,
            loctext: title,
            loctype: type,
            locdesc: desc,
            lat: lat,
            lon: lng,
            f_type: f_type,
            f_key: f_key,
            loc_area: loc_area,
            loc_city: loc_city,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getLocations(token: any, userId: any, org_Id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_GET_LOC_BY_ORGID, userid: userId, org_id: org_Id,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }

    deleteLocation(token: any, userId: any, loc_Id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_DELETE_LOC_BY_LOCID, userid: userId, loc_id: loc_Id,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getLocationbyLocId(token: any, userId: any, loc_Id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_GET_LOC_BY_LOCID, userid: userId, loc_id: loc_Id,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    updateLocation(token: any, userId: any, loc_Id: any, locType: any, loc_address: any, locarea: any, loccity: any, loctext: any,
        Lat: any, Lon: any, fkey: any, ftype
    ) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_UPDATE_LOC_BY_LOCID, userid: userId, loc_id: loc_Id, loctype: locType,
            locdesc: loc_address, lat: Lat, lon: Lon, loctext: loctext, loc_area: locarea, loc_city: loccity, f_key: fkey, f_type: ftype,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getUserCurrentLocation(token: any, userId: any,org_Id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.GET_USER_CURRENT_LOCATION, userid: userId, org_id: org_Id,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getLocationAllDist(token: any, userId: any, org_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_GET_LOCS_BY_FTYPE, userid: userId, org_id: org_id,
            f_type: 'distributor',
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getLocationAllDoctor(token: any, userId: any, org_id: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LOC_PROC_GET_LOCS_BY_FTYPE, userid: userId, org_id: org_id,
            f_type: 'Doctor',
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    getAllCities(token: any, userId: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.LIST_ALL_CITIES, userid: userId,
            plattype: this.config.PLATFORM_TYPE
        };
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
}