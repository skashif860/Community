import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets//canvasjs/canvasjs.min';
import { AppGlobal } from '../../../shared/app.global';
import { ToastrService } from 'ngx-toastr';
import { UserOrg } from '../../../services/userorg.service';
import { OrgService } from '../../../services/org.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token-service';
import { AttendanceService } from '../../../services/attendance.service';
import { parse } from 'url';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],

})
export class AttendanceComponent implements OnInit {


  public token: any;
  public org_id: any;
  public current_date = Date();
  public userId: any;
  public userdata: any;
  public userMsisdn: any;
  public count = [];
  public date: any;
  public dd: any;
  public mm: any;
  public yyyy: any;
  mem_count: any;

  constructor(router: Router, private config: AppGlobal, private toastr: ToastrService, private userOrg: UserOrg,
    private orgService: OrgService, private tokenService: TokenService, private attendService: AttendanceService) {

    //  get today's date
    const today_date = new Date();
    const day = today_date.getDate();
    const month = today_date.getMonth() + 1; // January is 0!
    const year = today_date.getFullYear();
    if (day < 10) {
      this.dd = '0' + day;
    } else {
      this.dd = day;
    }
    if (month < 10) {
      this.mm = '0' + month;
    } else {
      this.mm = month;
    }
    this.yyyy = year;
    this.date = this.yyyy + '-' + this.mm + '-' + this.dd;
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
    this.attendService.getStats(this.token, this.userId, this.org_id).subscribe((data: any) => {

      if (data.rescode === 1) {
        this.count[0] = data.data['attendance'];
        this.mem_count =  data.data['mem_count'];
        this.renderAttendanceChart();
        if (this.count[0].leave === 0 && this.count[0].present === 0 && this.count[0].absent === 0) {
          // this.toastr.info(data.message, 'Alert!');
        } else {
          // this.toastr.success(data.message, 'Alert!');
        }
      } else {
        if (this.org_id !== null) {
          //  this.toastr.error(data.message, 'Alert!');
        }
      }
    });
  }

  renderAttendanceChart(): void {
    
    if (this.count[0].leave === 0 && this.count[0].present === 0 && this.count[0].absent === 0) {

      // no records chart
      const chart = new CanvasJS.Chart('attendance', {
        theme: 'light2', // "light2", "dark1", "dark2"
        animationEnabled: true,
        title: {
          text: 'Attendance'
        },
        data: [{
          type: 'pie',
          showInLegend: false,
          toolTipContent: '<b>{name}</b>',
          dataPoints: [
            { y: 1, name: 'Unmarked', color: '#dc5b35' },
          ]
        }]
      });
      chart.render();
    } else {
      let unmarked: number;
      console.log( this.mem_count,this.count[0].present,this.count[0].leave,this.count[0].absent);
      // tslint:disable-next-line: radix
      unmarked = this.mem_count - this.count[0].present -
        // tslint:disable-next-line: radix
       this.count[0].leave - this.count[0].absent;
      console.log('unmarked', unmarked);
      // charts
      const chart = new CanvasJS.Chart('attendance', {
        theme: 'light2', // "light2", "dark1", "dark2"
        animationEnabled: true,
        title: {
          text: 'Attendance'
        },
        data: [{
          type: 'pie',
          showInLegend: false,
          toolTipContent: '<b>{name}</b>: {y} (#percent%)',
          indexLabel: '{name}:{y}',
          dataPoints: [
            // { y: 1, name: 'Present', color: '#3e9452'  },
            // { y: 1, name: 'On Leave', color: '#17a2b8' },
            // { y: 1, name: 'Absent', color: '#dc3545' },
            // tslint:disable-next-line: radix
            { y: parseInt(this.count[0].present), name: 'present', color: '#3e9452' },
            // tslint:disable-next-line: radix
           // { y: parseInt(this.count[0].leave), name: 'OnLeave', color: '#17a2b8' },
            // tslint:disable-next-line: radix
            { y: parseInt(this.count[0].absent), name: 'Absent', color: '#dc3545' },
            // tslint:disable-next-line: radix
            { y: unmarked, name: 'Unmarked', color: '#dc5b35' },
          ]
        }]
      });
      chart.render();
    }
  }
}
