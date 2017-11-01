import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

@Component({
    selector: 'form-bookings',
    templateUrl: './bookings.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BookingsFormComponent implements OnInit {
    constructor(private dateAdapter: DateAdapter<NativeDateAdapter>) {
        this.dateAdapter.setLocale('en-GB');
    }
    ngOnInit() { }
}
