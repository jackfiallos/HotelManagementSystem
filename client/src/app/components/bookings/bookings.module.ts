import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { routes } from './bookings.routes';
import { BookingsListComponent } from './list/bookings.list.component';
import { BookingsFormComponent } from './form/bookings.form.component';
import { BookingsDetailComponent } from './detail/bookings.detail.component';

import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { SearchFilterModule } from '../../pipes/searchFilter/searchFilter.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AngularMultiSelectModule,
        LoadingSpinnerModule,
        SearchFilterModule
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
