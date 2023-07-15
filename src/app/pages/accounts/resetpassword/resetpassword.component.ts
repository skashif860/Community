import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* services */
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login.service';
import { AppGlobal } from '../../../shared/app.global';
import { EnvService } from 'src/app/env.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  public logo: any;
  public router: Router;
  public model: any = {
    Email: '',
    NewPass: '',
    ConfirmPass: '',
    code: ''
  };
  loginLogo: any;

  constructor(private toastr: ToastrService, private loginService: LoginService, router: Router,
              private activeroute: ActivatedRoute, private config: AppGlobal, public envService: EnvService) {
    this.router = router;
    // this.logo = this.config.LOGO; 
    this.loginLogo = this.envService.WHEREWORKS_LANDING_PAGE_LOGO_PATH + this.envService.WHEREWORKS_LANDING_PAGE_LOGO_NAME ;
    // console.log("LOGO:",  this.loginLogo );
  }
  ngOnInit() {
    this.model.Email =  this.activeroute.snapshot.params['param1'];
    this.model.code =  this.activeroute.snapshot.params['param2'];
    console.log(this.model.code);
    console.log(this.model.Email);
  }
  onSubmit() {
    this.loginService.changePassword(this.model.Email, this.model.code, this.model.NewPass,
      this.model.ConfirmPass).subscribe((data: any) => {
        console.log('respone:',data);
       if (data.rescode === this.config.SUCCESS_CODE) {
        this.toastr.success(data.message, 'Change Password');
        this.router.navigate(['/accounts']);
      } else {
        this.toastr.error(data.message, 'Login');
      }
    });

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }

}
