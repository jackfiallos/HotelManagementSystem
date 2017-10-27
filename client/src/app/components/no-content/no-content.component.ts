import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-no-content',
    templateUrl: './no-content.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NoContentComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
