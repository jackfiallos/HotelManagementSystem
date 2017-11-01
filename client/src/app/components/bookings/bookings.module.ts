import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { routes } from './bookings.routes';
import { BookingsListComponent } from './list/bookings.list.component';
import { BookingsFormComponent } from './form/bookings.form.component';
import { BookingsDetailComponent } from './detail/bookings.detail.component';

import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MatDatepickerModule,
        MatNativeDateModule,
        LoadingSpinnerModule,
    ],
    declarations: [
        BookingsListComponent,
        BookingsFormComponent,
        BookingsDetailComponent
    ]
})
export class BookingsModule {
    public static routes = routes;
}
