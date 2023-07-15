import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobal } from '../../../shared/app.global';
import { ToastrService } from 'ngx-toastr';
import { UserOrg } from '../../../services/userorg.service';
import { OrgService } from '../../../services/org.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token-service';
import { AttendanceService } from '../../../services/attendance.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance.list.component.html',
  styleUrls: ['./attendance.list.component.scss'],

})
export class AttendanceListComponent implements OnInit {
  public router;
  public token: any;
  public org_id: any;
  public userId: any;
  public userdata: any;
  public userMsisdn: any;
  public count = [];
  present = [];
  leave = [];
  absent = [];
  temp1 = [];
  temp2 = [];
  temp3 = [];
  presentEmpty;
  absentEmpty;
  leaveEmpty;
  public modalRef: NgbModalRef;

  constructor(router: Router, private config: AppGlobal, private toastr: ToastrService, private userOrg: UserOrg,
    private orgService: OrgService, private tokenService: TokenService, private attendService: AttendanceService,
    private modalService: NgbModal, private dash: DashboardComponent) {
      this.router = router;
  }
  ngOnInit() {
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
    this.getAttendance();
  }


  getAttendance(): void {
    console.log('attendance:');
    this.attendService.getEventDetail(this.token, this.userId, this.org_id, 'attendance').subscribe((data: any) => {

      if (data.rescode === 1) {
        //  console.log('attendance:', data);
        // get present
        const present_list = [];
        const absent_list = [];
        const leave_list = [];
        for (let i = 0; i < data.data.length; i++) {
          //  console.log('present:',data.data[i].attend_event_type === 'present');
          //  console.log('absent:',data.data[i].attend_event_type === 'absent');
          if (data.data[i].attend_event_type === 'present') {

            present_list.push({
              member_id: data.data[i].attend_mem_id,
              member_name: data.data[i].attend_mem_name,
              member_img: data.data[i].sub_image,
              member_desg: data.data[i].attend_mem_designation,
            });
          } else if (data.data[i].attend_event_type === 'absent') {
            absent_list.push({
              member_id: data.data[i].attend_mem_id,
              member_name: data.data[i].attend_mem_name,
              member_img: data.data[i].sub_image,
              member_desg: data.data[i].attend_mem_designation,
            });
            //  console.log('absent:',absent_list);
          } else {
            leave_list.push({
              member_id: data.data[i].attend_mem_id,
              member_name: data.data[i].attend_mem_name,
              member_img: data.data[i].sub_image,
              member_desg: data.data[i].attend_mem_designation,
            });
          }
        }

        // check for data
        if (present_list.length > 0 ) {
          this.present = present_list;
          this.temp1 = present_list;
        } else {
          this.presentEmpty = true;
        }
        if (absent_list.length > 0 ) {
          this.absent = absent_list;
          this.temp2 = absent_list;
        } else {
          this.absentEmpty = true;
        }
        if (leave_list.length > 0 ) {
          this.leave = leave_list;
          this.temp3  = leave_list;
        } else {
          this.leaveEmpty = true;
        }
      } else {
        this.toastr.error(data.message, 'Alert!');
      }
    });
  }

  PresentFilter(event) {
    console.log(event.target.value);
    const val = event.target.value.toLowerCase();
    const update_data = this.temp1.filter(function(d) {
      console.log(d);
      return d.member_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.present = update_data;
    console.log("p",this.present);
  }
  AbsentFilter(event) {
    console.log(event.target.value);
    const val = event.target.value.toLowerCase();
    const update_data = this.temp2.filter(function(d) {
      console.log(d);
      return d.member_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.absent = update_data;
console.log('A', this.absent)
  }
  LeaveFilter(event) {
    console.log(event.target.value);
    const val = event.target.value.toLowerCase();
    const update_data = this.temp3.filter(function(d) {
      console.log(d);
      return d.member_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.leave = update_data;

  }
  modalClose(data: any) {
    this.dash.modalClose();
    this.router.navigate(['views/people/detail/' + data ]);
  }
}
