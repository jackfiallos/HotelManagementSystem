import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'list-payments',
    templateUrl: './payments.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PaymentsListComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
