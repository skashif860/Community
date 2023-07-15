import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

// services
import { LoginService } from '../../../services/login.service';
import { TokenService } from '../../../services/token-service';
import { AuthService } from '../../../services/auth.service';
import { OrgService } from '../../../services/org.service';
import { UserOrg } from '../../../services/userorg.service';
import { NotifyService } from '../../../services/notificaton.service';
import { AppGlobal } from '../../../shared/app.global';
import { MemberService } from '../../../services/member.service';
import { NgxSpinnerService } from 'ngx-spinner';

// firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MessagesService } from './messages.service';
import { AngularFireAuth } from 'angularfire2/auth';
// import { timingSafeEqual } from 'crypto';

//chat
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { RoleService } from '../../../services/role.service';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  providers: [LoginService, OrgService, AuthService, MessagesService, NgxSpinnerService],
})

export class UserMenuComponent implements OnInit{
  employeeList: AngularFireList<any>;
  public files: Array<Object>;
  public meetings: Array<Object>;

  public arrdata: any;
  public token: any;
  public fb_token: any;
  public userId: any;
  public userMsisdn: any;
  public userType: any;
  public userName: any;
  public userLevel: any;
  public userSession: Array<any> = [];
  public userTime: Array<any> = [];
  public lastLoggedIn: Array<any> = [];
  public modalRef: NgbModalRef;
  public notarray: any = [];
  public viewStatus: any = [];
  public defaultStatus: any = [];
  public loader = false;
  public counter: any;
  public orgName;
  public org_id;
  public memId;
  public memList: any;
  public isOpen;
  imagepath;
  sessionTimeCounter = 60;
  loadingIndicator = true;
  public settings: Settings;
  today: any;
  // notification
  public counters = 0;
  notification: any = [];
  messages = [];
  notification_ids = [];
  note: any = [];
  Count;
  localHH: any;
  localMM: any;
  localSS: any;
  sessionHH: any;
  sessionMM: any;
  sessionSS: any;
  orgList: any = [];
  delete_org_Id: any;
  changed_org_id: string;
  nameRole: string;
  isMember: boolean;
  counterBack: any;
  Dummy: string;
  timeCountLocal: any = 0;
  timeCountSession: any = 0;
  setModalTime : any;
  isAdminorOwner = false;
  constructor(
    public toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private memServ: MemberService,
    private tokenService: TokenService,
    private orgService: OrgService,
    private authService: AuthService,
    public datepipe: DatePipe,
    public modalService: NgbModal, public userOrg: UserOrg, public config: AppGlobal,
    private messagesService: MessagesService, private spinner: NgxSpinnerService,
    public afAuth: AngularFireAuth, public db: AngularFireDatabase,
    private notifyService: NotifyService, public appSettings: AppSettings,
    private role: RoleService, private locService: LocationService) {
    this.isOpen = false;
    this.Dummy = this.config.DUMMY_USER;
    this.settings = this.appSettings.settings;
    this.Count = 0;

  }

  ngOnInit() {
    // user details
    this.getUserDetails();
 
    const Role = this.tokenService.getRoleAccessName();
    if( Role === 'Owner' || Role === 'Admin'){
      this.isAdminorOwner = true;
    } else {
      this.isAdminorOwner = false;
    }
    $(".btnn2").click(function () {
      $(".btnn2").removeClass("active");
      $(this).addClass("active");
    });

    // check for session status
    this.getSessionStatus();

    // get user org
    this.orgName = this.userOrg.getOrgName();
    if (this.org_id === null) {
      //console.log("inside user_menu");
      this.getUserOrg();

    }

    // this.getUserLogin();
    // this.sessionTime();

    // set Firebase Token
    this.setToken();
    this.getCount();

    console.log(this.sessionTimeCounter);
    jQuery('#messagesTabs').on('click', '.nav-item a', function () {
      setTimeout(() => jQuery(this).closest('.dropdown').addClass('show'));
    });

    //  document.getElementById('btn11').click();
    setInterval(() => {
      this.setToken();
      this.getCount();
      // document.getElementById('btn11').click();
    }, 600000);

//    this.setModalTimeInterVal();

  }

  setModalTimeInterVal() {


    this.setModalTime =setInterval(() => {

      let timeDiff
     this.today = new Date();
     this.sessionTimeCounter = this.tokenService.getSessionTime();
     let minutes = Math.floor(
       Math.abs(
         new Date().getTime() -
         new Date(this.sessionTimeCounter).getTime()
       ) /
       1000 /
       60
     );
     console.log(minutes);

     if (minutes >= 15) {
       this.setTimeIntervel();
      } 


   }, 60000);
   //console.log(minutes);
  }
  setTimeIntervel() {
    document.getElementById('btn11').click();
    clearInterval(this.setModalTime);
    this.counters = 20;
        var i = 0;
    
        this.counterBack = setInterval(() => {

          i = i + 5;

          if (i < 101) {
            console.log("m here", i);
            
            this.counters--;
            if(this.counters <= 0) {
              this.logout();
            }
            $('.progress-bar').css('width', i + '%');

          } else {
            clearInterval(this.counterBack);
          }

        }, 1000);
        i = 0;
        var j = 20;
        this.counters = 20;

  }
  // get user details
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
    this.listMemInvitations();
  }

  // check for session status
  getSessionStatus() {
    this.authService.isAuthenticated(this.userId, this.token).subscribe((data: any) => {
      if (data.rescode === 2) {
        this.toastr.info('Session expired', 'Alert!');
        this.tokenService.removeToken();
        this.router.navigate(['/accounts']);
      }
    });
  }
  stayLogin() {
    this.tokenService.setSessionTime();
    this.setModalTimeInterVal();
        clearInterval(this.counterBack);
    this.closeModal();
  }
  /*  ________________"Role Base Access"___________________________ */
  async getMemberID() {
    await this.locService.getMember(this.token, this.userId, this.org_id).subscribe((data: any) => {
      // console.log('member id');
      // console.log(data);
      this.memId = data.data[0].org_member_id;
      // console.log('Member_id', this.memId);
      this.setRoleAccess();
    });

  }
  setRoleAccess() {
    // this.role.getRoleAccess(this.token, this.userId, this.org_id, this.memId)
    this.role.getRoleAccess(this.token, this.userId, this.org_id, this.memId).subscribe((data: any) => {
      // console.log('RoleAcess', data.data);
      // console.log('RoleAcess', data.data.role_name);
      this.tokenService.setRoleAccess(data.data);
      this.tokenService.setRoleAccessName(data.data.role_name)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/views/organization/detail/' + this.changed_org_id]));
    });
  }
  /*  ________________"Role Base Access Ends"______________________ */

  /*  ________________"Notifications"___________________________ */

  // set Firebase Token
  setToken() {
    this.notifyService.getToken(this.token, this.userId, this.userType).subscribe((data: any) => {
      if (data.rescode === 1) {
        localStorage.setItem('firebase_token', JSON.stringify(data.data.firebase_custom_token));
      }
    });
  }

  // get notification count
  getCount() {
    const firebase_token = JSON.parse(localStorage.getItem('firebase_token'));
    this.afAuth.auth.signInWithCustomToken(firebase_token)
      .then(value => {
        const uid = value.user.uid;
        this.db.list('/users/' + uid + '/notifications').snapshotChanges().subscribe(async (data) => {
          this.Count = 0;
          this.notification = [];
          let i = 0;
          for (const val of data) {
            console.log(data);
            console.log(val.payload.key);
            this.notification.push({
              id: parseInt(val.payload.key),
            });
            i++;
          }
          //  console.log(this.notification);
          this.Count = this.notification.length;
          // console.log('new notification', this.notification);


          //  display new notificaion
          await this.displayNewNotification();
        });
      })
      .catch(err => {
        // console.log('Something went wrong:', err.message);
      });
  }

  // display new notification
  displayNewNotification() {
    this.notifyService.getNotify(this.token, this.userId).subscribe((data: any) => {
      if (data.rescode === 1) {
        const newmessages = data.data;
        // console.log('hello:', newmessages);
        this.spinner.hide();
        for (let i = 0; i < this.notification.length; i++) {
          //  console.log('notification_id', this.notification[i].id, 'message:', newmessages[i].notification_id);
          if (this.notification[i].id === newmessages[i].notification_id) {
            this.toastr.info(newmessages[i].notification_text, newmessages[i].notification_title);
          }
        }
      }
    });
  }

  //  get notificaation list
  getNotifcation() {

    this.spinner.show();
    this.notifyService.getNotify(this.token, this.userId).subscribe((data: any) => {

      if (data.rescode === 1 || data.rescode === 0) {
        this.messages = data.data;
        // ('hello:', this.messages);
        this.spinner.hide();
        // get pending notifications
        // console.log('getting called');
        for (let i = 0; i < data.data.length; i++) {
          const notification_ids = [];
          if (data.data[i].notification_status === 4) {
            notification_ids.push({
              notification_id: data.data[i].notification_id,
              notification_status: data.data[i].notification_status,
            });
            this.changeNotificationStatus(notification_ids);
            // console.log('ids:', this.notification_ids);
          }
        }
      } else {
        this.spinner.hide();
      }

    });
  }

  // change notification status
  changeNotificationStatus(notifications) {
    this.notifyService.changeNotificationStatus(this.token, this.userId, this.userType, notifications).subscribe((data: any) => {
      if (data.rescode === 1) {
        //  this.toastr.info('status changed');
      } else {
        //  this.toastr.error('Status change failed');
      }
    });
  }

  // onCLick notification
  async onClickNote() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.getNotifcation();
      this.listMemInvitations()
    } else {
      this.isOpen = false;
    }

  }

  getMessages(data: any): any[] {
    for (let i = 0; i < data.length; i++) {
      const messages = [];

      messages.push({
        notification_id: data[i].notification_id,
        notification_status: data[i].notification_status,
        notification_text: data[i].notification_text,
        notification_title: data[i].notification_title,
        notification_type: data[i].notification_type,
        notification_udt: data[i].notification_udt
      });
      return messages;
    }
  }
  /*  ________________"Notifications Edns"_________________ */

  /*  ________________"USER ORG"___________________________ */

  // get user organization detail
  getUserOrg() {
    this.orgService.viewUserOrganization(this.token, this.userId).subscribe((data: any) => {
      // console.log(data);
      if (data.rescode === 1) {
        this.orgList = data.data;
        const org = this.userOrg.getOrg();
        if (org == null) {
          this.setUserOrg(data.data[0].org_id, data.data[0].org_name,data.data[0].org_industry);
          //   location.reload(true);
        }

      }
    });
  }

  setUserOrg(id: string, name: any,type:any) {

    this.userOrg.setOrg(id);
    this.userOrg.setOrgType(type);
    this.setUserOrgName(name);
    this.getUserDetails();
    this.changed_org_id = id;
    //  this.router.navigate(['/views/organization/detail/' + id]);
    //    location.reload(true);
    this.tokenService.removeRoleAccess();
    this.tokenService.removeRoleAccessName();
    this.getMemberID();

  }

  deleteOpen(content, id) {
    this.delete_org_Id = id;
    this.modalRef = this.modalService.open(content, { centered: true, size: 'sm' });

  }

  /*  Delete Organization */
  deleteOrganization() {
    this.orgService.deleteOrganization(this.delete_org_Id, this.token, this.userId).subscribe((data: any) => {
      if (data.rescode === 1) {
        this.toastr.success(data.message, 'Success');
        this.modalRef.close();
        this.userOrg.removeOrg();
        this.userOrg.removeOrgName();
        this.userOrg.removeOrgType();
        this.getUserOrg();

        location.reload(true);

      } else {
        this.toastr.error(data.message, 'Alert!');
      }
    });
  }

  setUserOrgName(name: string) {
    this.userOrg.setOrgName(name);
  }
  //  ________________"USER ORG ENDS"___________________________

  logout() {

    this.loginService.logout(this.userId, this.userType).subscribe((res: any) => {
      clearInterval(this.counterBack);
      this.closeModal();
      this.tokenService.removeToken();
      this.userOrg.removeOrg();
      this.userOrg.removeOrgName();
      this.tokenService.removeRoleAccess();
      this.tokenService.removeRoleAccessName();
      
      this.router.navigate(['/accounts']);
      // this.toastr.info(res.message,'Logout');

    },
      error => {

        this.toastr.warning('Request Failed', 'Logout');
        this.router.navigate(['/accounts']);

      });


  }

  public closeModal() {
    this.modalRef.close();
  }

  // other 
  getUserLogin(): void {

    this.loginService.sessionDetail(this.userId, this.userType).subscribe((res: any) => {
      if (res.data.length > 0) {
        this.userSession = res.data[0].lastloggedin;
      }
    },
      error => {

        this.toastr.warning('Request Failed', 'User Session!');

      });

  }

  public sessionTime(): void {

    this.loginService.sessionTime(this.userId, this.userType).subscribe((res: any) => {
      if (res.data.length > 0) {
        this.userTime = res.data;
      }

    },
      error => {

        this.toastr.warning('Request Failed', 'User Session!');

      });

  }

  public LogoutUser(sessionContent) {

    //  this.sessionTime();
    // this.startCountdown(10);
    //  if (this.sessionTime) {
    this.modalRef = this.modalService.open(sessionContent, { centered: true, size: 'sm' });

    //  }
  }

  // public  startCountdown(seconds) {
  //   this.counter = seconds;

  //   const interval = setInterval(() => {
  //     console.log(this.counter);
  //     this.counter = this.counter + 10;
  // if (this.counter > 90 ) {

  //       clearInterval(interval);
  //       this.logout();
  //       console.log('Ding!');
  //     };
  //   }, 1000);
  // };
  // tslint:disable-next-line: no-unused-expression

  listMemInvitations(): void {

    this.memServ.listInvitationMem(this.token, this.userId).subscribe((data: any) => {
      // console.log(data);
      if (data.rescode === 1 || data.rescode === 0) {
        console.log(data.data);
        this.memList = data.data;
        // this.imageSrc = data.data.org_logo;
      } else {
        //   this.toastr.error(data.message, 'Alert!');
      }
    });
  }
  // Accept Invitations Org
  accpetInvitation(invitedID: any): void {
    this.memServ.acceptMemIvitation(this.token, this.userId, invitedID).subscribe((data: any) => {
      if (data.rescode === 1) {
        this.listMemInvitations();
        this.toastr.success(data.message, 'SUCCESS!');
        //  this.memList = data.data;
        // this.imageSrc = data.data.org_logo;
      } else {
        this.toastr.error(data.message, 'Alert!');
      }
    });
  }

  // Reject Invitations Org
  rejectInvitation(invitedID: any): void {
    this.memServ.rejectMemIvitation(this.token, this.userId, invitedID).subscribe((data: any) => {
      if (data.rescode === 1) {
        this.listMemInvitations();
        this.toastr.success(data.message, 'SUCCESS!');
        //  this.memList = data.data;
        // this.imageSrc = data.data.org_logo;
      } else {
        this.toastr.error(data.message, 'Alert!');
      }
    });
  }
  openVerticallyCentered(content) {
    this.modalRef = this.modalService.open(content, {
      centered: true,backdrop: 'static',
      keyboard: false
    });
  }
}
