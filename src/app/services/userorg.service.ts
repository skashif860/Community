import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';




@Injectable()
export class UserOrg {

    constructor(private http: HttpClient) { }

    setOrg(val: any) {
        const setorg = localStorage.setItem('userOrganization', JSON.stringify(val));
        return setorg;
    }

    getOrg() {
        const getorg = JSON.parse(localStorage.getItem('userOrganization'));
        return getorg;
    }

    removeOrg() {
        const removeorg = localStorage.removeItem('userOrganization');
        return removeorg;
    }
    setOrgType(val: any) {
        const type = localStorage.setItem('orgType', JSON.stringify(val));
        return type;
    }

    getOrgType() {
        const type = JSON.parse(localStorage.getItem('orgType'));
        return type;
    }

    removeOrgType() {
        const type = localStorage.removeItem('orgType');
        return type;
    }

    setOrgName(val: any) {
        console.log(val);
        const setorg = localStorage.setItem('userOrganizationName', JSON.stringify(val));
        return setorg;
    }

    getOrgName() {
        const getorg = JSON.parse(localStorage.getItem('userOrganizationName'));
        return getorg;
    }

    removeOrgName() {
        const removeorg = localStorage.removeItem('userOrganizationName');
        return removeorg;
    }




}
