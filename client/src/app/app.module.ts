import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ROUTES } from './app.routes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState } from './app.service';
import { AuthGuard } from './auth/auth.guard';

// redux
import { StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authReducer,
    bookingsReducer,
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
import { LoadingSpinnerModule } from './components/loading-spinner/loading-spinner.module';

// Import application styles
import '../styles/index.scss';

// Generic Components
import { NoContentComponent } from './components/no-content/no-content.component';
import { LoginComponent } from './components/login/login.component';

import { AuthController } from './ducks/auth/auth.controller';
import { BookingsController } from './ducks/bookings/bookings.controller';
import { GuestsController } from './ducks/guests/guests.controller';
import { PaymentsController } from './ducks/payments/payments.controller';
import { RoomsController } from './ducks/rooms/rooms.controller';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    Title,
    AppState,
    AuthGuard,
    AuthController,
    BookingsController,
    GuestsController,
    PaymentsController,
    RoomsController
];

export function logger(reducer) {
    return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer) {
    return localStorageSync({
        rehydrate: true,
        keys: [
            'auth',
            'bookings',
            'guests',
            'payments',
            'rooms'
        ]
    })(reducer);
}

export const metaReducers = environment.production ? [localStorageSyncReducer] : [logger, localStorageSyncReducer];

@NgModule({
    declarations: [
        AppComponent,
        NoContentComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        LoadingSpinnerModule,
        RouterModule.forRoot(ROUTES, {
            useHash: Boolean(history.pushState) === false,
            preloadingStrategy: PreloadAllModules
        }),
        // Redux module config
        StoreModule.forRoot({
            auth: authReducer,
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
