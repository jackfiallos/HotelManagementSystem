import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    private name = 'App';
    private openSidebar: boolean = false;
    private openNotifications: boolean = false;

    constructor(public appState: AppState) {}

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }
}
