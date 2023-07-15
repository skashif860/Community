import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets//canvasjs/canvasjs.min';
import { AppGlobal } from '../../../shared/app.global';
import { ToastrService } from 'ngx-toastr';
import { UserOrg } from '../../../services/userorg.service';
import { OrgService } from '../../../services/org.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token-service';
import { AttendanceService } from '../../../services/attendance.service';
@Component({
  selector: 'app-timein',
  templateUrl: './timein.component.html',
  styleUrls: ['./timein.component.scss']
})
export class TimeinComponent implements OnInit {

  public token: any;
  public org_id: any;
  public current_date = Date();
  public userId: any;
  public userdata: any;
  public userMsisdn: any;
  public count = [];
  public data = {
    "attendance":
    {
      "present": 0,
      "absent": 0,
      "leave": 0
    },
    "timein":
    {
      "ontime": 0,
      "late": 0,
      "early": "13"
    },
    "timeout":
    {
      "ontime": 0,
      "late": 0,
      "early": 0
    },
  };
  "extra": [];

  public date: any;
  public dd: any;
  public mm: any;
  public yyyy: any;


  constructor(router: Router, private config: AppGlobal, private toastr: ToastrService, private userOrg: UserOrg,
    private orgService: OrgService, private tokenService: TokenService, private attendService: AttendanceService) {
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
      this.date = this.yyyy + '-' + this.mm + '-' +  this.dd;
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
    this.getTimeIn();
  }

  getTimeIn(): void {
    this.attendService.getStats(this.token, this.userId, this.org_id).subscribe((data: any) => {
      if (data.rescode === 1) {
        this.count[0] = data.data['timein'];
        this.renderTimeInChart();
        if (this.count[0].ontime === 0 && this.count[0].late === 0 && this.count[0].early === 0) {
         // this.toastr.info(data.message, 'Alert!');
        } else {
          // this.toastr.success(data.message, 'Alert!');
        }
      } else {
        if(this.org_id !== null){
         //  this.toastr.error(data.message, 'Alert!');
        }
      }
    });
  }
  renderTimeInChart(): void {
    if (this.count[0].ontime === 0 && this.count[0].late === 0 && this.count[0].early === 0) {
      // no records chart
      const chart = new CanvasJS.Chart('Time In', {
        theme: 'light2', // "light2", "dark1", "dark2"
        animationEnabled: true,
        title: {
          text: 'Time In'
        },
        data: [{
          type: 'pie',
          showInLegend: false,
          toolTipContent: '<b>{name}</b>',
          dataPoints: [
            { y: 1, name: 'No Record(s) Found', color: '#dc5b35' },
          ]
        }]
      });
      chart.render();
    } else {
      // charts
      const chart = new CanvasJS.Chart('Time In', {
        theme: 'light2', // "light2", "dark1", "dark2"
        animationEnabled: true,
        title: {
          text: 'Time In'
        },
        data: [{
          type: 'pie',
          showInLegend: false,
          toolTipContent: '<b>{name}</b>: {y} (#percent%)',
          indexLabel: '{name}: {y}',
          dataPoints: [
            // tslint:disable-next-line: radix
            { y: parseInt(this.count[0].ontime), name: 'onTime', color: '#3e9452' },
            // tslint:disable-next-line: radix
            { y: parseInt(this.count[0].early), name: 'early', color: '#17a2b8' },
            // tslint:disable-next-line: radix
            { y: parseInt(this.count[0].late), name: 'late', color: '#dc3545' },
          ]
        }]
      });
      chart.render();
    }
  }

}
