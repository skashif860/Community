import { Component, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { AppGlobal } from '../../shared/app.global';
import { TokenService } from '../../services/token-service';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from '@angular/router';
import { UserOrg } from '../../services/userorg.service';
import { ToastrService } from 'ngx-toastr';
import * as CanvasJS from '../../../assets//canvasjs/canvasjs.min';
import { OrgService } from '../../services/org.service';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { SingleDataSet, Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { throws } from 'assert';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit{

  persons: any = [];
  public router: Router;
  public model: [];
  public token: any;
  public org_id: any;
  public userType: any;
  public userId: any;
  public customerBarChartData = true;


  public contentorgid: any;
  public userdata: any;
  public userMsisdn: any;
  public modalRef: NgbModalRef;
  public ShowAttendanceList = true;
  public ShowTimeinList: any;
  public ShowTimeoutList: any;
  public MODALS = {
    modal1: NgbModalRef,
    modal2: NgbModalRef
  };
  nameRole: string;
 
  people_count=0;
  team_count=0;
  pkg_count=0;
  ben_count=0
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },

  };
  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(28, 159, 199, 1)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(28, 159, 199, 1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    }]
  public barChartData: ChartDataSets[] = [
    { data: [], label: '#' }
  ];
  isAdminorOwner = false;
  orgType:number;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  // dtTrigger: Subject = new Subject();

  constructor(private toastr: ToastrService, private modalService: NgbModal, private orgService: OrgService,
    private tokenService: TokenService, private userOrg: UserOrg, router: Router) {
    this.router = router;

  }
  ngAfterViewInit(): void {
      const Role = this.tokenService.getRoleAccessName();
      if( Role === 'Owner' || Role === 'Admin'){
        this.isAdminorOwner = true;
      } else {
        this.isAdminorOwner = false;
        this.router.navigate(['/views/package']);
      }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {

    const orgID = this.userOrg.getOrg();
    this.orgType = this.userOrg.getOrgType();
    this.org_id = orgID;
    console.log('ORG type',this.orgType);
    console.log('ORG ID',this.org_id);

   // check if org is added
   if (this.org_id == null) {
    console.log('inside popup check');
    document.getElementById('btn12').click();
  } else {
    this.nameRole = this.tokenService.getRoleAccessName();
    console.log('admin check1' + this.nameRole);
    if (this.nameRole !== "Owner" && this.nameRole !== "Admin") {
      console.log('admin check' + this.nameRole);
      // document.getElementById('btn13').click();
    }

    const userdata = this.tokenService.getToken();
    if (userdata != null) {
      const tokendata = userdata.split('|');
      this.userMsisdn = tokendata[0];
      this.userId = tokendata[1];
      this.token = tokendata[2];
      this.userType = tokendata[3];

    }
  }
 
this.showgraph();
  }
   // Modal Open
 openOrgNotFound(content) {
  this.modalRef = this.modalService.open(content, {
    centered: true, backdrop: 'static',
    keyboard: false, size: 'sm'
  });
}
  showgraph(){
  this.orgService.getStats(this.userId,this.token,this.org_id).subscribe((data: any) => {
console.log(data.data.cards_data);
this.people_count=data.data.cards_data[0];
this.team_count=data.data.cards_data[1];
this.pkg_count=data.data.cards_data[2];
this.ben_count=data.data.cards_data[3];
this.barChartLabels =data.data[0];
let i=0;
let temp=[];
for(let row of this.barChartLabels){
  // this.barChartColors.push({
  //   backgroundColor: 'rgba(28, 159, 199, 1)',
  //   borderColor: 'rgba(105,159,177,1)',
  //   pointBackgroundColor: 'rgba(28, 159, 199, 1)',
  //   pointBorderColor: '#fafafa',
  //   pointHoverBackgroundColor: '#fafafa',
  //   pointHoverBorderColor: 'rgba(105,159,177)'
  // });
  if(data.data[1][i] != undefined)
  temp.push(data.data[1][i]);
  else
  temp.push(0);
  i++;
}
console.log(temp);
this.barChartData=[ { data: temp, label: '#' }];


    });
 this.customerBarChartData=true;
  }
  onSelect(type) {
    this.ShowAttendanceList = false;
    this.ShowTimeinList = false;
    this.ShowTimeoutList = false;
    if (type === 1) {
      this.ShowAttendanceList = true;
    } else if (type === 2) {
      this.ShowTimeinList = true;
    } else {
      this.ShowTimeoutList = true;
    }
  }

  modalClose() {
    this.modalRef.close();
  }
  close() {
    this.modalRef.close();
  }
  openVerticallyCentered(content) {
    this.modalRef = this.modalService.open(content, {
      centered: true, backdrop: 'static',
      keyboard: false
    });
  }

}


