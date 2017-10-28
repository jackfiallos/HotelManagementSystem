import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'list-guests',
    templateUrl: './guests.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GuestsListComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
