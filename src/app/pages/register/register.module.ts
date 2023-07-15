import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Services & Compononets
import { RegisterComponent } from './register.component';
import { VerifyComponent } from './verify.component';
import {RegisterService} from '../../services/register.service';
import {OrgService} from '../../services/org.service';
import { SavepasswordComponent } from './savepassword/savepassword.component';
import { SocialLoginModule, AuthServiceConfig, AuthService, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { PasswordMatch } from '../../shared/pass-match.directive';
import moment from 'moment-timezone';

const fbLoginOptions: LoginOpt = {
  scope: 'email',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions: LoginOpt = {
  scope: 'email',
  return_scopes: true,
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

const linkdinLoginOptions: LoginOpt = {
  scope: 'email',
  return_scopes: true,
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("286810927253-ts7selnk52c0imkdo3ep1rq21b4is61h.apps.googleusercontent.com", googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1317934088372160", fbLoginOptions)
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("86sr0kgs367c7p")
  }
]);
export function provideConfig() {
  return config;
}
 
export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' },
  { path: 'verify/:param1/:param2', component: VerifyComponent, pathMatch: 'full' },
  { path: 'save-password/:param1', component: SavepasswordComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterComponent, VerifyComponent, SavepasswordComponent],

  providers: [RegisterService, OrgService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }]
})

export class RegisterModule { }
