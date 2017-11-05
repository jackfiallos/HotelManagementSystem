import { GuestsListComponent } from './list/guests.list.component';
import { GuestsFormComponent } from './form/guests.form.component';
import { GuestsDetailComponent } from './detail/guests.detail.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: GuestsListComponent
    }, {
        path: 'create',
        component: GuestsFormComponent
    }, {
        path: 'edit/:id',
        component: GuestsFormComponent
    }, {
        path: 'view/:id',
        component: GuestsDetailComponent
    }]
}];
