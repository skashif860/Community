/*_________________________________________________APP Menu Display File____________________________________________
/*
    -> Contains:         returns user type to menuserivce /app/theme/components/menu/
    -> Created_by:       Sarmad Javed
    -> Created_on:       04/03/2019
    -> Contact_email:    Sarmad.javed@syntecx.net

*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';
import { TokenService } from '../services/token-service';

@Injectable()
export class DisMenuService {
    public token: any;
    public userType: any;
    public userId: any;
    public userdata: any;
    public userMsisdn: any;

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler,
                private tokenService: TokenService) {

        const userdata = this.tokenService.getToken();
     
        if (userdata != null) {
            const tokendata = userdata.split('|');
            this.userMsisdn = tokendata[0];
            this.userId = tokendata[1];
            this.token = tokendata[2];
            this.userType = tokendata[3];
        }
    }

    getUserType() {
        const userType = (this.userType ==  this.config.ADMIN) ? '1' : '2';
        return userType;
    }
}
