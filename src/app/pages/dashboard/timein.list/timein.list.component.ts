import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobal } from '../../../shared/app.global';
import { ToastrService } from 'ngx-toastr';
import { UserOrg } from '../../../services/userorg.service';
import { OrgService } from '../../../services/org.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { TokenService } from '../../../services/token-service';
import { AttendanceService } from '../../../services/attendance.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timein-list',
  templateUrl: './timein.list.component.html',
  styleUrls: ['./timein.list.component.scss']
})
export class TimeinListComponent implements OnInit {
  public router;
  public token: any;
  public org_id: any;
  public userId: any;
  public userdata: any;
  public userMsisdn: any;
  public count = [];
  Early = [];
  OnTime = [];
  Late = [];
  temp1 = [];
  temp2 = [];
  temp3 = [];
  EarlyEmpty;
  OnTimeEmpty;
  LateEmpty;
  public modalRef: NgbModalRef;

  constructor(router: Router, private config: AppGlobal, private toastr: ToastrService, private userOrg: UserOrg,
    private orgService: OrgService, private tokenService: TokenService, private attendService: AttendanceService,
    private modalService: NgbModal, private dash: DashboardComponent) {
    this.router = router;
    
  }
  ngOnInit() {
    // get user details
    this.getUserDetail();
    // get timin stats
    this.getTimeIn();
  }

  getUserDetail() {
    // get user details
    const userdata = this.tokenService.getToken();
    // get user org
    const orgID = this.userOrg.getOrg();
    this.org_id = orgID;
    if (userdata != null) {
      const tokendata = userdata.split('|');
      this.userMsisdn = tokendata[0];
      this.userId = tokendata[1];
      this.token = tokendata[2];
    }
  }

  getTimeIn(): void {
    this.attendService.getEventDetail(this.token, this.userId, this.org_id, 'timein').subscribe((data: any) => {
  
      if (data.rescode === 1) {
        // get early
        const early_list = [];
        const ontime_list = [];
        const late_list = [];

        for (let i = 0; i < data.data.early.length; i++) {
          early_list.push({
            member_id: data.data.early[i].attend_mem_id,
            member_name: data.data.early[i].attend_mem_name,
            member_img: data.data.early[i].sub_image,
            member_desg: data.data.early[i].attend_mem_designation,
            member_entry_time: data.data.early[i].attend_entry_time
          });
        }
        for (let i = 0; i < data.data.ontime.length; i++) {
          ontime_list.push({
            member_id: data.data.ontime[i].attend_mem_id,
            member_name: data.data.ontime[i].attend_mem_name,
            member_img: data.data.ontime[i].sub_image,
            member_desg: data.data.ontime[i].attend_mem_designation,
            member_entry_time: data.data.ontime[i].attend_entry_time
          });
        }
        for (let i = 0; i < data.data.late.length; i++) {
          late_list.push({
            member_id: data.data.late[i].attend_mem_id,
            member_name: data.data.late[i].attend_mem_name,
            member_img: data.data.late[i].sub_image,
            member_desg: data.data.late[i].attend_mem_designation,
            member_entry_time: data.data.late[i].attend_entry_time
          });

        }
        // check for data
        if (early_list.length > 0) {
          this.Early = early_list;
          this.temp1 = early_list;
        } else {
          this.EarlyEmpty = true;
        }
        if (ontime_list.length > 0) {
          this.OnTime = ontime_list;
          this.temp2 = ontime_list;
        } else {
          this.OnTimeEmpty = true;
        }
        if (late_list.length > 0) {
          this.Late = late_list;
          this.temp3 = late_list;
        } else {
          this.LateEmpty = true;
        }

      } else {
        this.toastr.error(data.message, 'Alert!');
      }
    });
  }

  getTimeIn2() {
    this.attendService.getEventDetail(this.token, this.userId, this.org_id, 'timein').subscribe((data: any) => {
    
      if (data.rescode === 1) {
        // get early
        const early_list = [];
        const ontime_list = [];
        const late_list = [];

        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].attend_event_type === 'early') {

            early_list.push({
              member_name: data.data[i].attend_mem_name,
              member_img: data.data[i].sub_image,
              memeber_desg: data.data[i].attend_mem_designation,
            });
          } else if (data.data[i].attend_event_type === 'ontime') {
            ontime_list.push({
              member_name: data.data[i].attend_mem_name,
              member_img: data.data[i].sub_image,
              memeber_desg: data.data[i].attend_mem_designation,
            });
          } else {
            late_list.push({
              member_name: data.data[i].attend_mem_name,
              member_img: data.data[i].sub_image,
              memeber_desg: data.data[i].attend_mem_designation,
            });
          }
        }

        // check for data
        if (early_list.length > 0) {
          this.Early = early_list;
        } else {
          this.EarlyEmpty = true;
        }
        if (ontime_list.length > 0) {
          this.OnTime = ontime_list;
        } else {
          this.OnTimeEmpty = true;
        }
        if (late_list.length > 0) {
          this.Late = late_list;
        } else {
          this.LateEmpty = true;
        }
      } else {
        this.toastr.error(data.message, 'Alert!');
      }
    });
  }

  EarlyFilter(event) {
    console.log(event.target.value);
    const val = event.target.value.toLowerCase();
    const update_data = this.temp1.filter(function(d) {
      console.log(d);
      return d.member_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.Early = update_data;

  }
  OnTimeFilter(event) {
    console.log(event.target.value);
    const val = event.target.value.toLowerCase();
    const update_data = this. temp2.filter(function(d) {
      console.log(d);
      return d.member_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.OnTime = update_data;

  }
  LateFilter(event) {
    console.log(event.target.value);
    const val = event.target.value.toLowerCase();
    const update_data = this.temp3.filter(function(d) {
      console.log(d);
      return d.member_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.Late = update_data;

  }
 
  modalClose(data: any) {
    this.dash.modalClose();
    this.router.navigate(['views/people/detail/' + data ]);
  }
}
