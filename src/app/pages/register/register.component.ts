import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
/* services */
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/register.service';
import { AppGlobal } from '../../shared/app.global';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token-service';
import moment from 'moment-timezone';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('f') form: NgForm;
  public router: Router;
  public logo: any;
  public data: any = {
    Uname: '',
    Email: '',
  };
  timeZone: any;
  constructor(private toastr: ToastrService, private socialAuthService: AuthService,
    router: Router,private tokenService: TokenService,
    private regService: RegisterService, private config: AppGlobal) {
      this.router = router;
    this.logo = this.config.LOGO;
  this.timeZone =moment.tz.guess();
  //  console.log(moment.tz.guess());
  }

  public onSubmit(): void {
    if (this.form.valid) {
      console.log(this.data);
      this.regService.registerUser(this.data).subscribe((data: any) => {
        if (data.rescode === 1) {
          
          this.toastr.success(data.message, 'Alert!');
if(data.data === 1) {
  this.router.navigate(['verifyphonenumber', this.data.Email], { skipLocationChange: true });
} else {
  this.router.navigate(['accounts']);
}

        } else {
          this.toastr.error(data.message, 'Alert!');
        }

      });
    }
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
// console.log(userData);
        this.regService.registerSocialUser(userData.authToken, userData.firstName, userData.lastName,
          userData.id, userData.name, userData.email, userData.photoUrl,
          userData.provider, this.timeZone).subscribe((data: any) => {
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
  /*onSubmit() {
    console.log(this.data.Uname + 'submitted');
  }*/

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }
}
