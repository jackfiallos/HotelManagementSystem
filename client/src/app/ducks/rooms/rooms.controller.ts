import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class RoomsController {
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
     * [getRooms description]
     * @method  getRooms
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @return  {Observable<any>} [description]
     */
    public getRooms(): Observable<any> {
        return this.http.get<any>(environment.api_url + '/room');
    }

    /**
     * [getRoomById description]
     * @method  getRoomById
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {number} roomId [description]
     * @return  {Observable<any>} [description]
     */
    public getRoomById(roomId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/room/' + roomId);
    }

    /**
     * [createRoom description]
     * @method  createRoom
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {any} room [description]
     * @return  {[type]} [description]
     */
    public createRoom(room: any) {
        return this.http.post(environment.api_url + '/room/', room);
    }

    /**
     * [updateRoom description]
     * @method  updateRoom
     * @author jackfiallos
     * @version [version]
     * @date    2017-10-28
     * @param   {number} roomId [description]
     * @param   {any} room [description]
     * @return  {Observable<any>} [description]
     */
    public updateRoom(roomId: number, room: any): Observable<any> {
        return this.http.put<any>(environment.api_url + '/room/' + roomId, room);
    }
}
