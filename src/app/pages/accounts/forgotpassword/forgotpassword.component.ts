import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* services */
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login.service';
import { AppGlobal } from '../../../shared/app.global';
import { AccountsComponent } from '../accounts.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  public logo: any;
  public router: Router;
  public hideShowRecover : boolean = true; 
  public hideShowVerify : boolean = false; 
 
  public model: any = {
    Email: '',
    verificationCode: '',
    newPass:'',
    confirmPass: ''
  };
  constructor(private toastr: ToastrService, private loginService: LoginService, private config: AppGlobal,
    router: Router,

    private accounts: AccountsComponent) {
    this.logo = this.config.LOGO;
   }
  ngOnInit() {
  }
  public showSignInClicked() {
    this.accounts.showSignInClicked();
  }

  public showSignUpClicked() {
   this.accounts.showSignUpClicked();
  }

  onSubmit() {
      this.loginService.forgotPassword(this.model.Email).subscribe((data: any) => {
      
        if (data.rescode === 1) {
          this.hideShowVerify = true;
          this.hideShowRecover = false; 
          this.toastr.success(data.message, 'Forgot-Password');
        
        } else  if (data.rescode === 0){
          this.toastr.error(data.message, 'Forgot-Password');
        }
       
      }
      );
  }
  onSubmitChange() {
    this.loginService.changePassword(this.model.Email, this.model.verificationCode, this.model.newPass,
      this.model.confirmPass).subscribe((data: any) => {
      //console.log('respone:',data);
       if (data.rescode === 1) {
        this.toastr.success(data.message, 'Change Password');
   this.showSignInClicked();
      } else {
        this.toastr.error(data.message, 'Login');
      }
    });

  }
  verificationCode() {
    this.hideShowVerify = true;
    this.hideShowRecover = false; 
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }
}
