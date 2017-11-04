import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { GuestsController } from '../../../ducks/guests/guests.controller';
import { types } from '../../../ducks/guests/guests.types';

@Component({
    selector: 'detail-guests',
    templateUrl: './guests.detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GuestsDetailComponent implements OnInit {
    private id: number;
    private sub: any;
    private guest$: any;

    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-31
     * @param   {ActivatedRoute} private route [description]
     * @param   {GuestsController} private _guests [description]
     * @param   {Store<any>} private _store [description]
     * @return  {[type]} [description]
     */
    constructor(private route: ActivatedRoute, private _guests: GuestsController, private _store: Store<any>) {
        _store.select('guests').subscribe((response) => {
            this.guest$ = response;
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
                type: types.GET_GUESTS,
                uid: this.id
            });

            this._guests.getGuestById(this.id).finally(() => {
                console.log('finally logic');
            }).subscribe((data: any) => {
                this._store.dispatch({
                    type: types.GET_GUESTS_SUCCESS,
                    payload: data
                });
            }, (error: any) => {
                this._store.dispatch({
                    type: types.GET_GUESTS_FAILURE,
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
