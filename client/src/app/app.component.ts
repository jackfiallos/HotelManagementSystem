import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppState } from './app.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    private name = 'HMS';
    private openSidebar = false;
    private openNotifications = false;

    constructor(public _appState: AppState, private _titleService: Title) {}

    public ngOnInit() {
        this.name = environment.name;
        this._titleService.setTitle(`${environment.name} Admin`);
        console.log('Initial App State', this._appState.state);
    }
}
