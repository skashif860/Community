import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
/* services */
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { AppGlobal } from '../../shared/app.global';
import { TokenService } from '../../services/token-service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import * as $ from 'jquery';
import moment from 'moment-timezone';
import { EnvService } from 'src/app/env.service';
@Component({
  selector: 'app-acoount',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  public showSignIn;
  public showForgot;
  public showSignUp;
  public token: any;
  public userType: any;
  public userId: any;
  public userdata: any;
  public resourceMsisdn: any;
  public logo: any;
  public router: Router;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public loginLogo:any;
  timeZone: any;
  public model: any = {
    Email: '',
    Password: '',
  };
  GOOGLE_LOGO;


    constructor(router: Router, fb: FormBuilder, private toastr: ToastrService, private loginService: LoginService,
                private config: AppGlobal, private tokenService: TokenService,public envService: EnvService,
                private socialAuthService: AuthService ) {
        this.router = router;
        this.logo = this.config.LOGO;
        this.GOOGLE_LOGO = this.config.GOOGLE_LOGO
        this.showSignIn = true;
        this.loginLogo = this.envService.WHEREWORKS_LANDING_PAGE_LOGO_PATH + this.envService.WHEREWORKS_LANDING_PAGE_LOGO_NAME ;
    console.log( this.loginLogo );
      }
    ngOnInit() {
      this.timeZone =moment.tz.guess();
      if (this.tokenService.getToken()) {
        this.userdata = this.tokenService.getToken();
      }
      if (this.userdata != null) {
        const tokendata = this.userdata.split('|');
        this.resourceMsisdn = tokendata[0];
        this.userId = tokendata[1];
        this.token = tokendata[2];
        this.userType = tokendata[3];
        this.router.navigate(['/views/index']);
      }
    }
    public showSignInClicked() {
      this.showSignIn = true;
      this.showForgot = false;
      this.showSignUp = false;
    }
    public showSignUpClicked() {
      this.showSignIn = false;
      this.showForgot = false;
      this.showSignUp = true;
    }
    public showForgotClicked() {
      this.showSignIn = false;
      this.showForgot = true;
      this.showSignUp = false;
    }
    public socialSignIn(socialPlatform: string) {
      let socialPlatformProvider;
      if (socialPlatform == "facebook") {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      } else if (socialPlatform == "google") {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }
  
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          // console.log(userData.id);
          // console.log(userData.name);
            this.loginService.registerSocialUser(userData.authToken, userData.firstName, userData.lastName,
              userData.id, userData.name, userData.email, userData.photoUrl,
              userData.provider, this.timeZone).subscribe((data: any) => {
                console.log(data);
                if (data.rescode === 1) {
                  this.tokenService.setToken(data.data);
                  this.router.navigate(['/views/index']);
                  this.toastr.success(data.message, 'Alert!');
                } else {
                  this.toastr.error(data.message, 'Alert!');
                }
    
              });
        }
      );
    }
}


