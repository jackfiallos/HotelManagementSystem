import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ROUTES } from './app.routes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// redux
import { StoreModule, ActionReducer, Action } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { bookingsReducer,
    guestsReducer,
    paymentsReducer,
    roomsReducer } from './ducks/index';

// set default environment
import { environment } from '../environments/environment';

// auth and request interceptor
import { ApiInterceptor } from './auth/api.interceptor';
import { AuthService } from './auth/authService';

// base component
import { AppComponent } from './app.component';

// Import application styles
import '../styles/index.scss';

// Generic Components
import { NoContentComponent } from './components/no-content/no-content.component';
import { LoginComponent } from './components/login/login.component';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

export function logger(reducer) {
    return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
    declarations: [
        AppComponent,
        NoContentComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES, {
            useHash: Boolean(history.pushState) === false,
            preloadingStrategy: PreloadAllModules
        }),
        // Redux module config
        StoreModule.forRoot({
            bookings: bookingsReducer,
            guests: guestsReducer,
            payments: paymentsReducer,
            rooms: roomsReducer
        }, {
            metaReducers
        })
    ],
    providers: [
        APP_PROVIDERS,
        // api interceptor provider
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
