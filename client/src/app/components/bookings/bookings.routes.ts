import { BookingsListComponent } from './list/bookings.list.component';
import { BookingsFormComponent } from './form/bookings.form.component';
import { BookingsDetailComponent } from './detail/bookings.detail.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: BookingsListComponent
    }, {
        path: 'create',
        component: BookingsFormComponent
    }, {
        path: 'edit',
        component: BookingsFormComponent
    }, {
        path: 'view',
        component: BookingsDetailComponent
    }]
}];
