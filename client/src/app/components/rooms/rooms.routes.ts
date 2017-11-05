import { RoomsListComponent } from './list/rooms.list.component';
import { RoomsFormComponent } from './form/rooms.form.component';
import { RoomsDetailComponent } from './detail/rooms.detail.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: RoomsListComponent
    }, {
        path: 'create',
        component: RoomsFormComponent
    }, {
        path: 'edit/:id',
        component: RoomsFormComponent
    }, {
        path: 'view/:id',
        component: RoomsDetailComponent
    }]
}];
