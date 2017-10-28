import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'list-bookings',
    templateUrl: './bookings.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BookingsListComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
