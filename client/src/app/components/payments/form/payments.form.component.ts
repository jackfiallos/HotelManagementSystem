import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import _ from 'lodash';

import { PaymentsController } from '../../../ducks/payments/payments.controller';
import { types as PaymentTypes } from '../../../ducks/payments/payments.types';

@Component({
    selector: 'app-form-payments',
    templateUrl: './payments.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PaymentsFormComponent implements OnInit, OnDestroy {
    public id: number;
    public sub: any;
    public payment$: any;

    public methods: any[] = [{
        id: 'cash',
        name: 'Cash'
    }, {
        id: 'card',
        name: 'Card'
    }, {
        id: 'online',
        name: 'Online'
    }];

    public currencies: any[] = [{
        id: 'NIO',
        name: 'NIO (Córdoba)'
    }, {
        id: 'USD',
        name: 'USD (Dollar)'
    }];

    public form: any = {
        amount: null,
        currency: null,
        method: null,
        comments: null
    };

    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-11-22
     * @param   {ActivatedRoute} privateroute [description]
     * @param   {Router} private_router [description]
     * @param   {PaymentsController} private_payment [description]
     * @param   {Store<any>} private_store [description]
     * @return  {[type]} [description]
     */
    constructor(private route: ActivatedRoute, private _router: Router, private _payment: PaymentsController, private _store: Store<any>) {
        _store.select('payments').subscribe((response) => {
            this.payment$ = response;
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

            if (!isNaN(this.id)) {
                this._store.dispatch({
                    type: PaymentTypes.GET_PAYMENTS,
                    uid: this.id
                });

                this._payment.getPaymentById(this.id).subscribe((data: any) => {
                    this.form = {
                        amount: data.amount,
                        currency: data.currency,
                        method: data.method,
                        comments: data.comments
                    };

                    this._store.dispatch({
                        type: PaymentTypes.GET_PAYMENTS_SUCCESS,
                        payload: data
                    });
                }, (error: any) => {
                    this._store.dispatch({
                        type: PaymentTypes.GET_PAYMENTS_FAILURE,
                        error: error.error
                    });
                });
            }
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

    /**
     * [e description]
     * @type {[type]}
     */
    public onSubmit(e: MouseEvent) {
        e.preventDefault();

        if (isNaN(this.id)) {
            // dispatch create
            this._store.dispatch({
                type: PaymentTypes.CREATE_PAYMENTS
            });

            // request create room
            this._payment.createPayment(this.form).subscribe((data: any) => {
                this._store.dispatch({
                    type: PaymentTypes.CREATE_PAYMENTS_SUCCESS,
                    payload: data
                });

                this._router.navigate(['/rooms/view', data.id]);
            }, (error: any) => {
                this._store.dispatch({
                    type: PaymentTypes.CREATE_PAYMENTS_FAILURE,
                    error: error.error
                });
            });
        } else {
            // dispatch update
            this._store.dispatch({
                type: PaymentTypes.UPDATE_PAYMENTS
            });

            // request create room
            this._payment.updatePayment(this.id, this.form).subscribe((data: any) => {
                this._store.dispatch({
                    type: PaymentTypes.UPDATE_PAYMENTS_SUCCESS,
                    payload: data
                });

                this._router.navigate(['/rooms/view', data.id]);
            }, (error: any) => {
                this._store.dispatch({
                    type: PaymentTypes.UPDATE_PAYMENTS_FAILURE,
                    error: error.error
                });
            });
        }
    }
}
