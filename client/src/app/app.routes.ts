import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';

import { NoContentComponent } from './components/no-content/no-content.component';
import { LoginComponent } from './components/login/login.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'dashboard',
        loadChildren: './components/dashboard#DashboardModule'
    }, {
        path: 'bookings',
        loadChildren: './components/bookings#BookingsModule'
    }, {
        path: 'guests',
        loadChildren: './components/guests#GuestsModule'
    }, {
        path: 'payments',
        loadChildren: './components/payments#PaymentsModule'
    }, {
        path: 'rooms',
        loadChildren: './components/rooms#RoomsModule'
    }, {
        path: '**',
        component: NoContentComponent
    }
];
