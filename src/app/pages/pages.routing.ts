import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: 'index', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', data: { breadcrumb: 'Profile' } },
            { path: 'routes', loadChildren: './viewroutes/viewroutes.module#ViewRoutesModule', data: { breadcrumb: 'Routes' } },
             // tslint:disable-next-line: max-line-length
            { path: 'spinner', loadChildren: './spinner/spinner.module#SpinnerModule' },
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
