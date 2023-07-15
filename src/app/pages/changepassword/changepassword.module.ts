import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Services & Compononets
import {LoginService} from '../../services/login.service';
import { AppGlobal } from '../../shared/app.global';
import { ChangepasswordComponent } from './changepassword.component';
import { EqualValidator } from '../../shared/equal-validator.directive';


export const routes = [
  { path: '', component: ChangepasswordComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ ChangepasswordComponent, EqualValidator ],
  providers: [LoginService, AppGlobal]
})

export class ChangePasswordModule { }
