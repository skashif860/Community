import { debug } from 'util';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
    canAdd(module_id: string, rolesAccess: any): Boolean {
        if (rolesAccess[module_id].can_add === '1') {
            return true;
        }
    }
    canEdit(module_id: string, rolesAccess: any): Boolean {
        console.log(rolesAccess[module_id].can_edit);
        if (rolesAccess[module_id].can_edit === '1') {
            return true;
        }
    }
    canDelete(module_id: string, rolesAccess: any): Boolean {
        console.log(rolesAccess[module_id].can_edit);
        if (rolesAccess[module_id].can_delete === '1') {
            return true;
        }
    }

}
