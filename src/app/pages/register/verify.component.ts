import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/register.service';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss'],
    providers: [RegisterService]
  })
  export class VerifyComponent {
        public router: Router;
        Userdata: any = {};
        verifymsg = 'Verifying please wait...';

        constructor(router: Router, private route: ActivatedRoute, public toastr: ToastrService, private regService: RegisterService) {

            this.router = router;
            this.Userdata.email =  this.route.snapshot.params['param1'];
            this.Userdata.code =  this.route.snapshot.params['param2'];
            if (this.Userdata.email && this.Userdata.code) {
                //
                console.log(this.Userdata.email +  this.Userdata.email);
                //  call method
                this.verifyUser(this.Userdata);
            }
        }

        public verifyUser(values: Object): void {
            // Api Request
            this.regService.verifyUser(values).subscribe((data: any) => {
                console.log(data);
                if (data.rescode === 1) {
                    this.verifymsg = 'redirecting...';
                    this.toastr.info(data.message, 'Verification');
                    // redirect
                    this.router.navigate(['register/save-password/' + this.Userdata.email]);
                    this.verifymsg = '';
                } else {
                    this.verifymsg = data.message;
                    // this.toastr.info(data.message, 'Verification');
                }
            });
        }
        // tslint:disable-next-line:use-life-cycle-interface
        ngAfterViewInit() {
            document.getElementById('preloader').classList.add('hide');
        }
  }
