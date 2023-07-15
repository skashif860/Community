import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';




@Injectable()
export class TokenService {

    constructor(private http: HttpClient) { }

    setToken(val: any) {
        const settoken = localStorage.setItem('supportUser', JSON.stringify(val));
        this.setSessionTime();
        return settoken;
    }

    getToken() {
        this.setSessionTime();
        const gettoken = JSON.parse(localStorage.getItem('supportUser'));
        return gettoken;
    }

    getSessionTime() {
        const getSessionTime = JSON.parse(localStorage.getItem('usersession'));
        return getSessionTime;
    }
    setSessionTime() {
        const setSessionTime = localStorage.setItem('usersession', JSON.stringify(new Date()));
    return setSessionTime;
    }
    removeToken() {
        const removetoken = localStorage.removeItem('supportUser');
        return removetoken;
    }

    setRoleAccess(val: any) {
        const setRoleAccess = localStorage.setItem('RoleAccess', JSON.stringify(val));
        return setRoleAccess;
    }
    setRoleAccessName(val: any) {
        const setRoleAccess = localStorage.setItem('RoleAccessName', JSON.stringify(val));
        return setRoleAccess;
    }
    getRoleAccess() {
        const getRoleAccess = JSON.parse(localStorage.getItem('RoleAccess'));
        return getRoleAccess;
    }
    getRoleAccessName() {
        const getRoleAccess = JSON.parse(localStorage.getItem('RoleAccessName'));
        return getRoleAccess;
    }

    removeRoleAccess() {
        const removeRoleAccess = localStorage.removeItem('RoleAccess');
        return removeRoleAccess;
    }
    
    removeRoleAccessName() {
        const removeRoleAccess = localStorage.removeItem('RoleAccessName');
        return removeRoleAccess;
    }

}
