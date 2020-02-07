import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { RoomsController } from '../../../ducks/rooms/rooms.controller';
import { types } from '../../../ducks/rooms/rooms.types';

@Component({
    selector: 'app-list-rooms',
    templateUrl: './rooms.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RoomsListComponent implements OnInit {
    public rooms$: any;

    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-30
     * @param   {RoomsController} private _rooms [description]
     * @param   {Store<any>} private_store [description]
     * @return  {[type]} [description]
     */
    constructor(private _rooms: RoomsController, private _store: Store<any>) {
        _store.select('rooms').subscribe((response) => {
            this.rooms$ = response;
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
            type: types.LIST_ROOMS
        });

        this._rooms.getRooms().subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_ROOMS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_ROOMS_FAILURE
            });
        });
    }
}
