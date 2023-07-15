import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* services */
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { AppGlobal } from '../../shared/app.global';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  public logo: any;
  public router: Router;
  public model: any = {
    Email: '',
    NewPass: '',
    ConfirmPass: '',
    code: ''
  };

  constructor(private toastr: ToastrService, private loginService: LoginService, router: Router,
              private activeroute: ActivatedRoute, private config: AppGlobal) {
    this.router = router;
    this.logo = this.config.LOGO;
   }
  ngOnInit() {
    this.model.Email =  this.activeroute.snapshot.params['id1'];
    this.model.code =  this.activeroute.snapshot.params['id2'];
    console.log(this.model.code);
  }
  onSubmit() {
    this.loginService.changePassword(this.model.Email, this.model.code, this.model.NewPass,
      this.model.ConfirmPass).subscribe((data: any) => {
       if (data && data.rescode === this.config.SUCCESS_CODE) {
        this.router.navigate(['/accounts']);
      }
      this.toastr.success(data.message, 'Change Password');
    },
      error => {
        this.toastr.error('Invalid request', 'Login');
      });

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }

}
