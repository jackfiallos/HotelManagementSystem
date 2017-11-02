import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { BookingsController } from '../../../ducks/bookings/bookings.controller';
import { RoomsController } from '../../../ducks/rooms/rooms.controller';
import { GuestsController } from '../../../ducks/guests/guests.controller';
import { types as BookingTypes } from '../../../ducks/bookings/bookings.types';
import { types as RoomTypes } from '../../../ducks/rooms/rooms.types';
import { types as GuestTypes } from '../../../ducks/guests/guests.types';

@Component({
    selector: 'form-bookings',
    templateUrl: './bookings.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BookingsFormComponent implements OnInit {
    private booking$: any;
    private rooms$: any;
    private guests$: any;

    private guestControl: FormControl = new FormControl();
    private guestOptions: any[] = [];
    private guestFiltered: Observable<any[]>;

    private form: any = {
        checkin: new Date(),
        checkout: new Date(),
        adults: 1,
        children: 0,
        guest_id: null,
        room_id: null,
        comments: null
    }

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
    constructor(private route: ActivatedRoute, private _bookings: BookingsController, private _room: RoomsController, private _guest: GuestsController, private _store: Store<any>, private dateAdapter: DateAdapter<NativeDateAdapter>) {
        this.dateAdapter.setLocale('en-US');

        _store.select('bookings').subscribe((response) => {
            this.booking$ = response;
        });

        _store.select('rooms').subscribe((response) => {
            this.rooms$ = response;
        });

        _store.select('guests').subscribe((response) => {
            this.guests$ = response;
        });
    }

    /**
     * [sub description]
     * @type {[type]}
     */
    public ngOnInit() {
        this._store.dispatch({
            type: GuestTypes.LIST_GUESTS
        });

        // request guest list
        this._guest.getGuests().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this.guestOptions = _.map(data, (guest) => {
                const email = (guest.email !== null) ? `(${guest.email})` : '';
                return Object.assign({}, {
                    id: guest.uid,
                    name: `${guest.first_name} ${guest.last_name} ${email}`
                });
            });

            this.guestFiltered = this.guestControl.valueChanges
                .startWith(null)
                    .map((guest) => {
                        return (guest && typeof guest === 'object') ? guest.name : guest;
                    })
                    .map((name) => {
                        return name ? this.filter(name) : this.guestOptions.slice();
                    });

            this._store.dispatch({
                type: GuestTypes.LIST_GUESTS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: GuestTypes.LIST_GUESTS_FAILURE,
                error: error.error
            });
        });

        this._store.dispatch({
            type: RoomTypes.LIST_ROOMS
        });

        this._room.getRooms().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this._store.dispatch({
                type: RoomTypes.LIST_ROOMS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: RoomTypes.LIST_ROOMS_FAILURE,
                error: error.error
            });
        });
    }

    /**
     * [e description]
     * @type {[type]}
     */
    private onSubmit(e: MouseEvent) {
        e.preventDefault();

        // get guest id value
        this.form.guest_id = this.guestControl.value ? this.guestControl.value.id : null,

        // dispatch create
        this._store.dispatch({
            type: BookingTypes.CREATE_BOOKINGS,
            payload: this.form
        });

        // request create booking
        this._bookings.createBooking(this.form).finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this._store.dispatch({
                type: BookingTypes.CREATE_BOOKINGS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: BookingTypes.CREATE_BOOKINGS_FAILURE,
                error: error.error
            });
        });
    }

    /**
     * [name description]
     * @type {[type]}
     */
    filter(name: any): any[] {
        return this.guestOptions.filter((option) => {
            const selected = (name && typeof name === 'object') ? name.name : name;
            return option.name.toLowerCase().indexOf(selected.toLowerCase()) >= 0;
        });
    }

    /**
     * [option description]
     * @type {[type]}
     */
    displayFn(option: any): any {
        return option ? option.name : option;
    }
}
