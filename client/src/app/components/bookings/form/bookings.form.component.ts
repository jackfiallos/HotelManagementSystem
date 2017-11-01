import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { BookingsController } from '../../../ducks/bookings/bookings.controller';
import { RoomsController } from '../../../ducks/rooms/rooms.controller';
import { types as BookingTypes } from '../../../ducks/bookings/bookings.types';
import { types as RoomTypes } from '../../../ducks/rooms/rooms.types';

export class User {
    constructor(public name: string) { }
}

@Component({
    selector: 'form-bookings',
    templateUrl: './bookings.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BookingsFormComponent implements OnInit {
    private sub: any;
    private booking$: any;
    private rooms$: any;

    myControl = new FormControl();

    options = [
        new User('Mary'),
        new User('Shelley'),
        new User('Igor')
    ];

    filteredOptions: Observable<User[]>;

    private form: any = {
        checkin: new Date(),
        checkout: new Date(),
        nights: 1,
        adults: 1,
        children: 0,
        room: null,
        guest: null,
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
    constructor(private route: ActivatedRoute, private _bookings: BookingsController, private _room: RoomsController, private _store: Store<any>, private dateAdapter: DateAdapter<NativeDateAdapter>) {
        this.dateAdapter.setLocale('en-US');

        _store.select('bookings').subscribe((response) => {
            this.booking$ = response;
        });

        _store.select('rooms').subscribe((response) => {
            this.rooms$ = response;
        });
    }

    /**
     * [sub description]
     * @type {[type]}
     */
    public ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .startWith(null)
                .map(user => user && typeof user === 'object' ? user.name : user)
                .map(name => name ? this.filter(name) : this.options.slice());

        this.sub = this.route.params.subscribe(params => {
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
                    type: RoomTypes.GET_ROOMS_FAILURE,
                    error: error
                });
            });
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private onSubmit(e: MouseEvent) {
        e.preventDefault();

        console.log(this.myControl);

        this._store.dispatch({
            type: BookingTypes.CREATE_BOOKINGS,
            payload: this.form
        });

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
                error: error
            });
        });
    }

    filter(name: string): User[] {
        return this.options.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    displayFn(user: User): any {
        return user ? user.name : user;
    }
}
