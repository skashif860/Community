import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/services/token-service';
import { NotifyService } from 'src/app/services/notificaton.service';

@Component({
    selector: 'app-notify',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    providers: [],
    encapsulation: ViewEncapsulation.None
  })
  export class NotificationComponent implements OnInit {
    public messages: [];
    public token: any;
    public fb_token: any;
    public userId: any;
    public userMsisdn: any;
    public userType: any;
    public userName: any;
    public userLevel: any;
    constructor(public toastr: ToastrService, private router: Router, private tokenService: TokenService,
                private notifyService: NotifyService) {

    }
    ngOnInit() {
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
        console.log('fb_token:',this.fb_token);
      }

      this.getNotifcation();
    }

    getNotifcation() {
      this.notifyService.getNotify(this.token, this.userId).subscribe((data: any) => {
        if (data.rescode === 1) {
          this.messages = data.data;
          console.log('notification', this.messages);
        }
      });
    }
  }
