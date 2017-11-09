import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';

import { AuthGuard } from './auth/auth.guard';
import { NoContentComponent } from './components/no-content/no-content.component';
import { LoginComponent } from './components/login/login.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'dashboard',
        loadChildren: './components/dashboard#DashboardModule',
        canActivate: [AuthGuard]
    }, {
        path: 'bookings',
        loadChildren: './components/bookings#BookingsModule',
        canActivate: [AuthGuard]
    }, {
        path: 'guests',
        loadChildren: './components/guests#GuestsModule',
        canActivate: [AuthGuard]
    }, {
        path: 'payments',
        loadChildren: './components/payments#PaymentsModule',
        canActivate: [AuthGuard]
    }, {
        path: 'rooms',
        loadChildren: './components/rooms#RoomsModule',
        canActivate: [AuthGuard]
    }, {
        path: '**',
        component: NoContentComponent
    }
];
