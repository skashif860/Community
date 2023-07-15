
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { routing } from './pages.routing';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule} from 'ngx-toastr';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../theme/components/header/header.component';
import { FooterComponent } from '../theme/components/footer/footer.component';
import { SidebarComponent } from '../theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from '../theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from '../theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from '../theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from '../theme/components/back-top/back-top.component';
import { UserMenuComponent } from '../theme/components/user-menu/user-menu.component';
import { SubMenuComponent } from '../theme/components/menu/sub-menu/sub-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from '../theme/components/notifications/notification.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SideChatComponent } from '../theme/components/side-chat/side-chat.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../theme/components/side-chat/services/chat.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ExcelService } from '../services/excel.service';
@NgModule({
  
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, PerfectScrollbarModule,
    routing,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    NgxSpinnerModule,
  ],

  declarations: [
    PagesComponent, HeaderComponent,
    FooterComponent, SidebarComponent,
    VerticalMenuComponent, HorizontalMenuComponent,
    BreadcrumbComponent, BackTopComponent,
    SubMenuComponent,
    UserMenuComponent,
    NotificationComponent,
    SideChatComponent
  
    
    /* Components */
  ],
  providers: [
    ChatService,AngularFirestore,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    NgbActiveModal,
    ExcelService
      /* Services */
  ],
})
export class PagesModule { }
