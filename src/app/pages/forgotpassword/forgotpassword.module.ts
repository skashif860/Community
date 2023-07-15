import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Services & Compononets
import {LoginService} from '../../services/login.service';
import { ForgotpasswordComponent } from './forgotpassword.component';


export const routes = [
  { path: '', component: ForgotpasswordComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotpasswordComponent],
  providers: [LoginService]
})

export class ForgotPasswordModule { }
