import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
/* services */
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login.service';
import { AppGlobal } from '../../../shared/app.global';
import { TokenService } from '../../../services/token-service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import * as $ from 'jquery';
import { AccountsComponent } from '../accounts.component';
import { OrgService } from '../../../services/org.service';
import { UserOrg } from '../../../services/userorg.service';
import { RoleService } from '../../../services/role.service';
import { LocationService } from '../../../services/location.service';
import { promise } from 'selenium-webdriver';
import { async, delay } from 'q';
import { MemberService } from 'src/app/services/member.service';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public token: any;
  public fb_token: any;
  public userType: any;
  public userId: any;
  public userMsisdn: any;
  public userName: any;
  public userLevel: any;
  public userdata: any;
  public orgName;
  public org_id;
  public memId;
  public resourceMsisdn: any;
  public logo: any;
  public router: Router;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  imagepath;
  public model: any = {
    Email: '',
    Password: '',
  };
  orgList: any = [];
  nameRole: any;

  constructor(
    router: Router, fb: FormBuilder, private toastr: ToastrService,
    private loginService: LoginService, private orgService: OrgService,
    private role: RoleService, private locService: LocationService, private memService: MemberService,
    private config: AppGlobal, private tokenService: TokenService, public userOrg: UserOrg, public envService: EnvService,
    private accounts: AccountsComponent, private socialAuthService: AuthService) {
    this.router = router;
    this.logo = this.envService.WHEREWORKS_LANDING_PAGE_LOGO_PATH + this.envService.WHEREWORKS_LANDING_PAGE_LOGO_NAME ;
  }
  ngOnInit() {
    $("#showPass")
      .mouseup(function () {
        $("#password").attr('type', 'password');
      })
      .mousedown(function () {
        $("#password").attr('type', 'text');
      });

  }

  getUserDetails() {
    // get user org
    const orgID = this.userOrg.getOrg();
    this.org_id = orgID;
    // if active get userdata
    const userdata = this.tokenService.getToken();
    if (userdata != null) {
      const tokendata = userdata.split('|');
      this.userMsisdn = tokendata[0];
      this.userId = tokendata[1];
      this.token = tokendata[2];
      this.userType = tokendata[3];
      this.userName = tokendata[4];
      this.userLevel = tokendata[5];
      this.fb_token = tokendata[7];
      this.imagepath = tokendata[8];
    }
    // this.getMemberID();
  }

  showSignUpClicked() {
    this.accounts.showSignUpClicked();
  }
  showForgotClicked() {
    this.accounts.showForgotClicked();
  }

  onSubmit() {
    this.loginService.login(this.model.Email, this.model.Password).subscribe((data: any) => {
      if (data.rescode === this.config.SUCCESS_CODE) {
        // console.log("inside login");

        this.tokenService.setToken(data.data);
        this.getUserDetails();
        this.getUserOrg();
        //  delay(50000);
        this.toastr.success(data.message, 'Success');
      } else if(data.rescode === 0) {
        this.toastr.error(data.message, 'Alert');
      } else {
        this.toastr.error(data.message, 'Alert');
      }
    });
  }
  gotodash() {
    this.router.navigate(['/views/index']);
  }
  getUserOrg() {
    this.orgService.viewUserOrganization(this.token, this.userId).subscribe((data: any) => {
      // console.log(data);
      if (data.rescode === 1) {
        this.orgList = data.data;
        const org = this.userOrg.getOrg();
        if (org == null) {
          this.setUserOrg(data.data[0].org_id, data.data[0].org_name,data.data[0].org_industry_id);
          console.log('inside set org');
        }
      } else if (data.rescode === 0) {
        this.listMemInvitations();
        console.log('inside mem invitations ');
      } else {
        this.router.navigate(['/accounts']);
        this.toastr.error(data.message, 'Alert');
      }
    });
  }
  setUserOrg(id: string, name: any, type:any) {
    this.userOrg.setOrg(id);
    this.userOrg.setOrgType(type);
    this.setUserOrgName(name);
    this.getUserDetails();
    //  this.router.navigate(['/views/organization/detail/' + id]);
    //    location.reload(true);
    console.log('IDs_login:', 'org_id' + this.org_id, 'userid' + this.userId, 'memid' + this.memId);
    this.getMemberID();

  }
  listMemInvitations(): void {
    // console.log(this.org_id);
    this.memService.listInvitationMem(this.token, this.userId).subscribe((data: any) => {
      // console.log(data);
      if (data.rescode === 1) {
        console.log('inside invitations Found');
        this.router.navigate(['/views/invitations']);
      } else if (data.rescode === 0)  {
        console.log('no invitation Found');
        this.router.navigate(['/views/index']);
      }
    });
  }

  setUserOrgName(name: string) {
    this.userOrg.setOrgName(name);
  }
  getMemberID() {
    this.locService.getMember(this.token, this.userId, this.org_id).subscribe((data: any) => {
      // console.log('member id');
      // console.log(data);
      this.memId = data.data[0].org_member_id;
      // console.log('Member_id', this.memId);
      console.log('IDs_login_after_memid:', 'org_id' + this.org_id, 'userid' + this.userId, 'memid' + this.memId);
      this.setRoleAccess();
    });

  }
  setRoleAccess() {
    // this.role.getRoleAccess(this.token, this.userId, this.org_id, this.memId)
    this.role.getRoleAccess(this.token, this.userId, this.org_id, this.memId).subscribe((data: any) => {
      // console.log('RoleAcess', data.data);
      // console.log('RoleAcess', data.data.role_name);
      this.tokenService.setRoleAccess(data.data);
      this.tokenService.setRoleAccessName(data.data.role_name);
      this.nameRole = this.tokenService.getRoleAccessName();
     // console.log('admin check1' + this.nameRole);
      if (this.nameRole !== 'Owner' && this.nameRole !== 'Admin') {
      //  console.log('admin check' + this.nameRole);
      this.router.navigate(['/views/people/view']);
      } else {
        this.router.navigate(['/views/index']);
     }

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
            this.getUserDetails();
            this.getUserOrg();
            // this.router.navigate(['/views/viewteam']);
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

export function emailValidator(control: FormControl): { [key: string]: any } {
  const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  const mobile = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
    ;
  if (control.value && !mobile.test(control.value)) {
    return { invalidEmail: true };
  }
}

