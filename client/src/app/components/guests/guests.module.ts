import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './guests.routes';
import { GuestsListComponent } from './list/guests.list.component';
import { GuestsFormComponent } from './form/guests.form.component';
import { GuestsDetailComponent } from './detail/guests.detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        GuestsListComponent,
        GuestsFormComponent,
        GuestsDetailComponent
    ]
})
export class GuestsModule {
    public static routes = routes;
}
