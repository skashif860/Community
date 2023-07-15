import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators, NgForm } from '@angular/forms';
/* services */
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../../services/register.service';
import { AppGlobal } from '../../../shared/app.global';
import { OrgService } from '../../../services/org.service';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-savepassword',
  templateUrl: './savepassword.component.html',
  styleUrls: ['./savepassword.component.scss']
})
export class SavepasswordComponent{
  public logo: any;
  @ViewChild('f') form: NgForm;
  public router: Router;
  public email: string;
  public model: any = {
    password: '',
    confirmpassword: '',
    TimeZone: '',
  };

  loginLogo: any;
  public timeZones: any = [];

  constructor(router: Router, private route: ActivatedRoute, public toastr: ToastrService,  public envService: EnvService,
              private regService: RegisterService, private orgService: OrgService, private config: AppGlobal) {
    this.router = router;
    this.loginLogo =  this.envService.WHEREWORKS_LANDING_PAGE_LOGO_PATH +
     this.envService.WHEREWORKS_LANDING_PAGE_LOGO_NAME ;
    // console.log("LOGO:",  this.loginLogo );
    this.email =  this.route.snapshot.params['param1'];
    console.log(this.email);

    // get timezone
    this.getTimeZones();
   }

   getTimeZones(): void {
    this.orgService.getTimeZones().subscribe((data: any) => {
      console.log(data);
      if (data.rescode === 1) {
        this.timeZones = data.data;
      } else {
        this.toastr.error(data.message, 'Alert!');
      }
    });
  }

  public onSubmit(): void {
    this.regService.setPassword(this.email, this.model.password,
      this.model.confirmpassword, this.model.TimeZone).subscribe((data: any) => {
        console.log(data);
       if (data && data.rescode === this.config.SUCCESS_CODE) {
        this.router.navigate(['/accounts']);
      }
      this.toastr.success(data.message, 'Set Password');
    },
      error => {
        this.toastr.error('Invalid request', 'Set Password');

      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }

}
