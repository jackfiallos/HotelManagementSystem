import { DashboardComponent } from './home/dashboard.home.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: DashboardComponent
    }]
}];
