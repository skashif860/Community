import { Component, OnInit } from '@angular/core';

/* services */
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { AppGlobal } from '../../shared/app.global';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  public logo: any;
  public model: any = {
    Email: '',
  };
  constructor(private toastr: ToastrService, private loginService: LoginService, private config: AppGlobal) {
    this.logo = this.config.LOGO;
   }
  ngOnInit() {
  }
  onSubmit() {
      this.loginService.forgotPassword(this.model.Email).subscribe((data: any) => {
        this.toastr.success(data.message, 'Forgot-Password');
        },
        error => {
          this.toastr.error('Invalid request', 'Login');
        }
      );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }
}
