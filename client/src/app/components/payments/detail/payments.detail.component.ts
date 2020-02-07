import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { PaymentsController } from '../../../ducks/payments/payments.controller';
import { types } from '../../../ducks/payments/payments.types';

@Component({
    selector: 'app-detail-payments',
    templateUrl: './payments.detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PaymentsDetailComponent implements OnInit, OnDestroy {
    public id: number;
    public sub: any;
    public payment$: any;

    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-11-16
     * @param   {ActivatedRoute} privateroute [description]
     * @param   {PaymentsController} private_payments [description]
     * @param   {Store<any>} private_store [description]
     * @return  {[type]} [description]
     */
    constructor(private route: ActivatedRoute, private _payments: PaymentsController, private _store: Store<any>) {
        _store.select('payments').subscribe((response) => {
            this.payment$ = response;
        });
    }

    /**
     * [ngOnInit description]
     * @method  ngOnInit
     * @author jackfiallos
     * @version [version]
     * @date    2017-11-16
     * @return  {[type]} [description]
     */
    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = Number(params['id']);
            this._store.dispatch({
                type: types.GET_PAYMENTS,
                uid: this.id
            });

            this._payments.getPaymentById(this.id).subscribe((data: any) => {
                this._store.dispatch({
                    type: types.GET_PAYMENTS_SUCCESS,
                    payload: data
                });
            }, (error: any) => {
                this._store.dispatch({
                    type: types.GET_PAYMENTS_FAILURE,
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
     * @date    2017-11-16
     * @return  {[type]} [description]
     */
    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
