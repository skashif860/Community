/* Core */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

/* Toasts */
import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

/* Modals HTML */
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

/* Loader */
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

import { SideChatComponent } from './theme/components/side-chat/side-chat.component';
/* App Imports */
import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
/* Services and Components*/
import { AppGlobal } from './shared/app.global';
import { TokenService } from './services/token-service';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

// import { EqualValidator } from './shared/equal-validator.directive';
import { AuthGuard } from './guards/auth.guard';
import { UserOrg } from './services/userorg.service';
import { AuthService } from './services/auth.service';
import { OrgService } from './services/org.service';
import {AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore , AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuthModule} from 'angularfire2/auth'
import { environment } from '../environments/environment';
import { NotifyService } from './services/notificaton.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LocationService } from './services/location.service';
import { EnvServiceProvider } from './env.service.provides';
import { ContactService } from './services/contact.service';
import { DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  // IMPORTS
  imports: [
    /* Core */
    BrowserModule,
    HttpClientModule,
    routing,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    
    NgxSpinnerModule,

    /* Toast */
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),

    /* Modals */
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ChartsModule
  ],

  // Components Declaration
  declarations: [
    /* Core */
    AppComponent,

    /* Default Pages */
    SearchComponent,
    NotFoundComponent,
    
  
    // EqualValidator
    /* New */
  ],

  // Services
  providers: [
    /*  Core */
    AppSettings,
    NgbActiveModal,
    AuthGuard,
    AngularFirestore,
    DatePipe,
    /* Custom */
    ContactService,
    AppGlobal, TokenService, AuthService, OrgService, UserOrg, NotifyService, LocationService, EnvServiceProvider
  ],
  bootstrap: [ AppComponent, ]
})
export class AppModule { }
