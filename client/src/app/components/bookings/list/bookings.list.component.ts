import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookingsController } from '../../../ducks/bookings/bookings.controller';
import { types } from '../../../ducks/bookings/bookings.types';

@Component({
    selector: 'app-list-bookings',
    templateUrl: './bookings.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BookingsListComponent implements OnInit {
    public bookings$: any;

    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-30
     * @param   {BookingsController} private _bookings [description]
     * @param   {Store<any>} private _store [description]
     * @return  {[type]} [description]
     */
    constructor(private _bookings: BookingsController, private _store: Store<any>) {
        _store.select('bookings').subscribe((response) => {
            this.bookings$ = response;
        });
    }

    /**
     * [ngOnInit description]
     * @method  ngOnInit
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-29
     * @return  {[type]} [description]
     */
    public ngOnInit() {
        this._store.dispatch({
            type: types.LIST_BOOKINGS
        });

        this._bookings.getBookings().subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_BOOKINGS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_BOOKINGS_FAILURE,
                error: error.error
            });
        });
    }
}
