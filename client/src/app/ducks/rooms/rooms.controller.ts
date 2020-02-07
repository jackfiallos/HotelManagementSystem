import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
     * @param   {string} status [description]
     * @date    2017-10-28
     * @return  {Observable<any>} [description]
     */
    public getRooms(status: string = ''): Observable<any> {
        let params = new HttpParams();
        params = params.append('status', status);
        return this.http.get<any>(environment.api_url + '/room', {
            params: params
        });
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
