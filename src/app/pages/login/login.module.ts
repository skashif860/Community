import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import {LoginService} from '../../services/login.service';
import { GoogleLoginProvider, FacebookLoginProvider, LoginOpt, AuthServiceConfig, AuthService } from 'angularx-social-login';
import { PasswordMatch } from '../../shared/pass-match.directive';

const fbLoginOptions: LoginOpt = {
  scope: 'email',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions: LoginOpt = {
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
  }
]);
export function provideConfig() {
  return config;
}
 
export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent],
  providers: [LoginService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }]
})

export class LoginModule { }
