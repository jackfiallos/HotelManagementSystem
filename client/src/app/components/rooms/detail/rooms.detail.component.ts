import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { RoomsController } from '../../../ducks/rooms/rooms.controller';
import { types } from '../../../ducks/rooms/rooms.types';

@Component({
    selector: 'app-detail-rooms',
    templateUrl: './rooms.detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RoomsDetailComponent implements OnInit, OnDestroy {
    public id: number;
    public sub: any;
    public room$: any;

    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-31
     * @param   {ActivatedRoute} private route [description]
     * @param   {RoomsController} private _rooms [description]
     * @param   {Store<any>} private _store [description]
     * @return  {[type]} [description]
     */
    constructor(private route: ActivatedRoute, private _rooms: RoomsController, private _store: Store<any>) {
        _store.select('rooms').subscribe((response) => {
            this.room$ = response;
        });
    }

    /**
     * [ngOnInit description]
     * @method  ngOnInit
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-31
     * @return  {[type]} [description]
     */
    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = Number(params['id']);
            this._store.dispatch({
                type: types.GET_ROOMS,
                uid: this.id
            });

            this._rooms.getRoomById(this.id).subscribe((data: any) => {
                this._store.dispatch({
                    type: types.GET_ROOMS_SUCCESS,
                    payload: data
                });
            }, (error: any) => {
                this._store.dispatch({
                    type: types.GET_ROOMS_FAILURE,
                    error: error.error
                });
            });
        });
    }

    /**
     * [ngOnDestroy description]
     * @method  ngOnDestroy
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-31
     * @return  {[type]} [description]
     */
    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
