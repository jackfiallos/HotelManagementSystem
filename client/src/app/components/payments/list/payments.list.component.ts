import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { PaymentsController } from '../../../ducks/payments/payments.controller';
import { types } from '../../../ducks/payments/payments.types';

@Component({
    selector: 'app-list-payments',
    templateUrl: './payments.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PaymentsListComponent implements OnInit {
    public payments$: any;

    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-30
     * @param   {BookingsController} private _payments [description]
     * @param   {Store<any>} private_store [description]
     * @return  {[type]} [description]
     */
    constructor(private _payments: PaymentsController, private _store: Store<any>) {
        _store.select('payments').subscribe((response) => {
            this.payments$ = response;
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
            type: types.LIST_PAYMENTS
        });

        this._payments.getPayments().subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_PAYMENTS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_PAYMENTS_FAILURE
            });
        });
    }
}
