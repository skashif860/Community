import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../../theme/directives/directives.module';

/* Google maps */
import { AgmCoreModule } from '@agm/core';
import { AgmMarkerSpiderModule } from 'agm-oms';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { LocationService } from 'src/app/services/location.service';
import { EnvServiceProvider } from 'src/app/env.service.provides';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,

    /* Google Maps */
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWSxU23FBdyEVTUNm1O2AM5DNqbqsJNl8'
    }),
    AgmMarkerSpiderModule,
    AgmJsMarkerClustererModule
  ],
  declarations: [
  ],
  providers: [LocationService, EnvServiceProvider]
})

export class TeamViewModule { }
