import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './payments.routes';
import { PaymentsListComponent } from './list/payments.list.component';
import { PaymentsFormComponent } from './form/payments.form.component';
import { PaymentsDetailComponent } from './detail/payments.detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PaymentsListComponent,
        PaymentsFormComponent,
        PaymentsDetailComponent
    ]
})
export class PaymentsModule {
    public static routes = routes;
}
