import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';

import { NoContentComponent } from './components/no-content/no-content.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';

export const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'bookings', component: BookingsComponent },
    { path: '**', component: NoContentComponent }
];
