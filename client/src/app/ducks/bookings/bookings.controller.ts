import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class BookingsController {
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
     * [getBookings description]
     * @method  getBookings
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @return  {Observable<any>} [description]
     */
    public getBookings(): Observable<any> {
        return this.http.get<any>(environment.api_url + '/bookings');
    }

    /**
     * [getBookingById description]
     * @method  getBookingById
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {number} bookingId [description]
     * @return  {Observable<any>} [description]
     */
    public getBookingById(bookingId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/bookings/' + bookingId);
    }

    /**
     * [createBooking description]
     * @method  createBooking
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {any} booking [description]
     * @return  {[type]} [description]
     */
    public createBooking(booking: any) {
        return this.http.post(environment.api_url + '/bookings/', booking);
    }

    /**
     * [updateBooking description]
     * @method  updateBooking
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {number} bookingId [description]
     * @param   {[type]} booking [description]
     * @return  {Observable<any>} [description]
     */
    public updateBooking(bookingId: number, booking): Observable<any> {
        return this.http.put<any>(environment.api_url + '/bookings/' + bookingId, booking);
    }
}
