import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../theme/directives/directives.module';

// Angular powered Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AccountsComponent } from './accounts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { GoogleLoginProvider, FacebookLoginProvider, LoginOpt, AuthServiceConfig, AuthService } from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';
import { TokenService } from '../../services/token-service';
import { SetPassordComponent } from './setpassword/setpassword.component';

import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { browser } from 'protractor';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordMatch } from 'src/app/shared/pass-match.directive';
import { AppGlobal } from 'src/app/shared/app.global';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MemberService } from 'src/app/services/member.service';

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
    provider: new GoogleLoginProvider("732820930735-92u546mhouh6raqbetmsa1r5mqsbki5c.apps.googleusercontent.com", googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2034040636696170", fbLoginOptions)
  }
]);
export function provideConfig() {
  return config;
}
export const routes = [
  { path: '', component: AccountsComponent, pathMatch: 'full' },
  { path: 'setpassword/:param1/:param2', component: ResetpasswordComponent, pathMatch: 'full' },
  { path: 'verify/:param1/:param2', component: SetPassordComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent,
    AccountsComponent,
    SetPassordComponent,
    PasswordMatch,ResetpasswordComponent
    
  ],
  providers: [LoginService, RegisterService, TokenService, AuthService, MemberService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }]
})

export class AccountsModule { }
