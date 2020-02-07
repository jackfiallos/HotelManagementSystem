import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { NoContentComponent } from './components/no-content/no-content.component';
import { LoginComponent } from './components/login/login.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    }, {
        path: 'bookings',
        loadChildren: () => import('./components/bookings').then(m => m.BookingsModule),
        canActivate: [AuthGuard]
    }, {
        path: 'guests',
        loadChildren: () => import('./components/guests').then(m => m.GuestsModule),
        canActivate: [AuthGuard]
    }, {
        path: 'payments',
        loadChildren: () => import('./components/payments').then(m => m.PaymentsModule),
        canActivate: [AuthGuard]
    }, {
        path: 'rooms',
        loadChildren: () => import('./components/rooms').then(m => m.RoomsModule),
        canActivate: [AuthGuard]
    }, {
        path: '**',
        component: NoContentComponent
    }
];
