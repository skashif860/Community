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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
  public model: any = {
    Email: '',
    Password: '',
  };


    constructor(router: Router, fb: FormBuilder, private toastr: ToastrService, private loginService: LoginService,
                private config: AppGlobal, private tokenService: TokenService,
                private socialAuthService: AuthService ) {
        this.router = router;
        this.logo = this.config.LOGO;
        this.showSignIn = true;
    }
    ngOnInit() {
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
    showSignInClicked() {
      this.showSignIn = true;
      this.showForgot = false;
      this.showSignUp = false;
    }
    showSignUpClicked() {
      this.showSignIn = false;
      this.showForgot = false;
      this.showSignUp = true;
    }
    showForgotClicked() {
      this.showSignIn = false;
      this.showForgot = true;
      this.showSignUp = false;
    }
    public onSubmit(): void {
        this.loginService.login(this.model.Email, this.model.Password).subscribe((data: any) => {
          if (data && data.rescode == this.config.SUCCESS_CODE) {
            console.log(data);
            
            this.tokenService.setToken(data.data);
            this.router.navigate(['/views/index']);
          }
          this.toastr.success(data.message, 'Login');
          // setTimeout(() => {
          //   this.modalReference.close();
          // }, 2000);
        },
          error => {
            this.toastr.error('Invalid request', 'Login');
          });
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
            console.log(userData.id);
            console.log(userData.name);
    
            this.loginService.socialLogin(userData.id, userData.name).subscribe((data: any) => {
                console.log(data);
                if (data.rescode === 1) {
                  this.tokenService.setToken(data.data);
                  this.router.navigate(['/views/viewteam']);
                  this.toastr.success(data.message, 'Alert!');
                } else {
                  this.toastr.error(data.message, 'Alert!');
                }
    
              });
          }
        );
      }
 
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
}

export function emailValidator(control: FormControl): {[key: string]: any} {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    const mobile = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
    ;
    if (control.value && !mobile.test(control.value)) {
        return {invalidEmail: true};
    }
}

