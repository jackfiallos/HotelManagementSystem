import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppState } from './app.service';
import { environment } from '../environments/environment';
import { AuthService } from './auth/authService';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    public name = 'HMS';
    public openSidebar = false;
    public openNotifications = false;

    constructor(
        public _appState: AppState,
        private _titleService: Title,
        private _router: Router,
        private _authenticationService: AuthService
    ) {}

    /**
     * [name description]
     * @type {[type]}
     */
    public ngOnInit() {
        this.name = environment.name;
        this._titleService.setTitle(`${environment.name} Admin`);
        console.log('Initial App State', this._appState.state);
    }

    /**
     * [e description]
     * @type {[type]}
     */
    public logout(e: MouseEvent) {
        e.preventDefault();
        this.openSidebar = false;
        this._authenticationService.removeToken();
        this._router.navigate(['/']);
    }
}
