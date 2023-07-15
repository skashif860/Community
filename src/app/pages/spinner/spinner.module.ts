import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes = [
  { path: '', component: SpinnerComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    NgbModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule
  ],
  declarations: [
    SpinnerComponent
  ],
  providers: []
})

export class SpinnerModule { }
