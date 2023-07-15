import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../../services/register.service';
import { OrgService } from '../../../services/org.service';
import { AppGlobal } from '../../../shared/app.global';
import { EnvService } from 'src/app/env.service';
@Component({
    selector: 'app-setpass',
    templateUrl: './setpassword.component.html',
    styleUrls: ['./setpassword.component.scss'],
    providers: [NgxSpinnerService]
})
export class SetPassordComponent implements OnInit {
    loginLogo: any;
    public router: Router;
    public model: any = {
        password: '',
        confirmpassword: '',
        TimeZone: '',
      };
    Userdata: any = {};
    public timeZones: any = [];
    constructor(router: Router, private route: ActivatedRoute, public toastr: ToastrService,private appGlobal: AppGlobal,
        private spinner: NgxSpinnerService, private orgService: OrgService, private regService: RegisterService,
         public envService: EnvService) {
        this.router = router;
        this.Userdata.email = this.route.snapshot.params['param1'];
        this.Userdata.code = this.route.snapshot.params['param2'];
        // if (this.Userdata.email && this.Userdata.code) {
        //
        this.loginLogo = this.envService.WHEREWORKS_LANDING_PAGE_LOGO_PATH + this.envService.WHEREWORKS_LANDING_PAGE_LOGO_NAME ;
        console.log(this.Userdata.email + this.Userdata.email);
        //  call method
        this.verifyUser(this.Userdata);
        // }
    }

    ngOnInit() {
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

    public verifyUser(values: Object): void {
        setTimeout(() => { this.spinner.show(); }, 25);

        // Api Request
        this.regService.verifyUser(values).subscribe((data: any) => {
            console.log(data);
            if (data.rescode === 1) {
                this.toastr.info(data.message, 'Verification');
                // redirect
                this.spinner.hide();
            } else if(data.rescode === 0) {
                this.toastr.info(data.message, 'Verification');
                this.spinner.hide();
                // this.toastr.info(data.message, 'Verification');
            }
        });
    }

    public onSubmit(): void {
        this.regService.setPassword( this.Userdata.email, this.model.password,
          this.model.confirmpassword, this.model.TimeZone).subscribe((data: any) => {
            console.log(data);
           if (data && data.rescode === 1) {
            this.router.navigate(['/accounts']);
          }
          this.toastr.success(data.message, 'Set Password');
        },
          error => {
            this.toastr.error('Invalid request', 'Set Password');
    
          });
      }

}




