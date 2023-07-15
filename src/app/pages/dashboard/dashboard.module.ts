import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { DashboardComponent } from './dashboard.component';

// Angular powered Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Google maps */
import { AgmCoreModule } from '@agm/core';
//  Datatable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
//  Pagination
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AttendanceComponent } from './attendance/attendance.component';
import { SurveillanceComponent } from './surveillance/surveillance.component';

import {AttendanceListComponent} from './attendance.list/attendance.list.component';
import { TimeinComponent } from './timein/timein.component';
import {TimeinListComponent} from './timein.list/timein.list.component';
import { TimeoutComponent } from './timeout/timeout.component';
import {TimeoutListComponent} from './timeout.list/timeout.list.component';
import { AttendanceService } from '../../services/attendance.service';
import { TeamviewsComponent } from './teamview/teamview.component';
import { AgmMarkerSpiderModule } from 'agm-oms';
import { ChartsModule } from 'ng2-charts';
export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'attendancelist', component: AttendanceListComponent, pathMatch: 'full', data: { breadcrumb: 'Attendance List ' } },
  { path: 'timeinlist', component: TimeinListComponent, pathMatch: 'full', data: { breadcrumb: 'TimeIn List ' } },
  { path: 'timeoutlist', component: TimeoutListComponent, pathMatch: 'full', data: { breadcrumb: 'TimeOut List ' } },
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxDatatableModule ,
    DirectivesModule,
    AgmMarkerSpiderModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),

      /* Google Maps */
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDh0tEzFJEzwFKkAmeWi_7gG4cCPZR7wlk'
      }),
      AgmJsMarkerClustererModule,
      DataTablesModule,
      ChartsModule
      
  ],
  declarations: [
    DashboardComponent,
    AttendanceComponent,
    AttendanceListComponent,
    TimeinComponent,
    TimeinListComponent,
    TimeoutComponent,
    TimeoutListComponent,
    SurveillanceComponent,
    TeamviewsComponent
  ],
  providers: [AttendanceService]
})

export class DashboardModule { }
