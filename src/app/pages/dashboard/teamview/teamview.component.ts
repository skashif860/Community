import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { AppGlobal } from 'src/app/shared/app.global';
import { TokenService } from 'src/app/services/token-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamlocationService } from 'src/app/services/teamlocation.service';
import { UserOrg } from 'src/app/services/userorg.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { LocationService } from '../../../services/location.service';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-teamview',
  templateUrl: './teamview.component.html',
  styleUrls: ['./teamview.component.scss'],
})
export class TeamviewsComponent implements OnInit {

  public org_id: any;
  locpin1;
  userMsisdn: any;
  previous;
  userId: any;
  nameRole: any;
  token: any;
  code: any;
  userType: any;
  teams: any[] = [];
  allOrgMemLoc: any = []; // all org members locs
  currentDTM: any;
  public modalRef: NgbModalRef;
  AllMembersOfAllTeams: any[] = [];
  public model: any = {
    orgLat: '',
    orgLong: ''
  };
  public router: Router;
  DUMMY: string;
  Locations: any;
  temp_locs: any=[];
  constructor(
    router: Router,
    private userOrg: UserOrg,
    private teamlocserv: TeamlocationService,
    private tokenService: TokenService,
    private config: AppGlobal,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private locService: LocationService,
    private envService: EnvService
  ) {
    this.router = router;
    // this.generateTeamView();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // console.log('menu:', this.envService.verticalMenuItems);
    this.locpin1 = this.config.LOC_PIN;
    this.DUMMY = this.config.DUMMY_USER;
    // get user org
    const orgID = this.userOrg.getOrg();
    this.org_id = orgID;

    if (this.org_id == null) {
      console.log('inside popup check');
      // this.openOrgNotFound('orgNotFound');
      document.getElementById('btn11').click();
    } else {
      this.nameRole = this.tokenService.getRoleAccessName();
      console.log('admin check1' + this.nameRole);
      if (this.nameRole !== "Owner" && this.nameRole !== "Admin") {
        console.log('admin check' + this.nameRole);
        document.getElementById('btn13').click();
      }
    }

    // get user data
    const userdata = this.tokenService.getToken();
    if (userdata != null) {
      const tokendata = userdata.split('|');
      this.userMsisdn = tokendata[0];
      this.userId = tokendata[1];
      this.token = tokendata[2];
      this.userType = tokendata[3];
    } else {
      this.tokenService.removeToken();
      this.router.navigate(['/accounts']);
    }
    this.getOrgLocs();
    // generate team location
    this.generateTeamView();
    // setTimeout(this.generateTeamView, 3000);
    // setInterval(() => {
    //   this.generateTeamView();
    //   console.log('allloc', this.allOrgMemLoc);
    // }, 60000);

    // tslint:disable-next-line:triple-equals


    // console.log("allloc", this.allOrgMemLoc);
    // console.log("alltoall", this.AllMembersOfAllTeams);
    // console.log('names',this.orgTeamsid);
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

  // Modal Open
  openOrgNotFound(content) {
    this.modalRef = this.modalService.open(content, {
      centered: true, backdrop: 'static',
      keyboard: false
    });
  }

  getOrgLocs() {
    this.locService.getLocations(this.token, this.userId, this.org_id).subscribe((data: any) => {
      console.log(data);
      if (data.rescode === 1) {
        this.Locations = data.data[0];
      }
      //  console.log(this.Locations);
    });
  }
  generateTeamView(): void {
    this.UserCurrentTime();
    this.getAllOrgMembers();
  }
  getAllOrgMembers(): void {
    this.teamlocserv
      .getAllOrgMembers(this.token, this.userId, this.org_id)
      .subscribe((data: any) => {
        // console.log('API_response:', data);
        this.code = data.rescode;
        if (data.rescode === this.config.SUCCESS_CODE) {
          this.teams = data.data.teams;
          // console.log('org_teams:', this.teams);
          this.allOrgMemLoc = data.data.locs;
          this.temp_locs = this.allOrgMemLoc;
          //  console.log('org_member_locations:', this.allOrgMemLoc );
          let i = 0;
          for (const row of this.allOrgMemLoc) {
            console.log('loc dtm:',  new Date(this.currentDTM).getTime());
            let minutes = Math.floor(
              Math.abs(
                new Date(this.currentDTM).getTime() -
                new Date(row.locdtm).getTime()
              ) /
              1000 /
              60
            );
            console.log('calcuted time:',  Math.abs(
              new Date(this.currentDTM).getTime() -
              new Date(row.locdtm).getTime()
            ) /
            1000 /
            60 )
            console.log('usertime:', minutes);
            if (minutes < 0) {
              minutes = minutes * -1;
            }
            if (minutes > 30) {
              //  console.log('res=', minutes);
              
              this.allOrgMemLoc[i]['icon'] = this.config.LOC_RED_PIN;
            } else if (minutes > 5 && minutes <= 30) {
              this.allOrgMemLoc[i]['icon'] = this.config.LOC_YELLOW_PIN;
            } else if (minutes <= 5) {
              this.allOrgMemLoc[i]['icon'] = this.config.LOC_GREEN_PIN;
            }
            i++;
          }
           console.log('locs_with_icons:', this.allOrgMemLoc);

        } else if (data.rescode === 4) {

          this.model.orgLat = parseFloat(data.data.locs.loclat);
          this.model.orgLong = parseFloat(data.data.locs.loclon);

        } else {
          //  this.toastr.info('No location Found', 'Message!');
        }
      });
  }
  teamChanged(team_id: any) {
    // tslint:disable-next-line: radix
    const t_id = parseInt(team_id);
    //  this.allOrgMemLoc.splice(0, this.allOrgMemLoc.length);
    if (team_id === '') {
      this.generateTeamView();
    } else if (team_id === '0') {
    } else {
      this.populateMarkers(t_id);
    }
  }
  populateMarkers(team_id: any) {
    console.log('team_changed(team_id):', team_id);
    console.log('temp_locs):',this.temp_locs);
    const update_data = this.temp_locs.filter(function (d) {
      return d.team_id === team_id;
    });
  
    // console.log('team(' + team_id + ')members_locs:', this.allOrgMemLoc);
    let i = 0;
    for (const row of update_data) {
      let minutes = Math.floor(
        Math.abs(
          new Date(this.currentDTM).getTime() -
          new Date(row.locdtm).getTime()
        ) /
        1000 /
        60
      );
      if (minutes < 0) {
        minutes = minutes * -1;
      }
      if (minutes > 30) {
        //  console.log('res=', minutes);
        update_data[i]['icon'] = this.config.LOC_RED_PIN;
      } else if (minutes > 5 && minutes <= 30) {
        update_data[i]['icon'] = this.config.LOC_YELLOW_PIN;
      } else if (minutes <= 5) {
        update_data[i]['icon'] = this.config.LOC_GREEN_PIN;
      }
      this.allOrgMemLoc = update_data;
      i++;
    }
  }
  UserCurrentTime(): void {
    this.teamlocserv
      .getUserTime(this.token, this.userId)
      .subscribe((data: any) => {
        if (data.rescode === 1) {
          this.currentDTM = data.data;
          // console.log(this.currentDTM);
        }
      });
  }
  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }


}
