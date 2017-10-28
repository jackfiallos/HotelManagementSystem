import { PaymentsListComponent } from './list/payments.list.component';
import { PaymentsFormComponent } from './form/payments.form.component';
import { PaymentsDetailComponent } from './detail/payments.detail.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: PaymentsListComponent
    }, {
        path: 'create',
        component: PaymentsFormComponent
    }, {
        path: 'edit',
        component: PaymentsFormComponent
    }, {
        path: 'view',
        component: PaymentsDetailComponent
    }]
}];
