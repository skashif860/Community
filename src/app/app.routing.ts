import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { SpinnerComponent } from './pages/spinner/spinner.component';

export const routes: Routes = [
  /*{
    path: '', component: PagesComponent,
    children: [
      { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
    ]
  },*/
  { path: '', loadChildren: './pages/accounts/accounts.module#AccountsModule' },
  { path: 'accounts', loadChildren: './pages/accounts/accounts.module#AccountsModule'},
  { path: 'verifyphonenumber/:param1', loadChildren: './pages/verifyphonenumber/verifyphonenumber.module#VerifyphonenumberModule' },
  { path: 'views', loadChildren: './pages/pages.module#PagesModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: 'dash', loadChildren: './pages/dashboard2/dashboard2.module#DashboardModule'  },
  { path: 'forgot-password', loadChildren: './pages/forgotpassword/forgotpassword.module#ForgotPasswordModule' },
  { path: 'change-password/:id1/:id2/:id3/:id4', loadChildren: './pages/changepassword/changepassword.module#ChangePasswordModule' },
  { path: 'subscribe/:param1', loadChildren: './pages/subscribe/subscribe.module#SubscribeModule' },
  { path: 'mem-response/:param1/:param2', loadChildren: './pages/memresponse/memresponse.module#MemresponseModule' },
  { path: '**', component: NotFoundComponent },
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, useHash: true
});
