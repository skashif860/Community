import { Injectable } from '@angular/core';
import {
  Router, CanActivate, CanLoad, ActivatedRouteSnapshot,
  RouterStateSnapshot, Route, CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/token-service';
// import { AuthService } from '../services/authservice/auth-service';
import { AppGlobal} from '../shared/app.global';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  token: string;
  userId: number;
  authenticate: any;
  userType: any;
  constructor(private router: Router, private tokenService: TokenService,
    private config: AppGlobal, public toastr: ToastrService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const currentUser = this.tokenService.getToken();
      if (currentUser != null)  {
      const tokendata = currentUser.split('|');
      this.userId = tokendata[1];
      this.token = tokendata[2];
      if (this.token != null) {
        return true;
      } else {
        this.toastr.info('Token expired,please login again', 'Login');
        this.router.navigate(['/accounts']);
        return false;
      }

    } else {
      this.toastr.info('Token expired,please login again', 'Login');
      this.router.navigate(['/accounts']);
      return false;
    }
  }
}
