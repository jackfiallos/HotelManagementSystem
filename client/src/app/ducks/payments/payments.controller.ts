import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class PaymentsController {
    /**
     * [constructor description]
     * @method  constructor
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {HttpClient} publichttp [description]
     * @return  {[type]} [description]
     */
    constructor(public http: HttpClient) {}

    /**
     * [getPayments description]
     * @method  getPayments
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @return  {Observable<any>} [description]
     */
    public getPayments(): Observable<any> {
        return this.http.get<any>(environment.api_url + '/payments');
    }

    /**
     * [getPaymentById description]
     * @method  getPaymentById
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {number} paymentId [description]
     * @return  {Observable<any>} [description]
     */
    public getPaymentById(paymentId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/payments/' + paymentId);
    }

    /**
     * [createPayment description]
     * @method  createPayment
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {any} payment [description]
     * @return  {[type]} [description]
     */
    public createPayment(payment: any) {
        return this.http.post(environment.api_url + '/payments/', payment);
    }

    /**
     * [updatePayment description]
     * @method  updatePayment
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {number} paymentId [description]
     * @param   {any} payment [description]
     * @return  {Observable<any>} [description]
     */
    public updatePayment(paymentId: number, payment: any): Observable<any> {
        return this.http.put<any>(environment.api_url + '/payments/' + paymentId, payment);
    }
}
