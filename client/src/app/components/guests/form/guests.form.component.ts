import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { GuestsController } from '../../../ducks/guests/guests.controller';
import { types as GuestTypes } from '../../../ducks/guests/guests.types';

@Component({
    selector: 'form-guests',
    templateUrl: './guests.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GuestsFormComponent implements OnInit {
    private guest$: any;

    private genders: any[] = [{
        id: 'M',
        name: 'Male'
    }, {
        id: 'F',
        name: 'Female'
    }];

    private form: any = {
        first_name: '',
        last_name: '',
        phone: '',
        mobile: '',
        city: '',
        country: '',
        email: '',
        organization: '',
        age: 30,
        gender: ''
    };

    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-11-01
     * @param   {[type]} private [description]
     * @param   {[type]} private [description]
     * @param   {[type]} private [description]
     * @param   {[type]} private [description]
     * @param   {[type]} private [description]
     * @return  {[type]} [description]
     */
    constructor(private _router: Router, private _guest: GuestsController, private _store: Store<any>) {
        _store.select('guests').subscribe((response) => {
            this.guest$ = response;
        });
    }

    /**
     * [sub description]
     * @type {[type]}
     */
    public ngOnInit() { }

    /**
     * [e description]
     * @type {[type]}
     */
    private onSubmit(e: MouseEvent) {
        e.preventDefault();

        // dispatch create
        this._store.dispatch({
            type: GuestTypes.CREATE_GUESTS
        });

        // request create booking
        this._guest.createGuest(this.form).finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this._store.dispatch({
                type: GuestTypes.CREATE_GUESTS_SUCCESS,
                payload: data
            });

            this._router.navigate(['/guests/view', data.id]);
        }, (error: any) => {
            this._store.dispatch({
                type: GuestTypes.CREATE_GUESTS_FAILURE,
                error: error.error
            });
        });
    }
}
